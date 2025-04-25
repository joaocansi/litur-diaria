'use client';

import { retrieveCustomerId } from "@/actions/retrieve-payment";
import { retrieveSubscription } from "@/actions/retrieve-subscription";
import { Session } from "next-auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const translations = new Map<string, string>([
    ['active', 'Ativo'],
    ['canceled', 'Cancelado'],
    ['inactive', 'Inativo'],
]);

export function translateStripeStatus(status: string) {
    const translation = translations.get(status);
    if (!translation)
      throw new Error(`Status Stripe desconhecido: ${status}`);
    return translation;
}

export type SubscriptionStatus = 'active' | 'canceled' | 'inactive'

export type Subscription = {
    status: SubscriptionStatus,
    startDate: number,
    endDate: number;
}

type SubscriptionContextProps = {
    subscription: Subscription | undefined;
    session: Session;
    loading: boolean;
    error: boolean;
}

type SubscriptionProviderProps = {
    children: ReactNode;
    session: Session;
}

const SubscriptionContext = createContext({} as SubscriptionContextProps);

export const SubscriptionProvider = ({ children, session }: SubscriptionProviderProps) => {
    const [subscription, setSubscription] = useState<Subscription>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const retrieveSubscriptionData = async () => {
        const customerId = await retrieveCustomerId();
        if (!customerId)
            return

        const subscription = await retrieveSubscription(customerId)
        if (!subscription)
            return;

        setSubscription(subscription);
    }

    useEffect(() => {
        retrieveSubscriptionData()
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    return (
        <SubscriptionContext.Provider value={{ subscription, loading, error, session }}>
            {children}
        </SubscriptionContext.Provider>
    )
}

export const useSubscription = () => useContext(SubscriptionContext);