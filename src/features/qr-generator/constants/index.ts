import type { QRSettings, WiFiConfig, VCardConfig } from "../types";

export const DEFAULT_QR_SETTINGS: QRSettings = {
  size: 300,
  color: "black",
  backgroundColor: "#FFFFFF",
  errorCorrectionLevel: "M",
};

export const DEFAULT_WIFI_CONFIG: WiFiConfig = {
  ssid: "",
  password: "",
  encryption: "WPA",
  hidden: false,
};

export const DEFAULT_VCARD_CONFIG: VCardConfig = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  organization: "",
  website: "",
};

export const COLOR_MAP = {
  black: "#000000",
  blue: "#0000FF",
  red: "#FF0000",
  green: "#008000",
} as const;
