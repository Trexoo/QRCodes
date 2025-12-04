'use client';

import { motion } from 'framer-motion';
import { QR_TYPES, type QRCodeType } from '@/types/qr';
import { cn } from '@/lib/utils';

interface QRTypeSelectorProps {
  selectedType: QRCodeType;
  onSelect: (type: QRCodeType) => void;
}

export function QRTypeSelector({ selectedType, onSelect }: QRTypeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {QR_TYPES.map((qrType) => (
        <motion.button
          key={qrType.type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(qrType.type)}
          className={cn(
            'px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-200',
            selectedType === qrType.type
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-transparent shadow-lg shadow-blue-500/25'
              : 'bg-white text-gray-700 border-gray-200 hover:border-blue-500 hover:text-blue-600'
          )}
        >
          <span className="mr-1.5">{qrType.icon}</span>
          {qrType.label}
        </motion.button>
      ))}
    </div>
  );
}
