export type PasswordCharOption = "uppercase" | "lowercase" | "numbers" | "symbols";

export interface PasswordOptions {
  length: number;
  selected: PasswordCharOption[];
}

export interface PasswordStrength {
  score: number;
  label: "Weak" | "Medium" | "Strong";
  color: string;
}
