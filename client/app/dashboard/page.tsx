'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CircularProgress } from "@heroui/progress";
import { SubscriptionCard } from "@/components/subscription-card";
import { Footer } from "@/components/footer";

export default function SubscriptionPage() {
    const { data: session, status } = useSession();

    if (status === 'unauthenticated')
        redirect('/');

    return (
        <div className="flex flex-col justify-between items-center min-h-screen w-11/12 mx-auto">
            <header className="pt-6 pb-6 w-full text-center">
                <h1 className="text-4xl font-extrabold text-amber-900">Liturgia Diária</h1>
                <p className="text-base text-amber-800 mt-2">Reflexões inspiradoras para enriquecer sua jornada espiritual</p>
            </header>
            {status === 'loading' && <CircularProgress size="lg" aria-label="Carregando..." />}
            {status === 'authenticated' && session.user && <SubscriptionCard />}
            <Footer />
        </div>
    );
}
