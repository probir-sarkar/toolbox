import { CaseLower, CaseUpper, Fingerprint, Hash } from "lucide-react";

export const PASSWORD_CHAR_OPTIONS = [
  {
    id: "uppercase",
    label: "Uppercase",
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    example: "ABC",
    icon: CaseUpper
  },
  {
    id: "lowercase",
    label: "Lowercase",
    value: "abcdefghijklmnopqrstuvwxyz",
    example: "abc",
    icon: CaseLower
  },
  {
    id: "numbers",
    label: "Numbers",
    value: "0123456789",
    example: "123",
    icon: Hash
  },
  {
    id: "symbols",
    label: "Symbols",
    value: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    example: "!@#",
    icon: Fingerprint
  }
] as const;

export type PasswordCharOption = (typeof PASSWORD_CHAR_OPTIONS)[number]["id"];

export interface PasswordOptions {
  length: number;
  selected: PasswordCharOption[];
}

export const generatePassword = (options: PasswordOptions): string => {
  const { length, selected } = options;

  let allChars = "";
  for (const option of PASSWORD_CHAR_OPTIONS) {
    if (selected.includes(option.id)) {
      allChars += option.value;
    }
  }

  if (allChars === "") return "";

  let password = "";

  const getSecureRandomIndex = (max: number) => {
    if (typeof window === "undefined" || !window.crypto) {
      return Math.floor(Math.random() * max);
    }
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  const ensureChar = (id: PasswordCharOption) => {
    const charset = PASSWORD_CHAR_OPTIONS.find((o) => o.id === id)?.value || "";
    if (charset) password += charset[getSecureRandomIndex(charset.length)];
  };

  for (const option of PASSWORD_CHAR_OPTIONS) {
    if (selected.includes(option.id)) {
      ensureChar(option.id);
    }
  }

  while (password.length < length) {
    password += allChars[getSecureRandomIndex(allChars.length)];
  }

  return password
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("");
};

export const calculateStrength = (password: string): number => {
  let strength = 0;
  if (password.length > 8) strength += 20;
  if (password.length > 12) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  return Math.min(100, strength);
};
