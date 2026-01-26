"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function SplitFaq() {
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
          <AccordionTrigger>Can I extract specific pages?</AccordionTrigger>
          <AccordionContent>
            Yes, simply select "Extract pages" and enter the page numbers or ranges (e.g., "1-5, 8, 10-12") to create a
            new PDF with just those pages.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How do I get all pages as separate files?</AccordionTrigger>
          <AccordionContent>
            Select the "Split all pages" option. This will save every page of your PDF as a separate file and download
            them together in a ZIP archive.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Does it support encrypted PDFs?</AccordionTrigger>
          <AccordionContent>
            If the PDF is password protected, you will need to interpret/decrypt it first. We currently support standard
            unencrypted PDFs for automatic processing.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
