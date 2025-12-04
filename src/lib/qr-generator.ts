import type { QRCodeType } from '@/types/qr';

export interface EmailFormData {
  to: string;
  subject: string;
  body: string;
}

export interface WiFiFormData {
  ssid: string;
  password: string;
  security: 'WPA' | 'WEP' | 'nopass';
}

export interface VCardFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organization: string;
  website: string;
}

export interface GS1FormData {
  gtin: string;
  lot?: string;
  serial?: string;
  expiry?: string;
  url?: string;
}

export interface EventFormData {
  title: string;
  start: string;
  end: string;
  location: string;
  description: string;
}

export interface LocationFormData {
  latitude: string;
  longitude: string;
  label?: string;
}

export interface BitcoinFormData {
  address: string;
  amount?: string;
  label?: string;
  message?: string;
}

export interface SMSFormData {
  number: string;
  message: string;
}

export function generateQRData(
  type: QRCodeType,
  formData: Record<string, string>
): string {
  switch (type) {
    case 'url':
      return formData.url || '';

    case 'text':
      return formData.text || '';

    case 'email':
      const email = formData.to || '';
      const subject = formData.subject || '';
      const body = formData.body || '';
      return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    case 'phone':
      return `tel:${formData.number || ''}`;

    case 'sms':
      const smsNumber = formData.number || '';
      const smsMessage = formData.message || '';
      return `sms:${smsNumber}?body=${encodeURIComponent(smsMessage)}`;

    case 'wifi':
      const ssid = formData.ssid || '';
      const password = formData.password || '';
      const security = formData.security || 'WPA';
      return `WIFI:T:${security};S:${ssid};P:${password};;`;

    case 'vcard':
      // Sanitize vCard fields to prevent format corruption
      const sanitizeVCardField = (str: string) => str.replace(/[\n\r;:]/g, ' ').trim();
      const firstName = sanitizeVCardField(formData.firstName || '');
      const lastName = sanitizeVCardField(formData.lastName || '');
      const vcardEmail = sanitizeVCardField(formData.email || '');
      const vcardPhone = sanitizeVCardField(formData.phone || '');
      const organization = sanitizeVCardField(formData.organization || '');
      const website = sanitizeVCardField(formData.website || '');
      return `BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
N:${lastName};${firstName}
EMAIL:${vcardEmail}
TEL:${vcardPhone}
ORG:${organization}
URL:${website}
END:VCARD`;

    case 'gs1':
      const gtin = formData.gtin || '';
      const lot = formData.lot || '';
      const serial = formData.serial || '';
      const expiry = formData.expiry || '';
      const gs1Url = formData.url || '';

      if (gs1Url) {
        return gs1Url;
      }

      let gs1Data = `(01)${gtin}`;
      if (lot) gs1Data += `(10)${lot}`;
      if (serial) gs1Data += `(21)${serial}`;
      if (expiry) {
        const expiryDate = new Date(expiry);
        // Validate that the date is valid
        if (!isNaN(expiryDate.getTime())) {
          const year = expiryDate.getFullYear().toString().slice(-2);
          const month = (expiryDate.getMonth() + 1).toString().padStart(2, '0');
          const day = expiryDate.getDate().toString().padStart(2, '0');
          gs1Data += `(17)${year}${month}${day}`;
        }
      }
      return gs1Data;

    case 'upc':
      const upcCode = formData.code || '';
      return upcCode.padStart(12, '0');

    case 'ean':
      const eanType = formData.eanType || 'EAN13';
      const eanCode = formData.code || '';
      const padLength = eanType === 'EAN13' ? 13 : 8;
      return eanCode.padStart(padLength, '0');

    case 'event':
      const eventTitle = formData.title || '';
      const eventStart = formData.start || '';
      const eventEnd = formData.end || '';
      const eventLocation = formData.location || '';
      const eventDescription = formData.description || '';

      const formatDateTime = (dt: string) => {
        if (!dt) return '';
        return new Date(dt).toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      };

      return `BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${formatDateTime(eventStart)}
DTEND:${formatDateTime(eventEnd)}
LOCATION:${eventLocation}
DESCRIPTION:${eventDescription}
END:VEVENT`;

    case 'location':
      const lat = formData.latitude || '';
      const lng = formData.longitude || '';
      const geoLabel = formData.label || '';
      if (geoLabel) {
        return `geo:${lat},${lng}?q=${encodeURIComponent(geoLabel)}`;
      }
      return `geo:${lat},${lng}`;

    case 'bitcoin':
      const btcAddress = formData.address || '';
      const btcAmount = formData.amount || '';
      const btcLabel = formData.label || '';
      const btcMessage = formData.message || '';

      const btcParams: string[] = [];
      if (btcAmount) btcParams.push(`amount=${btcAmount}`);
      if (btcLabel) btcParams.push(`label=${encodeURIComponent(btcLabel)}`);
      if (btcMessage) btcParams.push(`message=${encodeURIComponent(btcMessage)}`);

      let btcUrl = `bitcoin:${btcAddress}`;
      if (btcParams.length > 0) {
        btcUrl += '?' + btcParams.join('&');
      }
      return btcUrl;

    default:
      return '';
  }
}
