// Main component
export { QRGenerator, QRGeneratorFaq } from "./qr-generator";

// Context
export { QRGeneratorProvider, useQRGeneratorContext, useQRGeneratorState } from "./context";

// Types
export type { QRContentType, QRCodeColor, ErrorCorrectionLevel, WiFiConfig, VCardConfig, QRSettings } from "./types";

// Constants
export { DEFAULT_QR_SETTINGS, DEFAULT_WIFI_CONFIG, DEFAULT_VCARD_CONFIG, COLOR_MAP } from "./constants";

// Service
export { generateQRCode } from "./services/qr-generator";
export type { GenerateQROptions } from "./services/qr-generator";
