import { Payment } from "@/dynamodb";
import { stripeClient } from "@/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

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
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
            case 'invoice.paid':
                await handleInvoicePaid(eventData as Stripe.Invoice);
                break;
            case 'invoice.payment_failed':
                await handleInvoicePaymentFailed(eventData as Stripe.Invoice);
                break;
            case 'customer.subscription.deleted':
                await handleSubscriptionDeleted(eventData as Stripe.Subscription);
                break;
            default:
                break;
        }
    } catch (error) {
        return new NextResponse(null, { status: 400 });
    }

    return new NextResponse(null, { status: 200 });
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
    const { customer_email, customer } = invoice;
    
    if (!customer_email || !customer) {
        throw new Error();
    }

    const payment = await Payment.get(customer_email);
    if (payment) {
        if (customer !== payment.customerId)
            payment.customerId = customer as string;
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
    const { customer_email } = invoice;
    
    if (!customer_email) {
        throw new Error();
    }

    const payment = await Payment.get(customer_email);
    if (payment) {
        payment.status = 'inactive';
        await payment.save();
        return;
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    const customerId = subscription.customer;
    const customer = await stripeClient.customers.retrieve(customerId as string);

    if (!customer || (customer as Stripe.DeletedCustomer).deleted || typeof (customer as Stripe.Customer).email !== 'string') {
        throw new Error("Customer not found or email is invalid");
    }

    const email = (customer as Stripe.Customer).email;

    const payment = await Payment.get(email as string);
    if (payment) {
        payment.status = 'cancelled';
        await payment.save();
    }
}