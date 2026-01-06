import { Hammer, Palette, Lock, FileText, Image as ImageIcon } from "lucide-react";

export const TOOLS_CONFIG = [
  {
    title: "PDF Tools",
    href: "/pdf-tools",
    icon: Hammer,
    description: "Merge, split, compress, and edit PDF documents.",
    items: [
      {
        title: "PDF to Image",
        href: "/pdf-to-image",
        description: "Convert PDF pages to high-quality images.",
        icon: FileText,
        color: "bg-orange-500/10 text-orange-600",
        tags: ["PDF", "Image", "Popular"]
      },
      {
        title: "Image to PDF",
        href: "/image-to-pdf",
        description: "Convert images to a single PDF document.",
        icon: FileText,
        color: "bg-red-500/10 text-red-600",
        tags: ["Image", "PDF", "Top"]
      },
      {
        title: "Merge PDF",
        href: "/merge-pdf",
        description: "Combine multiple PDFs into one.",
        icon: Hammer,
        color: "bg-orange-500/10 text-orange-600",
        tags: ["PDF", "Utils"]
      }
    ]
  },
  {
    title: "Image Tools",
    href: "/image-tools",
    icon: Palette,
    description: "Convert, resize, and optimize your images.",
    items: [
      {
        title: "Image Converter",
        href: "/image-converter",
        description: "Batch convert image formats freely.",
        icon: ImageIcon,
        color: "bg-blue-500/10 text-blue-600",
        tags: ["Image", "Optimization", "New"]
      },
      {
        title: "Resize Image",
        href: "/image-tools",
        description: "Change image dimensions.",
        disabled: true,
        icon: Palette,
        color: "bg-purple-500/10 text-purple-600",
        tags: ["Image", "AI", "Editor"]
      }
    ]
  },
  {
    title: "Security Tools",
    href: "/password-generator",
    icon: Lock,
    description: "Protect your data and privacy.",
    items: [
      {
        title: "Password Generator",
        href: "/password-generator",
        description: "Create strong, secure passwords.",
        icon: Lock,
        color: "bg-green-500/10 text-green-600",
        tags: ["Security", "Privacy", "New"]
      }
    ]
  }
];

export const ALL_TOOLS = TOOLS_CONFIG.flatMap((category) => category.items);
