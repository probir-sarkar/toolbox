export interface PasswordOptions {
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSymbols: boolean;
}

export const generatePassword = (options: PasswordOptions): string => {
  const { length, hasUppercase, hasLowercase, hasNumbers, hasSymbols } = options;

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let allChars = "";
  if (hasUppercase) allChars += upper;
  if (hasLowercase) allChars += lower;
  if (hasNumbers) allChars += numbers;
  if (hasSymbols) allChars += symbols;

  if (allChars === "") return "";

  let password = "";

  // Helper for secure random index
  const getSecureRandomIndex = (max: number) => {
    if (typeof window === "undefined" || !window.crypto) {
      // Fallback for SSR or envs without crypto (though this is client-side tool)
      return Math.floor(Math.random() * max);
    }
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
  };

  // Ensure at least one character from each selected set is included
  if (hasUppercase) password += upper[getSecureRandomIndex(upper.length)];
  if (hasLowercase) password += lower[getSecureRandomIndex(lower.length)];
  if (hasNumbers) password += numbers[getSecureRandomIndex(numbers.length)];
  if (hasSymbols) password += symbols[getSecureRandomIndex(symbols.length)];

  while (password.length < length) {
    password += allChars[getSecureRandomIndex(allChars.length)];
  }

  // Shuffle the password safely
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
