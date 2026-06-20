import { ReactNode } from "react";
import { cn } from "@/shared/utils";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/shared/components/ui/accordion";

export interface BaseFaqItem {
  id: string;
  question: string;
  answer: ReactNode;
}

export interface FaqSectionBaseProps {
  title?: string;
  items: BaseFaqItem[];
  className?: string;
}

export function FaqSectionBase({ title = "Frequently Asked Questions", items, className }: FaqSectionBaseProps) {
  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <Accordion className="max-w-3xl mx-auto">
          {items.map((item) => (
            <AccordionItem key={item.id}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

// Utility function to create a typed FAQ section
export function createFaqSection(items: BaseFaqItem[], title?: string) {
  return function FaqSection(props: Omit<FaqSectionBaseProps, "items" | "title">) {
    return <FaqSectionBase {...props} items={items} title={title} />;
  };
}
