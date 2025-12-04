# QRCore - Advanced QR Code SaaS Platform

A modern, full-stack QR code generation SaaS platform built with Next.js 14+, TypeScript, Tailwind CSS, Framer Motion, and Firebase.

![QRCore](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Firebase](https://img.shields.io/badge/Firebase-12-orange?logo=firebase)

## Features

- 🚀 **13+ QR Code Types** - URL, Text, Email, Phone, SMS, WiFi, vCard, GS1, UPC, EAN, Events, Location, Bitcoin
- 🎨 **Advanced Customization** - Colors, sizes, error correction levels, and more
- ✨ **Smooth Animations** - Beautiful UI with Framer Motion animations
- 🔥 **Firebase Integration** - Authentication, Firestore database, and Analytics
- ⚡ **Serverless API** - Next.js API routes for QR code generation
- 📊 **Analytics Dashboard** - Track QR code scans and performance
- 💼 **SaaS Ready** - Pricing plans, authentication, and user management
- 📱 **Responsive Design** - Mobile-first, works on all devices

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Backend**: Firebase (Auth, Firestore)
- **QR Generation**: qrcode library
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Firebase project (for authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/qrcodes.git
cd qrcodes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure Firebase in `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   └── qr/           # QR code generation API
│   ├── about/            # About page
│   ├── dashboard/        # User dashboard
│   ├── docs/             # API documentation
│   ├── features/         # Features page
│   ├── login/            # Login page
│   ├── pricing/          # Pricing page
│   ├── signup/           # Signup page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── animations/       # Framer Motion components
│   ├── layout/           # Navbar, Footer
│   ├── qr/               # QR code components
│   └── ui/               # Reusable UI components
├── lib/                   # Utility functions
│   ├── firebase.ts       # Firebase configuration
│   ├── qr-generator.ts   # QR data generation
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript types
```

## API Endpoints

### Generate QR Code

```bash
POST /api/qr/generate
```

Request body:
```json
{
  "data": "https://example.com",
  "size": 300,
  "foregroundColor": "#000000",
  "backgroundColor": "#ffffff",
  "errorCorrection": "M"
}
```

Response:
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,...",
  "metadata": {
    "data": "https://example.com",
    "size": 300,
    "generatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Support

- 📧 Email: support@qrcore.com
- 📖 Documentation: [/docs](/docs)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/qrcodes/issues)
