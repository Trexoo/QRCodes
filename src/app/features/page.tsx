'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Link2,
  Palette,
  BarChart3,
  Zap,
  Shield,
  Code,
  Smartphone,
  Mail,
  Wifi,
  User,
  MapPin,
  Calendar,
  Bitcoin,
  Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const mainFeatures = [
  {
    icon: Link2,
    title: 'Multiple QR Types',
    description: 'Generate QR codes for any content type with specialized formatting and validation.',
    items: ['Website URLs', 'Plain Text', 'Email Compose', 'Phone Numbers', 'SMS Messages', 'WiFi Networks', 'vCard Contacts', 'GS1 Digital Link', 'UPC-A / EAN Barcodes', 'Calendar Events', 'GPS Locations', 'Bitcoin Payments'],
  },
  {
    icon: Palette,
    title: 'Advanced Customization',
    description: 'Create branded QR codes that match your style and stand out.',
    items: ['Custom Colors', 'Variable Sizes', 'Error Correction Levels', 'Logo Integration', 'Style Templates', 'Batch Styling'],
  },
  {
    icon: BarChart3,
    title: 'Analytics & Tracking',
    description: 'Track performance and gain insights into how your QR codes are being used.',
    items: ['Scan Analytics', 'Geographic Data', 'Device Insights', 'Time-based Reports', 'Performance Metrics', 'Export Data'],
  },
  {
    icon: Zap,
    title: 'Bulk Operations',
    description: 'Generate hundreds of QR codes at once for large-scale projects.',
    items: ['CSV Upload', 'Batch Generation', 'Template Application', 'Bulk Customization', 'ZIP Downloads', 'Progress Tracking'],
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Built with enterprise-grade security and compliance standards.',
    items: ['Data Encryption', 'Secure Storage', 'Access Controls', 'Audit Logs', 'GDPR Compliant', 'SOC 2 Certified'],
  },
  {
    icon: Code,
    title: 'API Integration',
    description: 'Integrate QR generation into your applications with our robust API.',
    items: ['RESTful API', 'Multiple Formats', 'Webhook Support', 'Rate Limiting', 'Detailed Documentation', 'SDK Libraries'],
  },
];

const qrTypes = [
  { icon: Link2, name: 'Website URL', desc: 'Direct users to your website' },
  { icon: Mail, name: 'Email Contact', desc: 'Pre-filled email composition' },
  { icon: Wifi, name: 'WiFi Network', desc: 'Instant WiFi connection' },
  { icon: User, name: 'Contact Card', desc: 'Share contact info instantly' },
  { icon: Smartphone, name: 'Phone Call', desc: 'Direct dial to phone number' },
  { icon: MapPin, name: 'Location', desc: 'GPS coordinates sharing' },
  { icon: Calendar, name: 'Calendar Event', desc: 'Add events to calendars' },
  { icon: Package, name: 'GS1 / UPC / EAN', desc: 'Industry standard codes' },
  { icon: Bitcoin, name: 'Cryptocurrency', desc: 'Bitcoin payment requests' },
];

const comparison = [
  { feature: 'Multiple QR Types', qrcore: '✓ 13+ Types', basic: '✗ URLs Only', other: '✓ Limited' },
  { feature: 'Custom Styling', qrcore: '✓ Full Control', basic: '✗ Basic', other: '✓ Limited' },
  { feature: 'Analytics', qrcore: '✓ Advanced', basic: '✗ None', other: '✓ Basic' },
  { feature: 'Bulk Generation', qrcore: '✓ CSV Upload', basic: '✗ Manual Only', other: '✗ Paid Feature' },
  { feature: 'API Access', qrcore: '✓ Full API', basic: '✗ None', other: '✓ Limited' },
  { feature: 'Export Formats', qrcore: '✓ PNG, SVG, PDF', basic: '✓ PNG Only', other: '✓ PNG, SVG' },
  { feature: 'Team Collaboration', qrcore: '✓ Included', basic: '✗ None', other: '✗ Enterprise Only' },
];

export default function Features() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Powerful QR Features
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Everything you need to create, customize, and track professional QR codes
            </p>
            <Link href="/">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Try QRCore Free
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Complete QR Code Solution
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From simple QR codes to enterprise-grade solutions
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainFeatures.map((feature) => (
              <StaggerItem key={feature.title}>
                <Card hoverable className="h-full">
                  <CardContent className="p-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4"
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="text-green-500">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* QR Types Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                QR Code Examples
              </h2>
              <p className="text-lg text-gray-600">
                See the variety of QR codes you can create
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {qrTypes.map((type) => (
              <StaggerItem key={type.name}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow"
                >
                  <motion.div
                    whileHover={{ rotate: 10 }}
                    className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center"
                  >
                    <type.icon className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <h4 className="font-medium text-gray-900 mb-1">{type.name}</h4>
                  <p className="text-xs text-gray-500">{type.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose QRCore?
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                      <th className="px-6 py-4 text-left font-semibold">Feature</th>
                      <th className="px-6 py-4 text-left font-semibold">QRCore</th>
                      <th className="px-6 py-4 text-left font-semibold">Basic Generators</th>
                      <th className="px-6 py-4 text-left font-semibold">Other SaaS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.map((row, index) => (
                      <motion.tr
                        key={row.feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {row.feature}
                        </td>
                        <td className="px-6 py-4 text-green-600 font-medium">
                          {row.qrcore}
                        </td>
                        <td className="px-6 py-4 text-gray-500">{row.basic}</td>
                        <td className="px-6 py-4 text-gray-500">{row.other}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Easy Integration</h2>
              <p className="text-gray-400 text-lg">
                Integrate QRCore into your existing workflow
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🌐', title: 'REST API', desc: 'Simple HTTP requests' },
              { icon: '⚡', title: 'Webhooks', desc: 'Real-time notifications' },
              { icon: '📚', title: 'SDKs', desc: 'Official libraries' },
              { icon: '🔧', title: 'No-Code Tools', desc: 'Zapier, Make integrations' },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h4 className="font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-blue-100 mb-10">
              Join thousands of businesses using QRCore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
