import { FAQSection } from "@/components/common/faq-section";

const FAQ_ITEMS = [
  {
    question: "Is it really offline?",
    answer:
      "Yes. Conversion happens entirely in your browser. After the first load, it can work without an internet connection."
  },
  {
    question: "Do you upload my files?",
    answer: "No. Your PDFs never leave your device. There are no servers involved in the conversion process."
  },
  {
    question: "Is this open source and free?",
    answer: "Yes. It’s MIT licensed and free to use. You can view and fork the source code on GitHub."
  },
  {
    question: "Why are my files converting slowly?",
    answer:
      "Large PDFs with many pages or high-resolution images can take longer to process since everything is happening on your computer's processor. Try selecting a specific range of pages or converting in batches."
  }
];

export function FAQ() {
  return <FAQSection items={FAQ_ITEMS} />;
}
