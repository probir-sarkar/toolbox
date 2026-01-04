import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Tools - Toolbox",
  description:
    "Convert, resize, and optimize your images freely. All processing happens in your browser for maximum privacy."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
