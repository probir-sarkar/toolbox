import { FAQSection } from "@/components/common/faq-section";

const FAQ_ITEMS = [
    {
        question: "Is it really offline?",
        answer: "Yes. All image processing happens in your browser using modern web technologies. Your photos are never uploaded to any server."
    },
    {
        question: "What formats are supported?",
        answer: "We support input for most common image formats like JPG, PNG, WebP, GIF, and others. You can convert them to JPG, PNG, WebP, or AVIF."
    },
    {
        question: "Does it reduce quality?",
        answer: "You have full control over the quality. You can choose \"lossless\" formats like PNG or adjust the quality slider for lossy formats like JPG and WebP to balance size and quality."
    },
    {
        question: "Limits on file size?",
        answer: "Since processing is local, the limit depends on your device's memory. Most modern devices can handle very large images easily."
    }
];

export function FAQ() {
    return (
        <FAQSection items={FAQ_ITEMS} />
    );
}
