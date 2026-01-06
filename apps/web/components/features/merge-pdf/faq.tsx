"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function MergeFaq() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is my data safe?</AccordionTrigger>
          <AccordionContent>
            Yes! All processing happens locally in your browser. Your files are never uploaded to any server, ensuring
            100% privacy and security.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>How many files can I merge?</AccordionTrigger>
          <AccordionContent>
            You can merge as many PDF files as your browser memory allows. Since everything runs on your device, it
            depends on your computer's performance, but usually, dozens of files are handled easily.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Does it preserve quality?</AccordionTrigger>
          <AccordionContent>
            Yes, the merge process simply combines the pages from your existing PDFs into a new document without
            re-compressing them, maintaining the original quality.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I rearrange the order?</AccordionTrigger>
          <AccordionContent>
            Absolutely! Once you upload your files, you can drag and drop them in the list to change their order before
            merging.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
