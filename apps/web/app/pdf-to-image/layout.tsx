import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Image - Convert PDF to JPG, PNG | Toolbox",
  description:
    "Convert PDF pages to high-quality images (JPG, PNG, WebP) instantly. Free, private, and runs 100% in your browser."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
