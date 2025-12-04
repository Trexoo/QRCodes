'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, X, Zap, Building2, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

const plans = [
  {
    name: 'Starter',
    icon: Zap,
    description: 'Perfect for personal use and small projects',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: '100 QR codes/month', included: true },
      { text: '7 QR code types', included: true },
      { text: 'Basic customization', included: true },
      { text: 'PNG downloads', included: true },
      { text: '30-day history', included: true },
      { text: 'Analytics', included: false },
      { text: 'API access', included: false },
      { text: 'Bulk generation', included: false },
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'secondary' as const,
    popular: false,
  },
  {
    name: 'Pro',
    icon: Rocket,
    description: 'Ideal for businesses and marketing teams',
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      { text: '5,000 QR codes/month', included: true },
      { text: 'All QR code types', included: true },
      { text: 'Advanced customization', included: true },
      { text: 'PNG, SVG, PDF downloads', included: true },
      { text: 'Unlimited history', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'API access (1,000 calls/month)', included: true },
      { text: 'Bulk generation (up to 100)', included: true },
      { text: 'Logo integration', included: true },
      { text: 'Priority support', included: true },
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'primary' as const,
    popular: true,
  },
  {
    name: 'Business',
    icon: Building2,
    description: 'For growing companies with advanced needs',
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      { text: '25,000 QR codes/month', included: true },
      { text: 'All QR code types', included: true },
      { text: 'Full customization suite', included: true },
      { text: 'All export formats', included: true },
      { text: 'Unlimited history', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'API access (10,000 calls/month)', included: true },
      { text: 'Bulk generation (up to 1,000)', included: true },
      { text: 'Team collaboration (5 users)', included: true },
      { text: 'Custom branding', included: true },
      { text: 'Webhook integrations', included: true },
      { text: 'Priority support', included: true },
    ],
    buttonText: 'Start Business Trial',
    buttonVariant: 'secondary' as const,
    popular: false,
  },
];

const faqs = [
  {
    question: 'Can I change plans at any time?',
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll pro-rate your billing accordingly.",
  },
  {
    question: 'What happens if I exceed my plan limits?',
    answer: "You'll receive notifications as you approach your limits. For QR generation, you can upgrade your plan or purchase additional credits. API calls will be temporarily restricted until the next billing cycle.",
  },
  {
    question: 'Do you offer refunds?',
    answer: "Yes, we offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! All paid plans come with a 14-day free trial. No credit card required to start.',
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
              Choose the perfect plan for your QR code needs. Upgrade or downgrade at any time.
            </p>
          </FadeIn>

          {/* Billing Toggle */}
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-2 p-1 bg-white/20 rounded-full backdrop-blur-sm">
              <button
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isYearly
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                  isYearly
                    ? 'bg-white text-blue-600'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Yearly
                <span className="text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">
                  Save 20%
                </span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gray-50 -mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <StaggerItem key={plan.name}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Card
                    className={`relative h-full ${
                      plan.popular
                        ? 'border-2 border-blue-600 shadow-xl'
                        : 'border border-gray-200'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-full">
                        ⭐ Most Popular
                      </div>
                    )}
                    <CardHeader className="text-center pt-8">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center"
                      >
                        <plan.icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 mt-2">{plan.description}</p>
                      <div className="mt-6">
                        <span className="text-5xl font-bold text-blue-600">
                          ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                        </span>
                        {(isYearly ? plan.yearlyPrice : plan.monthlyPrice) > 0 && (
                          <span className="text-gray-600">/month</span>
                        )}
                        {isYearly && plan.yearlyPrice > 0 && (
                          <p className="text-sm text-gray-500 mt-1">
                            billed yearly
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li
                            key={feature.text}
                            className={`flex items-center gap-3 ${
                              feature.included
                                ? 'text-gray-700'
                                : 'text-gray-400'
                            }`}
                          >
                            {feature.included ? (
                              <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <X className="w-5 h-5 text-gray-300 flex-shrink-0" />
                            )}
                            {feature.text}
                          </li>
                        ))}
                      </ul>
                      <Link href="/signup">
                        <Button
                          variant={plan.buttonVariant}
                          className="w-full"
                          size="lg"
                        >
                          {plan.buttonText}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl font-bold mb-4">Enterprise</h2>
                <p className="text-gray-300 max-w-xl mx-auto mb-8">
                  Custom solutions for large organizations with specific requirements
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                  {[
                    { icon: '🏢', title: 'Unlimited Everything' },
                    { icon: '🔒', title: 'Enterprise Security' },
                    { icon: '🛠️', title: 'Custom Integration' },
                    { icon: '📞', title: 'Dedicated Support' },
                  ].map((item) => (
                    <div key={item.title} className="text-center">
                      <div className="text-3xl mb-2">{item.icon}</div>
                      <div className="text-sm font-medium">{item.title}</div>
                    </div>
                  ))}
                </div>
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100"
                >
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Frequently Asked Questions
            </h2>
          </FadeIn>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FadeIn key={faq.question} delay={index * 0.1}>
                <Card>
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full p-6 text-left flex justify-between items-center"
                  >
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openFAQ === index ? 45 : 0 }}
                      className="text-gray-400 text-2xl"
                    >
                      +
                    </motion.span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFAQ === index ? 'auto' : 0,
                      opacity: openFAQ === index ? 1 : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-600">{faq.answer}</div>
                  </motion.div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
