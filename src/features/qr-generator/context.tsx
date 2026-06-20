import { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { useProcessingState } from "@/shared/hooks";
import { generateQRCode } from "./services/qr-generator";
import { DEFAULT_QR_SETTINGS, DEFAULT_WIFI_CONFIG, DEFAULT_VCARD_CONFIG } from "./constants";
import type { QRContentType, WiFiConfig, VCardConfig, QRSettings } from "./types";

interface QRGeneratorContextValue {
  contentType: QRContentType;
  content: string;
  wifiConfig: WiFiConfig;
  vcardConfig: VCardConfig;
  settings: QRSettings;
  qrCodeUrl: string | null;
  setContentType: (type: QRContentType) => void;
  setContent: (content: string) => void;
  setWifiConfig: (config: Partial<WiFiConfig>) => void;
  setVcardConfig: (config: Partial<VCardConfig>) => void;
  updateSettings: (settings: Partial<QRSettings>) => void;
  generateQR: () => Promise<void>;
  setError: (error: string | null) => void;
  reset: () => void;
}

const QRGeneratorContext = createContext<QRGeneratorContextValue | null>(null);

export function QRGeneratorProvider({ children }: { children: ReactNode }) {
  const [contentType, internalSetContentType] = useState<QRContentType>("url");
  const [content, setContent] = useState("");
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>(DEFAULT_WIFI_CONFIG);
  const [vcardConfig, setVcardConfig] = useState<VCardConfig>(DEFAULT_VCARD_CONFIG);
  const [settings, setSettings] = useState<QRSettings>(DEFAULT_QR_SETTINGS);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);

  const processingState = useProcessingState();

  const setContentType = useCallback((type: QRContentType) => {
    internalSetContentType(type);
    setQrCodeUrl(null);
  }, []);

  const setWifiConfigHandler = useCallback((config: Partial<WiFiConfig>) => {
    setWifiConfig((prev) => ({ ...prev, ...config }));
  }, []);

  const setVcardConfigHandler = useCallback((config: Partial<VCardConfig>) => {
    setVcardConfig((prev) => ({ ...prev, ...config }));
  }, []);

  const updateSettings = useCallback((newSettings: Partial<QRSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  }, []);

  const generateQR = useCallback(async () => {
    processingState.startProcessing();

    try {
      const url = await generateQRCode({
        content,
        contentType,
        wifiConfig,
        vcardConfig,
        settings,
      });
      setQrCodeUrl(url);
      processingState.setSuccessWithStop();
    } catch (err) {
      processingState.setErrorWithStop(err instanceof Error ? err.message : "Failed to generate QR code");
      setQrCodeUrl(null);
    }
  }, [content, contentType, wifiConfig, vcardConfig, settings, processingState]);

  const reset = useCallback(() => {
    setContent("");
    setQrCodeUrl(null);
    processingState.setError(null);
    setWifiConfig(DEFAULT_WIFI_CONFIG);
    setVcardConfig(DEFAULT_VCARD_CONFIG);
  }, [processingState]);

  const value: QRGeneratorContextValue = {
    contentType,
    content,
    wifiConfig,
    vcardConfig,
    settings,
    qrCodeUrl,
    setContentType,
    setContent,
    setWifiConfig: setWifiConfigHandler,
    setVcardConfig: setVcardConfigHandler,
    updateSettings,
    generateQR,
    setError: processingState.setError,
    reset,
  };

  return <QRGeneratorContext.Provider value={value}>{children}</QRGeneratorContext.Provider>;
}

export function useQRGeneratorContext(): QRGeneratorContextValue {
  const context = useContext(QRGeneratorContext);
  if (!context) {
    throw new Error("useQRGeneratorContext must be used within QRGeneratorProvider");
  }
  return context;
}

// Re-export processing state for convenience
export function useQRGeneratorState() {
  const { qrCodeUrl, ...context } = useQRGeneratorContext();
  const processing = useProcessingState();

  return {
    ...context,
    qrCodeUrl,
    isGenerating: processing.isProcessing,
    error: processing.error,
    success: processing.success,
  };
}
