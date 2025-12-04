import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

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

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width: Math.min(Math.max(size, 100), 1000),
      margin: 2,
      color: {
        dark: foregroundColor,
        light: backgroundColor,
      },
      errorCorrectionLevel: errorCorrection as 'L' | 'M' | 'Q' | 'H',
    });

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      metadata: {
        data,
        size,
        foregroundColor,
        backgroundColor,
        errorCorrection,
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
