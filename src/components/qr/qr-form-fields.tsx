'use client';

import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import type { QRCodeType } from '@/types/qr';

interface QRFormFieldsProps {
  type: QRCodeType;
  formData: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function QRFormFields({ type, formData, onChange }: QRFormFieldsProps) {
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field, e.target.value);
  };

  switch (type) {
    case 'url':
      return (
        <Input
          label="Website URL"
          type="url"
          placeholder="https://example.com"
          value={formData.url || ''}
          onChange={handleChange('url')}
        />
      );

    case 'text':
      return (
        <div className="w-full">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Text Content
          </label>
          <textarea
            placeholder="Enter your text here..."
            value={formData.text || ''}
            onChange={handleChange('text')}
            rows={4}
            className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
          />
        </div>
      );

    case 'email':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="To Email"
              type="email"
              placeholder="contact@example.com"
              value={formData.to || ''}
              onChange={handleChange('to')}
            />
            <Input
              label="Subject"
              type="text"
              placeholder="Email subject"
              value={formData.subject || ''}
              onChange={handleChange('subject')}
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              placeholder="Email message..."
              value={formData.body || ''}
              onChange={handleChange('body')}
              rows={3}
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>
        </div>
      );

    case 'phone':
      return (
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+1234567890"
          value={formData.number || ''}
          onChange={handleChange('number')}
        />
      );

    case 'sms':
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            type="tel"
            placeholder="+1234567890"
            value={formData.number || ''}
            onChange={handleChange('number')}
          />
          <Input
            label="Message"
            type="text"
            placeholder="SMS message"
            value={formData.message || ''}
            onChange={handleChange('message')}
          />
        </div>
      );

    case 'wifi':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Network Name (SSID)"
              type="text"
              placeholder="WiFi Network Name"
              value={formData.ssid || ''}
              onChange={handleChange('ssid')}
            />
            <Input
              label="Password"
              type="password"
              placeholder="WiFi Password"
              value={formData.password || ''}
              onChange={handleChange('password')}
            />
          </div>
          <Select
            label="Security Type"
            value={formData.security || 'WPA'}
            onChange={handleChange('security')}
            options={[
              { value: 'WPA', label: 'WPA/WPA2' },
              { value: 'WEP', label: 'WEP' },
              { value: 'nopass', label: 'Open Network' },
            ]}
          />
        </div>
      );

    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              placeholder="John"
              value={formData.firstName || ''}
              onChange={handleChange('firstName')}
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Doe"
              value={formData.lastName || ''}
              onChange={handleChange('lastName')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email || ''}
              onChange={handleChange('email')}
            />
            <Input
              label="Phone"
              type="tel"
              placeholder="+1234567890"
              value={formData.phone || ''}
              onChange={handleChange('phone')}
            />
          </div>
          <Input
            label="Organization"
            type="text"
            placeholder="Company Name"
            value={formData.organization || ''}
            onChange={handleChange('organization')}
          />
          <Input
            label="Website"
            type="url"
            placeholder="https://example.com"
            value={formData.website || ''}
            onChange={handleChange('website')}
          />
        </div>
      );

    case 'gs1':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="GTIN (Global Trade Item Number)"
              type="text"
              placeholder="01234567890123"
              maxLength={14}
              value={formData.gtin || ''}
              onChange={handleChange('gtin')}
            />
            <Input
              label="Lot/Batch Number (Optional)"
              type="text"
              placeholder="LOT123"
              value={formData.lot || ''}
              onChange={handleChange('lot')}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Serial Number (Optional)"
              type="text"
              placeholder="SER456789"
              value={formData.serial || ''}
              onChange={handleChange('serial')}
            />
            <Input
              label="Expiry Date (Optional)"
              type="date"
              value={formData.expiry || ''}
              onChange={handleChange('expiry')}
            />
          </div>
          <Input
            label="GS1 Digital Link URL (Optional)"
            type="url"
            placeholder="https://id.gs1.org/01/01234567890123"
            value={formData.url || ''}
            onChange={handleChange('url')}
          />
        </div>
      );

    case 'upc':
      return (
        <div className="space-y-4">
          <Input
            label="UPC-A Code (12 digits)"
            type="text"
            placeholder="012345678901"
            maxLength={12}
            value={formData.code || ''}
            onChange={handleChange('code')}
          />
          <Input
            label="Product Name (Optional)"
            type="text"
            placeholder="Product Name"
            value={formData.product || ''}
            onChange={handleChange('product')}
          />
        </div>
      );

    case 'ean':
      return (
        <div className="space-y-4">
          <Select
            label="EAN Type"
            value={formData.eanType || 'EAN13'}
            onChange={handleChange('eanType')}
            options={[
              { value: 'EAN13', label: 'EAN-13 (13 digits)' },
              { value: 'EAN8', label: 'EAN-8 (8 digits)' },
            ]}
          />
          <Input
            label="EAN Code"
            type="text"
            placeholder="1234567890123"
            maxLength={13}
            value={formData.code || ''}
            onChange={handleChange('code')}
          />
        </div>
      );

    case 'event':
      return (
        <div className="space-y-4">
          <Input
            label="Event Title"
            type="text"
            placeholder="Conference 2024"
            value={formData.title || ''}
            onChange={handleChange('title')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Start Date & Time"
              type="datetime-local"
              value={formData.start || ''}
              onChange={handleChange('start')}
            />
            <Input
              label="End Date & Time"
              type="datetime-local"
              value={formData.end || ''}
              onChange={handleChange('end')}
            />
          </div>
          <Input
            label="Location"
            type="text"
            placeholder="123 Main St, City"
            value={formData.location || ''}
            onChange={handleChange('location')}
          />
          <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Event description..."
              value={formData.description || ''}
              onChange={handleChange('description')}
              rows={3}
              className="w-full px-4 py-3 text-gray-900 bg-white border-2 border-gray-200 rounded-xl transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
            />
          </div>
        </div>
      );

    case 'location':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Latitude"
              type="number"
              step="any"
              placeholder="40.7128"
              value={formData.latitude || ''}
              onChange={handleChange('latitude')}
            />
            <Input
              label="Longitude"
              type="number"
              step="any"
              placeholder="-74.0060"
              value={formData.longitude || ''}
              onChange={handleChange('longitude')}
            />
          </div>
          <Input
            label="Location Name (Optional)"
            type="text"
            placeholder="New York City"
            value={formData.label || ''}
            onChange={handleChange('label')}
          />
        </div>
      );

    case 'bitcoin':
      return (
        <div className="space-y-4">
          <Input
            label="Bitcoin Address"
            type="text"
            placeholder="bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
            value={formData.address || ''}
            onChange={handleChange('address')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Amount (BTC - Optional)"
              type="number"
              step="any"
              placeholder="0.001"
              value={formData.amount || ''}
              onChange={handleChange('amount')}
            />
            <Input
              label="Label (Optional)"
              type="text"
              placeholder="Payment for services"
              value={formData.label || ''}
              onChange={handleChange('label')}
            />
          </div>
          <Input
            label="Message (Optional)"
            type="text"
            placeholder="Thank you for your payment"
            value={formData.message || ''}
            onChange={handleChange('message')}
          />
        </div>
      );

    default:
      return null;
  }
}
