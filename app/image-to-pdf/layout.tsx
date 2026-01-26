import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF - Convert Images to PDF Document | Toolbox",
  description:
    "Easily convert your images to a single PDF document. Perfect for creating portfolios and documents. Secure and client-side processing."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
