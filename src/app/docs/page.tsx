'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Code, Zap, Key, Book } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const sections = [
  { id: 'overview', title: 'Overview', icon: Book },
  { id: 'authentication', title: 'Authentication', icon: Key },
  { id: 'generate', title: 'Generate QR', icon: Zap },
  { id: 'types', title: 'QR Types', icon: Code },
];

const codeExamples = {
  curl: `curl -X POST "https://api.qrcore.com/v1/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": "https://example.com",
    "type": "url",
    "size": 300,
    "color": "2563eb"
  }'`,
  javascript: `const response = await fetch('https://api.qrcore.com/v1/generate', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    data: 'https://example.com',
    type: 'url',
    size: 300,
    color: '2563eb'
  })
});

const qrCode = await response.json();`,
  python: `import requests

response = requests.post(
    'https://api.qrcore.com/v1/generate',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'data': 'https://example.com',
        'type': 'url',
        'size': 300,
        'color': '2563eb'
    }
)

qr_code = response.json()`,
};

const parameters = [
  { name: 'data', type: 'string', required: true, desc: 'Content to encode in the QR code' },
  { name: 'type', type: 'string', required: false, desc: 'QR code type: url, text, email, phone, sms, wifi, vcard' },
  { name: 'format', type: 'string', required: false, desc: 'Output format: png, svg, pdf (default: png)' },
  { name: 'size', type: 'integer', required: false, desc: 'Size in pixels: 100-1000 (default: 300)' },
  { name: 'color', type: 'string', required: false, desc: 'Foreground color (hex without #)' },
  { name: 'background', type: 'string', required: false, desc: 'Background color (hex without #)' },
  { name: 'error_correction', type: 'string', required: false, desc: 'Error correction: L, M, Q, H (default: M)' },
];

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeLanguage, setActiveLanguage] = useState<'curl' | 'javascript' | 'python'>('curl');
  const [copied, setCopied] = useState(false);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <FadeIn>
              <div className="sticky top-24">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Documentation
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <section.icon className="w-4 h-4" />
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </FadeIn>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <FadeIn>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">API Documentation</h1>
              <p className="text-gray-600 mb-8">
                Complete guide to integrating QRCore into your applications
              </p>
            </FadeIn>

            {/* Quick Start */}
            <FadeIn delay={0.1}>
              <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-2">🚀 Quick Start</h2>
                  <p className="text-blue-100 mb-4">
                    Generate your first QR code with just one API call
                  </p>
                  <div className="bg-gray-900/50 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X POST "https://api.qrcore.com/v1/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d "data=https://example.com"`}</pre>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Overview Section */}
            <FadeIn delay={0.2}>
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900">Overview</h2>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>
                    The QRCore API provides a simple, powerful way to generate and manage QR codes
                    programmatically. Our RESTful API supports all major QR code types, advanced
                    customization options, and comprehensive analytics.
                  </p>
                  <h4 className="font-semibold mt-4">Base URL</h4>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                    https://api.qrcore.com/v1
                  </div>
                  <h4 className="font-semibold mt-4">Rate Limits</h4>
                  <ul className="space-y-1">
                    <li><strong>Starter:</strong> 100 requests/month</li>
                    <li><strong>Pro:</strong> 1,000 requests/month</li>
                    <li><strong>Business:</strong> 10,000 requests/month</li>
                    <li><strong>Enterprise:</strong> Unlimited</li>
                  </ul>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Authentication Section */}
            <FadeIn delay={0.3}>
              <Card className="mb-8">
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900">Authentication</h2>
                </CardHeader>
                <CardContent className="prose prose-gray max-w-none">
                  <p>
                    QRCore uses API keys for authentication. Include your API key in the
                    Authorization header with the Bearer scheme.
                  </p>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    You can find your API key in your{' '}
                    <a href="/api-keys" className="text-blue-600 hover:underline">
                      dashboard
                    </a>
                    .
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Generate QR Section */}
            <FadeIn delay={0.4}>
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Generate QR Code</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      POST
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="font-mono text-sm bg-gray-100 rounded-lg p-3 mb-4">
                    /v1/generate
                  </div>

                  {/* Language Tabs */}
                  <div className="flex gap-2 mb-4">
                    {(['curl', 'javascript', 'python'] as const).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          activeLanguage === lang
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>

                  {/* Code Block */}
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyCode(codeExamples[activeLanguage])}
                      className="absolute top-3 right-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-300" />
                      )}
                    </motion.button>
                    <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                      <pre>{codeExamples[activeLanguage]}</pre>
                    </div>
                  </div>

                  {/* Parameters Table */}
                  <h4 className="font-semibold text-gray-900 mt-6 mb-4">Parameters</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Parameter
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Type
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Required
                          </th>
                          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Description
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {parameters.map((param) => (
                          <tr key={param.name}>
                            <td className="px-4 py-3 font-mono text-sm text-blue-600">
                              {param.name}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{param.type}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  param.required
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {param.required ? 'Required' : 'Optional'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{param.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* SDKs Section */}
            <FadeIn delay={0.5}>
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-bold text-gray-900">SDKs & Libraries</h2>
                </CardHeader>
                <CardContent>
                  <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { name: 'JavaScript', install: 'npm install @qrcore/sdk', icon: '📦' },
                      { name: 'Python', install: 'pip install qrcore-python', icon: '🐍' },
                      { name: 'PHP', install: 'composer require qrcore/sdk', icon: '🐘' },
                    ].map((sdk) => (
                      <StaggerItem key={sdk.name}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 border border-gray-200 rounded-xl"
                        >
                          <div className="text-2xl mb-2">{sdk.icon}</div>
                          <div className="font-semibold text-gray-900 mb-2">{sdk.name}</div>
                          <div className="bg-gray-100 rounded-lg p-2 font-mono text-xs text-gray-600">
                            {sdk.install}
                          </div>
                        </motion.div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </CardContent>
              </Card>
            </FadeIn>
          </main>
        </div>
      </div>
    </div>
  );
}
