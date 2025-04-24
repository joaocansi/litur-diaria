import { Payment } from '@/dynamodb';
import { stripeClient } from '@/stripe';
import { getServerSession } from 'next-auth';
import Stripe from 'stripe';

export async function GET() {
    const session = await getServerSession();
    if (!session || !session.user?.email) {
        return new Response('Unauthorized', { status: 401 });
    }

    const payment = await Payment.get(session.user.email);
    const stripeSessionData: Stripe.Checkout.SessionCreateParams = {
        mode: 'subscription',
        line_items: [
            {
                price: process.env.STRIPE_PRICE_ID,
                quantity: 1,
            },
        ],
        customer_email: session.user.email,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/subscription`,
    }

    if (payment) {
        stripeSessionData.customer = payment.customerId;
        delete stripeSessionData.customer_email;
    }

    const stripeSession = await stripeClient.checkout.sessions.create(stripeSessionData);
    return new Response(null, {
        status: 303,
        headers: {
            Location: stripeSession.url!,
            'Cache-Control': 'no-store',
        },
    });
}