'use server';

import { Subscription } from "@/hooks/subscription";
import { stripeClient } from "@/stripe";

export async function retrieveSubscription(customerId: string) {
    const subscriptions = await stripeClient.subscriptions.list({
        customer: customerId,
        price: process.env.STRIPE_PRICE_ID
    });

    if (subscriptions.data.length <= 0) {
        return null;
    }

    const subscription = subscriptions.data[0];
    if (!subscription)
        return null;

    const subscriptionItems = subscription.items.data;
    if (!subscriptionItems || subscriptionItems.length <= 0) {
        return null;
    }

    const subscriptionItem = subscriptionItems[0];
    return {
        status: subscription.status,
        startDate: subscriptionItem.current_period_start,
        endDate: subscriptionItem.current_period_end,
    } as Subscription;
}