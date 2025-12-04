'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Download, Save, Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { QRTypeSelector } from './qr-type-selector';
import { QRFormFields } from './qr-form-fields';
import { generateQRData } from '@/lib/qr-generator';
import type { QRCodeType, QRCodeSettings } from '@/types/qr';

interface QRGeneratorProps {
  onSave?: (qrData: { type: QRCodeType; data: string; imageUrl: string; settings: QRCodeSettings }) => void;
}

export function QRGenerator({ onSave }: QRGeneratorProps) {
  const [selectedType, setSelectedType] = useState<QRCodeType>('url');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [settings, setSettings] = useState<QRCodeSettings>({
    size: 300,
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    errorCorrection: 'M',
  });
  const [qrImageUrl, setQrImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSettingChange = useCallback(
    (field: keyof QRCodeSettings, value: string | number) => {
      setSettings((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const generateQRCode = async () => {
    const data = generateQRData(selectedType, formData);

    if (!data || data.trim() === '') {
      setError('Please fill in the required fields');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/qr/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          size: settings.size,
          foregroundColor: settings.foregroundColor,
          backgroundColor: settings.backgroundColor,
          errorCorrection: settings.errorCorrection,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }

      const result = await response.json();
      setQrImageUrl(result.qrCode);
    } catch (err) {
      setError('Error generating QR code. Please try again.');
      console.error('QR generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = (format: 'png' | 'svg') => {
    if (!qrImageUrl) return;

    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `qrcode-${selectedType}-${Date.now()}.${format}`;
    link.click();
  };

  const handleSave = () => {
    if (!qrImageUrl || !onSave) return;
    const data = generateQRData(selectedType, formData);
    onSave({ type: selectedType, data, imageUrl: qrImageUrl, settings });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          {/* QR Type Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <QRTypeSelector
              selectedType={selectedType}
              onSelect={(type) => {
                setSelectedType(type);
                setFormData({});
                setQrImageUrl(null);
              }}
            />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Input Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Content</h3>
                <QRFormFields
                  type={selectedType}
                  formData={formData}
                  onChange={handleFormChange}
                />
              </div>

              {/* Customization Options */}
              <div className="space-y-4 p-4 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  Customize
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Foreground Color
                    </label>
                    <input
                      type="color"
                      value={settings.foregroundColor}
                      onChange={(e) => handleSettingChange('foregroundColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={settings.backgroundColor}
                      onChange={(e) => handleSettingChange('backgroundColor', e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer border-2 border-gray-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Size: {settings.size}px
                  </label>
                  <input
                    type="range"
                    min="200"
                    max="800"
                    value={settings.size}
                    onChange={(e) => handleSettingChange('size', parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>
                <Select
                  label="Error Correction"
                  value={settings.errorCorrection}
                  onChange={(e) => handleSettingChange('errorCorrection', e.target.value as 'L' | 'M' | 'Q' | 'H')}
                  options={[
                    { value: 'L', label: 'Low (7%)' },
                    { value: 'M', label: 'Medium (15%)' },
                    { value: 'Q', label: 'Quartile (25%)' },
                    { value: 'H', label: 'High (30%)' },
                  ]}
                />
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 bg-red-50 text-red-600 rounded-xl text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Generate Button */}
              <Button
                onClick={generateQRCode}
                disabled={isLoading}
                className="w-full"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </motion.div>

            {/* QR Preview Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="relative w-72 h-72 bg-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center border-2 border-gray-100">
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4"
                    >
                      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
                      <p className="text-gray-500 text-sm">Generating...</p>
                    </motion.div>
                  ) : qrImageUrl ? (
                    <motion.div
                      key="qr"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    >
                      <Image
                        src={qrImageUrl}
                        alt="Generated QR Code"
                        width={256}
                        height={256}
                        className="object-contain"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center p-8"
                    >
                      <div className="text-6xl mb-4 opacity-30">📱</div>
                      <p className="text-gray-400 text-sm">
                        Your QR code will appear here
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Download Actions */}
              <AnimatePresence>
                {qrImageUrl && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="flex flex-wrap gap-3 mt-6 justify-center"
                  >
                    <Button variant="secondary" onClick={() => downloadQR('png')}>
                      <Download className="w-4 h-4" />
                      PNG
                    </Button>
                    <Button variant="secondary" onClick={() => downloadQR('svg')}>
                      <Download className="w-4 h-4" />
                      SVG
                    </Button>
                    {onSave && (
                      <Button variant="outline" onClick={handleSave}>
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
