import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

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

interface QRGeneratorStore {
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

export const useQRGeneratorStore = create<QRGeneratorStore>()(
  immer((set, get) => ({
    contentType: 'url',
    content: '',
    wifiConfig: defaultWiFiConfig,
    vcardConfig: defaultVCardConfig,
    settings: defaultSettings,
    qrCodeUrl: null,
    isGenerating: false,
    error: null,

    setContentType: (type) =>
      set((state) => {
        state.contentType = type;
        state.qrCodeUrl = null;
      }),

    setContent: (content) =>
      set((state) => {
        state.content = content;
      }),

    setWifiConfig: (config) =>
      set((state) => {
        Object.assign(state.wifiConfig, config);
      }),

    setVcardConfig: (config) =>
      set((state) => {
        Object.assign(state.vcardConfig, config);
      }),

    updateSettings: (newSettings) =>
      set((state) => {
        Object.assign(state.settings, newSettings);
      }),

    generateQRCode: async () => {
      const { contentType, content, wifiConfig, vcardConfig, settings } = get();

      set({ isGenerating: true, error: null });

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
        set({ qrCodeUrl, isGenerating: false });
      } catch (err) {
        set({
          error: err instanceof Error ? err.message : 'Failed to generate QR code',
          isGenerating: false,
          qrCodeUrl: null,
        });
      }
    },

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    reset: () =>
      set((state) => {
        state.content = '';
        state.qrCodeUrl = null;
        state.error = null;
        state.wifiConfig = defaultWiFiConfig;
        state.vcardConfig = defaultVCardConfig;
      }),
  }))
);