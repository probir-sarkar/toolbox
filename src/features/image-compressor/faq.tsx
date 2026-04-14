import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ImageCompressorFaq() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>How much can I reduce the file size?</AccordionTrigger>
        <AccordionContent>
          The compression ratio depends on the image content and quality settings. Typically, you can reduce file sizes by
          50-80% with minimal visible quality loss. Photos with lots of detail compress better than simple graphics.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Will compression affect image quality?</AccordionTrigger>
        <AccordionContent>
          There's always a trade-off between file size and quality. Our tool uses high-quality compression algorithms to minimize
          quality loss. You can preview the compression ratio and adjust quality settings to find the right balance.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What format should I choose?</AccordionTrigger>
        <AccordionContent>
          JPEG offers the best compression for photos. WebP provides even better compression with good quality but may not be
          supported by older browsers. PNG is lossless but results in larger files. Choose based on your use case.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Can I batch compress multiple images?</AccordionTrigger>
        <AccordionContent>
          Yes! Upload multiple images and they'll all be compressed using the same settings. Each image will be downloaded
          individually after compression.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}