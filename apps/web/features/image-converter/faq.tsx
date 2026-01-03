"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function FAQ() {
    return (
        <div>
            <h3 className="text-balance text-2xl font-bold tracking-tight text-slate-900 mb-6">Frequently asked questions</h3>
            <Accordion className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is it really offline?</AccordionTrigger>
                    <AccordionContent>
                        Yes. All image processing happens in your browser using modern web technologies. Your photos are never uploaded to any server.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>What formats are supported?</AccordionTrigger>
                    <AccordionContent>
                        We support input for most common image formats like JPG, PNG, WebP, GIF, and others. You can convert them to JPG, PNG, WebP, or AVIF.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Does it reduce quality?</AccordionTrigger>
                    <AccordionContent>
                        You have full control over the quality. You can choose "lossless" formats like PNG or adjust the quality slider for lossy formats like JPG and WebP to balance size and quality.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Limits on file size?</AccordionTrigger>
                    <AccordionContent>
                        Since processing is local, the limit depends on your device's memory. Most modern devices can handle very large images easily.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
