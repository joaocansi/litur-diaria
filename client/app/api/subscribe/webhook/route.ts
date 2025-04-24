import { Payment } from "@/dynamodb";
import { stripeClient } from "@/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

async function buffer(readable: ReadableStream<Uint8Array>) {
    const reader = readable.getReader();
    const chunks = [];
    let result;

    try {
        while (!(result = await reader.read()).done) {
            chunks.push(result.value);
        }
        return Buffer.concat(chunks);
    } catch (error) {
        throw new Error("Failed to process request body");
    }
}

export async function POST(req: NextRequest) {
    if (!req.body || !webhookSecret) {
        return new NextResponse(null, { status: 400 });
    }

    const sig = req.headers.get('stripe-signature');
    if (!sig) {
        return new NextResponse(null, { status: 400 });
    }

    let rawBody: Buffer;
    try {
        rawBody = await buffer(req.body);
    } catch {
        return new NextResponse(null, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripeClient.webhooks.constructEvent(rawBody, sig, webhookSecret);
    } catch {
        return new NextResponse(null, { status: 400 });
    }

    const { type: eventType, data: { object: eventData } } = event;

    try {
        switch (eventType) {
            case 'checkout.session.completed':
                await handleCheckoutSessionCompleted(eventData as Stripe.Checkout.Session);
                break;
            case 'invoice.paid':
                await handleInvoicePaid(eventData as Stripe.Invoice);
                break;
            case 'invoice.payment_failed':
                await handleInvoicePaymentFailed(eventData as Stripe.Invoice);
                break;
            default:
                break;
        }
    } catch (error) {
        return new NextResponse(null, { status: 400 });
    }

    return new NextResponse(null, { status: 200 });
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    const { customer_email, customer } = session;    
    if (!customer_email || !customer) {
        throw new Error();
    }

    try {
        await Payment.create({
            customerId: customer as string,
            email: customer_email,
            status: 'created',
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'ConditionalCheckFailedException') { // if exists, then update customerId
            return;
        }
        throw error;
    }
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
    const { customer_email, customer } = invoice;
    
    if (!customer_email || !customer) {
        throw new Error();
    }

    const payment = await Payment.get(customer_email);
    if (payment) {
        payment.status = 'paid';
        await payment.save();
        return;
    } 
    
    await Payment.create({
        customerId: customer as string,
        email: customer_email,
        status: 'paid',
    });
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
    const { customer_email, customer,  } = invoice;
    
    if (!customer_email) {
        throw new Error();
    }

    const payment = await Payment.get(customer_email);
    
    if (payment) {
        payment.status = 'failed';
        await payment.save();
        return;
    }
}