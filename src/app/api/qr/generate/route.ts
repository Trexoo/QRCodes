import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

// Validate hex color format
function isValidHexColor(color: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(color);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      data,
      size = 300,
      foregroundColor = '#000000',
      backgroundColor = '#ffffff',
      errorCorrection = 'M',
    } = body;

    if (!data || typeof data !== 'string' || data.trim() === '') {
      return NextResponse.json(
        { error: 'Data is required' },
        { status: 400 }
      );
    }

    // Validate color formats
    const validForeground = isValidHexColor(foregroundColor) ? foregroundColor : '#000000';
    const validBackground = isValidHexColor(backgroundColor) ? backgroundColor : '#ffffff';

    // Validate error correction level
    const validErrorCorrection = ['L', 'M', 'Q', 'H'].includes(errorCorrection) ? errorCorrection : 'M';

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width: Math.min(Math.max(size, 100), 1000),
      margin: 2,
      color: {
        dark: validForeground,
        light: validBackground,
      },
      errorCorrectionLevel: validErrorCorrection as 'L' | 'M' | 'Q' | 'H',
    });

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      metadata: {
        data,
        size,
        foregroundColor: validForeground,
        backgroundColor: validBackground,
        errorCorrection: validErrorCorrection,
        generatedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('QR generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate QR code' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'QR Code Generation API',
    version: '1.0.0',
    endpoints: {
      'POST /api/qr/generate': 'Generate a QR code',
    },
  });
}
