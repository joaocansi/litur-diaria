'use client';

import { accordionItems } from "@/faq-data"
import { Accordion, AccordionItem } from "@heroui/accordion"

export const FaqItems = () => {
    return (
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
)
}