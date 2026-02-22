import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Generator - Create Secure Passwords | Toolbox",
  description:
    "Generate strong, secure, and random passwords instantly. Customize length and characters to meet your security needs."
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
