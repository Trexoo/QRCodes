'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  BarChart3,
  Settings,
  Key,
  Trash2,
  Download,
  ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations';

interface QRCodeItem {
  id: string;
  type: string;
  data: string;
  name?: string;
  imageUrl: string;
  timestamp: string;
}

const tabs = [
  { id: 'recent', label: 'Recent QR Codes', icon: '📱' },
  { id: 'analytics', label: 'Analytics', icon: '📊' },
  { id: 'bulk', label: 'Bulk Operations', icon: '⚡' },
  { id: 'api', label: 'API Keys', icon: '🔑' },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('recent');
  const [qrHistory, setQrHistory] = useState<QRCodeItem[]>([]);
  const [stats, setStats] = useState({
    totalQRs: 0,
    thisMonthQRs: 0,
    totalScans: 0,
    avgScans: 0,
  });

  useEffect(() => {
    // Load QR history from localStorage (demo purposes)
    const loadData = () => {
      const savedHistory = localStorage.getItem('qrHistory');
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        setQrHistory(history);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const thisMonthQRs = history.filter((qr: QRCodeItem) => {
          const qrDate = new Date(qr.timestamp);
          return qrDate.getMonth() === currentMonth && qrDate.getFullYear() === currentYear;
        }).length;

        const totalScans = history.length * Math.floor(Math.random() * 50) + Math.floor(Math.random() * 100);
        
        setStats({
          totalQRs: history.length,
          thisMonthQRs,
          totalScans,
          avgScans: history.length > 0 ? Math.floor(totalScans / history.length) : 0,
        });
      }
    };
    
    // Use requestAnimationFrame to avoid synchronous setState in effect
    const frame = requestAnimationFrame(loadData);
    return () => cancelAnimationFrame(frame);
  }, []);

  const deleteQR = (id: string) => {
    const updatedHistory = qrHistory.filter((qr) => qr.id !== id);
    setQrHistory(updatedHistory);
    localStorage.setItem('qrHistory', JSON.stringify(updatedHistory));
    setStats((prev) => ({ ...prev, totalQRs: updatedHistory.length }));
  };

  const downloadQR = (qr: QRCodeItem) => {
    const link = document.createElement('a');
    link.href = qr.imageUrl;
    link.download = `qrcode-${qr.type}-${qr.id}.png`;
    link.click();
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeIn>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Manage your QR codes, track performance, and view analytics
            </p>
          </div>
        </FadeIn>

        {/* Stats Grid */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total QR Codes', value: stats.totalQRs, icon: '📱', color: 'blue' },
            { label: 'This Month', value: stats.thisMonthQRs, icon: '📅', color: 'green' },
            { label: 'Total Scans', value: stats.totalScans.toLocaleString(), icon: '📊', color: 'purple' },
            { label: 'Avg. Scans/QR', value: stats.avgScans, icon: '📈', color: 'orange' },
          ].map((stat) => (
            <StaggerItem key={stat.label}>
              <Card hoverable>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{stat.icon}</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Tabs */}
        <FadeIn delay={0.2}>
          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto pb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'recent' && (
            <motion.div
              key="recent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Your QR Codes</h2>
                <Link href="/">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create New
                  </Button>
                </Link>
              </div>

              {qrHistory.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <div className="text-6xl mb-4">📱</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No QR Codes Yet
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Create your first QR code to get started!
                    </p>
                    <Link href="/">
                      <Button>Create QR Code</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {qrHistory.map((qr, index) => (
                    <motion.div
                      key={qr.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card hoverable className="overflow-hidden">
                        <div className="bg-gray-100 p-6 flex items-center justify-center">
                          {qr.imageUrl && (
                            <Image
                              src={qr.imageUrl}
                              alt="QR Code"
                              width={150}
                              height={150}
                              className="object-contain"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                              {qr.type.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {qr.name || `${qr.type} QR Code`}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3">
                            {truncateText(qr.data, 40)}
                          </p>
                          <p className="text-xs text-gray-400 mb-4">
                            Created: {new Date(qr.timestamp).toLocaleDateString()}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => downloadQR(qr)}
                            >
                              <Download className="w-3 h-3 mr-1" />
                              Download
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteQR(qr.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-6xl mb-4">📊</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Advanced Analytics Coming Soon
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Track QR code scans, user locations, device types, and more with our
                    upcoming analytics dashboard.
                  </p>
                  <div className="flex justify-center gap-8 mt-8">
                    <div className="text-center">
                      <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="font-medium">Scan Analytics</div>
                      <div className="text-sm text-gray-500">Real-time tracking</div>
                    </div>
                    <div className="text-center">
                      <Settings className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="font-medium">Device Insights</div>
                      <div className="text-sm text-gray-500">Mobile vs desktop</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'bulk' && (
            <motion.div
              key="bulk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Bulk QR Code Generation
                  </h3>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-6">
                    Upload a CSV file to generate multiple QR codes at once. Perfect for
                    events, inventory, or marketing campaigns.
                  </p>
                  <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                    <div className="text-4xl mb-4">📄</div>
                    <p className="text-gray-600 mb-4">
                      Drag and drop your CSV file here, or click to browse
                    </p>
                    <Button variant="secondary">Choose File</Button>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">CSV Format Example:</h4>
                    <pre className="text-sm text-gray-600 font-mono">
                      type,data,name{'\n'}
                      url,https://example.com,Website QR{'\n'}
                      text,Hello World,Greeting QR
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === 'api' && (
            <motion.div
              key="api"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">API Access</h2>
                <Link href="/api-keys">
                  <Button>
                    <Key className="w-4 h-4 mr-2" />
                    Manage API Keys
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-2">🔑</div>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                    <div className="text-gray-600">Active API Keys</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-2">📊</div>
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-gray-600">API Calls This Month</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-2">📈</div>
                    <div className="text-2xl font-bold text-blue-600">1,000</div>
                    <div className="text-gray-600">Monthly Limit</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-gray-900">Quick Start</h3>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600 mb-4">
                    Generate a QR code using the API:
                  </p>
                  <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
                    <pre>{`curl -X POST "https://api.qrcore.com/v1/generate" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "https://example.com"}'`}</pre>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <Link href="/api-keys">
                      <Button>Create API Key</Button>
                    </Link>
                    <Link href="/docs">
                      <Button variant="secondary">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Documentation
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
