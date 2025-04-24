'use server';

import { Payment } from "@/dynamodb";
import { getServerSession } from "next-auth";

export async function retrieveCustomerId() {
    const session = await getServerSession();
    if (!session || !session.user || !session.user.email)
        return null;

    const payment = await Payment.get(session.user.email)
    if (!payment)
        return null;

    return payment.customerId;
}