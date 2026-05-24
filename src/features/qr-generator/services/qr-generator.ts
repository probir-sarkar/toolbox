import type { QRSettings, QRContentType, WiFiConfig, VCardConfig } from "../types";
import { COLOR_MAP } from "../constants";

export interface GenerateQROptions {
  content: string;
  contentType: QRContentType;
  wifiConfig: WiFiConfig;
  vcardConfig: VCardConfig;
  settings: QRSettings;
}

export async function generateQRCode(options: GenerateQROptions): Promise<string> {
  const { content, contentType, wifiConfig, vcardConfig, settings } = options;

  let qrContent = content;

  // Generate content based on type
  switch (contentType) {
    case 'wifi': {
      if (!wifiConfig.ssid) {
        throw new Error('SSID is required for WiFi QR codes');
      }
      qrContent = `WIFI:T:${wifiConfig.encryption};S:${wifiConfig.ssid};P:${wifiConfig.password};H:${wifiConfig.hidden};;`;
      break;
    }

    case 'vcard': {
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
    }

    case 'text': {
      if (!content.trim()) {
        throw new Error('Text content is required');
      }
      qrContent = content;
      break;
    }

    case 'url': {
      if (!content.trim()) {
        throw new Error('URL is required');
      }
      qrContent = content.startsWith('http') ? content : `https://${content}`;
      break;
    }
  }

  // Dynamic import for QR code generation
  const QRCode = await import('qrcode');
  const canvas = document.createElement('canvas');

  // Determine color
  let color: string;
  if (settings.color === 'custom') {
    color = settings.customColor || '#000000';
  } else {
    color = COLOR_MAP[settings.color] || '#000000';
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

  return canvas.toDataURL('image/png');
}
