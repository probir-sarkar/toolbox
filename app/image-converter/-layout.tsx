import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Converter - Bulk Convert Images Online | Toolbox",
  description:
    "Batch convert image formats (JPG, PNG, WEBP, and more) freely. Fast, secure, and purely client-side conversion."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
