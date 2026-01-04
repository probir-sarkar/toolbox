import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF Tools - Toolbox",
  description: "Merge, split, compress, and edit PDF documents with our free online tools. 100% offline and secure."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
