import { CaseLower, CaseUpper, Fingerprint, Hash } from "lucide-react";
import type { PasswordCharOption } from "../types";

export const PASSWORD_CHAR_OPTIONS = [
  {
    id: "uppercase" as const,
    label: "Uppercase",
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    example: "ABC",
    icon: CaseUpper
  },
  {
    id: "lowercase" as const,
    label: "Lowercase",
    value: "abcdefghijklmnopqrstuvwxyz",
    example: "abc",
    icon: CaseLower
  },
  {
    id: "numbers" as const,
    label: "Numbers",
    value: "0123456789",
    example: "123",
    icon: Hash
  },
  {
    id: "symbols" as const,
    label: "Symbols",
    value: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    example: "!@#",
    icon: Fingerprint
  }
] as const;

export const DEFAULT_PASSWORD_OPTIONS = {
  length: 16,
  selected: ["uppercase", "lowercase", "numbers"] as PasswordCharOption[]
};
