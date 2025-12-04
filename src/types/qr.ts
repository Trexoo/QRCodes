export type QRCodeType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'gs1'
  | 'upc'
  | 'ean'
  | 'event'
  | 'location'
  | 'bitcoin';

export interface QRCodeSettings {
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
}

export interface QRCodeData {
  id: string;
  type: QRCodeType;
  data: string;
  name?: string;
  settings: QRCodeSettings;
  imageUrl?: string;
  timestamp: string;
}

export interface QRTypeOption {
  type: QRCodeType;
  label: string;
  icon: string;
}

export const QR_TYPES: QRTypeOption[] = [
  { type: 'url', label: 'URL', icon: '🔗' },
  { type: 'text', label: 'Text', icon: '📝' },
  { type: 'email', label: 'Email', icon: '📧' },
  { type: 'phone', label: 'Phone', icon: '📱' },
  { type: 'sms', label: 'SMS', icon: '💬' },
  { type: 'wifi', label: 'WiFi', icon: '📶' },
  { type: 'vcard', label: 'vCard', icon: '👤' },
  { type: 'gs1', label: 'GS1', icon: '📦' },
  { type: 'upc', label: 'UPC', icon: '🏷️' },
  { type: 'ean', label: 'EAN', icon: '🔢' },
  { type: 'event', label: 'Event', icon: '📅' },
  { type: 'location', label: 'Location', icon: '📍' },
  { type: 'bitcoin', label: 'Bitcoin', icon: '₿' },
];
