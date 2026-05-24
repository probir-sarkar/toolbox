export type QRContentType = 'url' | 'text' | 'wifi' | 'vcard';
export type QRCodeColor = 'black' | 'blue' | 'red' | 'green' | 'custom';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface WiFiConfig {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface VCardConfig {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  organization: string;
  website: string;
}

export interface QRSettings {
  size: number;
  color: QRCodeColor;
  customColor?: string;
  backgroundColor: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
}
