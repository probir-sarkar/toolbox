import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export function ImageResizeFaq() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Will I lose image quality when resizing?</AccordionTrigger>
        <AccordionContent>
          Resizing to larger dimensions may reduce quality, but our tool uses high-quality algorithms to minimize degradation.
          When resizing to smaller dimensions, quality loss is minimal. You can control the output quality using the quality slider.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>What formats are supported?</AccordionTrigger>
        <AccordionContent>
          We support all major image formats including JPG, PNG, WebP, GIF, BMP, and more. You can also convert between formats
          during the resize process.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Can I batch resize multiple images?</AccordionTrigger>
        <AccordionContent>
          Yes! You can upload multiple images and they will all be resized to the same dimensions. Each image will be
          downloaded individually after processing.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>What does "maintain aspect ratio" mean?</AccordionTrigger>
        <AccordionContent>
          When enabled, the tool will automatically calculate the height or width to preserve the original proportions of your
          image. This prevents distortion and stretching. For example, a 1920×1080 image resized to 1280px wide will
          automatically become 1280×720.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}