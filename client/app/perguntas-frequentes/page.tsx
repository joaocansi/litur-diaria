'use client';

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

import { Accordion, AccordionItem } from '@heroui/accordion'
import { Footer } from "@/components/footer";
import { useSearchParams } from "next/navigation";
import { accordionItems } from "@/faq-data";

export default function FaqPage() {
    const searchParams = useSearchParams();
    const referrer = searchParams.get('from') || '';
    const returnLink = referrer === 'dashboard' ? '/dashboard' : '/';

    return (
        <div className="min-h-screen w-full px-3 py-2 overflow-auto flex flex-col justify-between">
            <div>
                <header className="w-full">
                    <div className="flex justify-between items-center">
                        <Link href={returnLink}>
                            <FaArrowLeft size={24} />
                        </Link>
                        <h1 className="text-2xl font-extrabold text-amber-900">Liturgia Diária</h1>
                    </div>
                </header>
                <main className="w-full">
                    <div className="w-11/12 max-w-[750px] mt-12 mx-auto">
                        <h3 className="text-2xl font-bold">Perguntas frequentes</h3>
                        <p className="text-base text-gray-600 mb-4">Aqui você encontra respostas para as perguntas mais comuns sobre nossos serviços.</p>
                        <Accordion variant="shadow">
                            {accordionItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    aria-label={`Accordion ${index + 1}`}
                                    classNames={{ title: 'font-medium', content: 'text-default-800' }}
                                    title={item.title}>
                                    {item.content}
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    );
}