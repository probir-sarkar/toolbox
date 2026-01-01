"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQ() {
  return (
    <div>
      <h3 className="text-balance text-xl font-semibold tracking-tight">Frequently asked questions</h3>
      <div className="mt-4">
        <Accordion type="single" collapsible className="w-full">
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
        </Accordion>
      </div>
    </div>
  )
}
