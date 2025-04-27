import { Payment } from "@/dynamodb";
import { stripeClient } from "@/stripe";
import { getServerSession } from "next-auth";

export async function POST() {
    const session = await getServerSession();
    if (!session || !session.user)
        return new Response(null, { status: 401 })

    const email = session.user.email;
    const payment = await Payment.get(email as string);

    if (!payment)
        return new Response(null, { status: 404 });

    const portalSession = await stripeClient.billingPortal.sessions.create({
        customer: payment.customerId,
        return_url: process.env.NEXT_PUBLIC_BASE_URL + '/dashboard'
    });

    return new Response(null, {
        status: 303,
        headers: {
            Location: portalSession.url!,
            'Cache-Control': 'no-store',
        },
    });
}