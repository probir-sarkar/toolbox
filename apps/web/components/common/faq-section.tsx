"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    items: FAQItem[];
    title?: string;
    className?: string;
    titleClassName?: string;
}

export function FAQSection({
    items,
    title = "Frequently asked questions",
    className,
    titleClassName = "text-muted-foreground"
}: FAQSectionProps) {
    return (
        <div className={className}>
            <h3 className={cn("text-balance text-2xl font-bold tracking-tight mb-6", titleClassName)}>
                {title}
            </h3>
            <Accordion className="w-full">
                {items.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{item.question}</AccordionTrigger>
                        <AccordionContent>
                            {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    );
}
