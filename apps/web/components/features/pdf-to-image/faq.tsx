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
            Yes. Conversion happens entirely in your browser. After the first load, it can work without an internet
            connection.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Do you upload my files?</AccordionTrigger>
          <AccordionContent>
            No. Your PDFs never leave your device. There are no servers involved in the conversion process.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is this open source and free?</AccordionTrigger>
          <AccordionContent>
            Yes. It’s MIT licensed and free to use. You can view and fork the source code on GitHub.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Why are my files converting slowly?</AccordionTrigger>
          <AccordionContent>
            Large PDFs with many pages or high-resolution images can take longer to process since everything is happening on your computer's processor. Try selecting a specific range of pages or converting in batches.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
