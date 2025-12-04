'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const team = [
  { name: 'Alex Johnson', role: 'CEO & Co-founder', icon: '👨‍💻', bio: 'Former tech lead at major SaaS companies.' },
  { name: 'Sarah Chen', role: 'CTO & Co-founder', icon: '👩‍🔬', bio: 'Computer vision and ML expert.' },
  { name: 'Michael Rodriguez', role: 'Head of Design', icon: '👨‍🎨', bio: 'Award-winning UX designer.' },
  { name: 'Emily Watson', role: 'VP of Customer Success', icon: '👩‍💼', bio: 'Customer success veteran.' },
];

const values = [
  { icon: '🚀', title: 'Innovation First', desc: 'Pushing the boundaries of QR technology.' },
  { icon: '🎯', title: 'Customer Success', desc: 'Building with customer outcomes in mind.' },
  { icon: '🔒', title: 'Security & Privacy', desc: 'Enterprise-grade security measures.' },
  { icon: '🌍', title: 'Global Accessibility', desc: 'Reliable worldwide access.' },
  { icon: '⚡', title: 'Performance', desc: 'Lightning-fast response times.' },
  { icon: '🤝', title: 'Partnership', desc: 'Working together for success.' },
];

const stats = [
  { value: '10M+', label: 'QR Codes Generated' },
  { value: '50K+', label: 'Happy Customers' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '150+', label: 'Countries Served' },
];

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">About QRCore</h1>
            <p className="text-xl text-blue-100">
              We&apos;re on a mission to revolutionize how businesses create, customize, and track QR codes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p>
                Founded in 2024, QRCore emerged from a simple observation: despite QR codes being everywhere, most QR generation tools were outdated, limited, and lacking the advanced features modern businesses need.
              </p>
              <p>
                Our team of developers, designers, and business strategists came together with a shared vision: to create the most comprehensive, user-friendly, and powerful QR code platform ever built.
              </p>
              <p>
                Today, QRCore serves thousands of businesses worldwide, from startups to Fortune 500 companies, helping them create branded QR experiences that drive engagement and provide valuable insights.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="text-4xl font-bold text-blue-600 mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card hoverable className="h-full">
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.desc}</p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <StaggerItem key={member.name}>
                <motion.div whileHover={{ y: -8 }}>
                  <Card className="text-center h-full">
                    <CardContent className="p-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-4xl"
                      >
                        {member.icon}
                      </motion.div>
                      <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                      <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                      <p className="text-sm text-gray-600">{member.bio}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your QR Strategy?</h2>
            <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of businesses already using QRCore
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg">Start Free Trial</Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
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
