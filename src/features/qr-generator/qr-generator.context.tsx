import { createContext, useContext, ReactNode, useState, useCallback } from "react";

type QRContentType = 'url' | 'text' | 'wifi' | 'vcard';
type QRCodeColor = 'black' | 'blue' | 'red' | 'green' | 'custom';
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

interface VCardConfig {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  website: string;
}

interface QRSettings {
  size: number;
  color: QRCodeColor;
  customColor?: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}

interface QRGeneratorContextValue {
  contentType: QRContentType;
  content: string;
  wifiConfig: WiFiConfig;
  vcardConfig: VCardConfig;
  settings: QRSettings;
  qrCodeUrl: string | null;
  isGenerating: boolean;
  error: string | null;
  setContentType: (type: QRContentType) => void;
  setContent: (content: string) => void;
  setWifiConfig: (config: Partial<WiFiConfig>) => void;
  setVcardConfig: (config: Partial<VCardConfig>) => void;
  updateSettings: (settings: Partial<QRSettings>) => void;
  generateQRCode: () => Promise<void>;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultSettings: QRSettings = {
  size: 300,
  color: 'black',
  backgroundColor: '#FFFFFF',
  errorCorrectionLevel: 'M',
};

const defaultWiFiConfig: WiFiConfig = {
  ssid: '',
  password: '',
  encryption: 'WPA',
  hidden: false,
};

const defaultVCardConfig: VCardConfig = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  organization: '',
  website: '',
};

const QRGeneratorContext = createContext<QRGeneratorContextValue | null>(null);

export function QRGeneratorProvider({ children }: { children: ReactNode }) {
  const [contentType, internalSetContentType] = useState<QRContentType>('url');
  const [content, setContent] = useState('');
  const [wifiConfig, setWifiConfig] = useState<WiFiConfig>(defaultWiFiConfig);
  const [vcardConfig, setVcardConfig] = useState<VCardConfig>(defaultVCardConfig);
  const [settings, setSettings] = useState<QRSettings>(defaultSettings);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const generateQRCode = useCallback(async () => {
    setIsGenerating(true);
    setError(null);

    try {
      let qrContent = content;

      // Generate content based on type
      switch (contentType) {
        case 'wifi':
          if (!wifiConfig.ssid) {
            throw new Error('SSID is required for WiFi QR codes');
          }
          qrContent = `WIFI:T:${wifiConfig.encryption};S:${wifiConfig.ssid};P:${wifiConfig.password};H:${wifiConfig.hidden};;`;
          break;

        case 'vcard':
          const vcard = `BEGIN:VCARD
VERSION:3.0
N:${vcardConfig.lastName};${vcardConfig.firstName}
FN:${vcardConfig.firstName} ${vcardConfig.lastName}
ORG:${vcardConfig.organization}
TEL:${vcardConfig.phone}
EMAIL:${vcardConfig.email}
URL:${vcardConfig.website}
END:VCARD`;
          qrContent = vcard;
          break;

        case 'text':
          if (!content.trim()) {
            throw new Error('Text content is required');
          }
          qrContent = content;
          break;

        case 'url':
          if (!content.trim()) {
            throw new Error('URL is required');
          }
          // Auto-prefix URL if needed
          qrContent = content.startsWith('http') ? content : `https://${content}`;
          break;
      }

      // Dynamic import for QR code generation
      const QRCode = await import('qrcode');
      const canvas = document.createElement('canvas');

      // Determine color
      let color = '#000000';
      switch (settings.color) {
        case 'black': color = '#000000'; break;
        case 'blue': color = '#0000FF'; break;
        case 'red': color = '#FF0000'; break;
        case 'green': color = '#008000'; break;
        case 'custom': color = settings.customColor || '#000000'; break;
      }

      await QRCode.toCanvas(canvas, qrContent, {
        width: settings.size,
        margin: 2,
        color: {
          dark: color,
          light: settings.backgroundColor,
        },
        errorCorrectionLevel: settings.errorCorrectionLevel,
      });

      const qrCodeUrl = canvas.toDataURL('image/png');
      setQrCodeUrl(qrCodeUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate QR code');
      setQrCodeUrl(null);
    } finally {
      setIsGenerating(false);
    }
  }, [content, contentType, wifiConfig, vcardConfig, settings]);

  const reset = useCallback(() => {
    setContent('');
    setQrCodeUrl(null);
    setError(null);
    setWifiConfig(defaultWiFiConfig);
    setVcardConfig(defaultVCardConfig);
  }, []);

  const value = {
    contentType,
    content,
    wifiConfig,
    vcardConfig,
    settings,
    qrCodeUrl,
    isGenerating,
    error,
    setContentType,
    setContent,
    setWifiConfig: setWifiConfigHandler,
    setVcardConfig: setVcardConfigHandler,
    updateSettings,
    generateQRCode,
    setError,
    reset
  };

  return (
    <QRGeneratorContext.Provider value={value}>
      {children}
    </QRGeneratorContext.Provider>
  );
}

export function useQRGeneratorContext(): QRGeneratorContextValue {
  const context = useContext(QRGeneratorContext);
  if (!context) {
    throw new Error("useQRGeneratorContext must be used within QRGeneratorProvider");
  }
  return context;
}
