import Link from 'next/link';
import { Footer } from "@/components/footer";
import { Suspense } from "react";
import { BackButton } from "@/components/back-button";
import { FaqItems } from '@/components/faq-items';
import { FaArrowLeft } from 'react-icons/fa';

export default function FaqPage() {
    return (
        <div className="min-h-screen w-full px-3 py-2 overflow-auto flex flex-col justify-between">
            <div>
                <header className="w-full">
                    <div className="flex justify-between items-center">
                        <Suspense fallback={<Link href="/"><FaArrowLeft size={24} /></Link>}>
                            <BackButton />
                        </Suspense>
                        <h1 className="text-2xl font-extrabold text-amber-800">Liturgia Diária</h1>
                    </div>
                </header>
                <main className="w-full">
                    <div className="w-11/12 max-w-[750px] mt-12 mx-auto">
                        <h3 className="text-2xl font-bold">Perguntas frequentes</h3>
                        <p className="text-base text-gray-300 mb-4">Aqui você encontra respostas para as perguntas mais comuns sobre nossos serviços.</p>
                        <FaqItems />
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}