
import { Hammer, Palette } from "lucide-react";

export const TOOLS_CONFIG = [
    {
        title: "PDF Tools",
        href: "/pdf-tools",
        icon: Hammer,
        description: "Merge, split, compress, and edit PDF documents.",
        items: [
            { title: "PDF to Image", href: "/pdf-to-image", description: "Convert PDF pages to images." },
            { title: "Merge PDF", href: "/pdf-tools", description: "Combine multiple PDFs into one.", disabled: true },
        ]
    },
    {
        title: "Image Tools",
        href: "/image-tools",
        icon: Palette,
        description: "Convert, resize, and optimize your images.",
        items: [
            { title: "Image Converter", href: "/image-converter", description: "Batch convert image formats." },
            { title: "Resize Image", href: "/image-tools", description: "Change image dimensions.", disabled: true },
        ]
    },
];
