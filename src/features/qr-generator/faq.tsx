import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function QRGeneratorFaq() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What can I create QR codes for?</AccordionTrigger>
        <AccordionContent>
          You can create QR codes for website URLs, plain text, WiFi network credentials, and contact information (vCards).
          Each type serves a different purpose - URLs for websites, WiFi for easy network sharing, and vCards for sharing contacts.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What size should my QR code be?</AccordionTrigger>
        <AccordionContent>
          For print materials, 300-400px is recommended. For digital use, 200-300px is sufficient. Larger QR codes are easier to scan
          from a distance. Our generator allows sizes from 200-600px.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What is error correction level?</AccordionTrigger>
        <AccordionContent>
          Error correction allows QR codes to be scanned even if partially damaged or obscured. Higher levels (H, Q) can recover more
          data but result in larger QR codes. Medium (M) is recommended for most use cases.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Can I customize QR code colors?</AccordionTrigger>
        <AccordionContent>
          Yes! You can choose from preset colors or use a custom hex color. Ensure good contrast between the QR code and background
          for reliable scanning. Dark colors on light backgrounds work best.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Are these QR codes free to use?</AccordionTrigger>
        <AccordionContent>
          Yes! All QR codes generated are completely free and can be used for any purpose - personal or commercial. There are no
          watermarks, usage limits, or expiration dates.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}