import type { PasswordOptions, PasswordStrength } from "../types";
import { PASSWORD_CHAR_OPTIONS } from "../constants";

export function generatePassword(options: PasswordOptions): string {
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

  const ensureChar = (id: (typeof PASSWORD_CHAR_OPTIONS)[number]["id"]) => {
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
}

export function calculateStrength(password: string): number {
  let strength = 0;
  if (password.length > 8) strength += 20;
  if (password.length > 12) strength += 20;
  if (/[A-Z]/.test(password)) strength += 20;
  if (/[a-z]/.test(password)) strength += 20;
  if (/[0-9]/.test(password)) strength += 10;
  if (/[^A-Za-z0-9]/.test(password)) strength += 10;
  return Math.min(100, strength);
}

export function getPasswordStrength(score: number): PasswordStrength {
  if (score < 40) {
    return { score, label: "Weak", color: "text-red-500" };
  }
  if (score < 70) {
    return { score, label: "Medium", color: "text-yellow-500" };
  }
  return { score, label: "Strong", color: "text-green-500" };
}

export const STRENGTH_COLORS = {
  weak: "bg-red-500",
  medium: "bg-yellow-500",
  strong: "bg-green-500",
} as const;
