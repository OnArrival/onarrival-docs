'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Terminal,
  Zap,
  Shield,
  CreditCard,
  Webhook,
  Copy,
  Check,
  ChevronRight,
  Globe,
  Smartphone,
  Server,
  Code2,
} from 'lucide-react';

const codeExample = `// Initialize OnArrival session
const session = await fetch('/api/onarrival/session', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${jwt}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    userId: user.id,
    context: { source: 'mobile-app' }
  })
});

// Handle booking events via JS Bridge
window.OnArrival.on('booking:confirmed', (event) => {
  console.log('PNR:', event.data.pnr);
  console.log('Status:', event.data.status);
});`;

const quickstartSteps = [
  {
    step: '01',
    title: 'Get API credentials',
    desc: 'Request UAT access and receive your JWT signing keys and S2S API credentials.',
    code: 'x-api-key: sk_uat_xxxxx',
  },
  {
    step: '02',
    title: 'Implement JS Bridge',
    desc: 'Add the OnArrival bridge to handle native events between your app and our PWA.',
    code: 'window.OnArrival.init({ env: "uat" })',
  },
  {
    step: '03',
    title: 'Handle webhooks',
    desc: 'Set up server endpoints to receive booking lifecycle events and payment updates.',
    code: 'POST /webhooks/onarrival',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Launch in 30 days',
    description: 'Pre-built UI components and streamlined integration reduce time-to-market from months to weeks.',
    color: 'emerald',
  },
  {
    icon: Shield,
    title: 'Secure by default',
    description: 'JWT-based authentication, encrypted S2S communication, and PCI-compliant payment handling.',
    color: 'blue',
  },
  {
    icon: CreditCard,
    title: 'Unified payments',
    description: 'Trigger native payment SDKs, handle refunds, and track transaction states via webhooks.',
    color: 'violet',
  },
  {
    icon: Webhook,
    title: 'Real-time events',
    description: 'Comprehensive webhook coverage for booking lifecycle, payment status, and inventory updates.',
    color: 'amber',
  },
];

const sdkCards = [
  { icon: Smartphone, title: 'Flutter', href: '/docs/samples/flutter', color: 'cyan' },
  { icon: Smartphone, title: 'React Native', href: '/docs/samples/react-native', color: 'blue' },
  { icon: Code2, title: 'Android/Swift', href: '/docs/samples/android-swift', color: 'emerald' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400" />
      )}
    </button>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-gray-800/50 bg-gray-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-gray-900 font-bold text-sm">OA</span>
              </div>
              <span className="font-semibold text-lg tracking-tight">OnArrival</span>
              <span className="text-gray-500 font-light">|</span>
              <span className="text-gray-400 text-sm">Docs</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/docs/introduction/overview"
                className="text-sm text-gray-400 hover:text-gray-100 transition-colors"
              >
                Documentation
              </Link>
              <Link
                href="/docs/integration/api-reference"
                className="text-sm text-gray-400 hover:text-gray-100 transition-colors"
              >
                API Reference
              </Link>
              <Link
                href="/admin"
                className="text-sm px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgb(55 65 81) 1px, transparent 0)`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
              <Terminal className="w-4 h-4" />
              Developer Documentation
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Build travel experiences
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                without the complexity
              </span>
            </h1>

            <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-2xl">
              OnArrival provides the APIs and components to embed flight booking
              into your app. Ship faster with pre-built UI, unified payments,
              and real-time webhooks.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/docs/introduction/overview"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all hover:-translate-y-0.5"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/docs/integration/api-reference"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-100 font-medium transition-colors"
              >
                API Reference
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="relative py-20 border-y border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Simple, powerful APIs
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                Integrate with a few lines of code. Our JS Bridge handles the
                complexity of native-PWA communication while you focus on your
                product.
              </p>

              <div className="space-y-4">
                {[
                  { label: 'JWT Authentication', desc: 'Secure session management' },
                  { label: 'JS Bridge Events', desc: 'Native app integration' },
                  { label: 'S2S Webhooks', desc: 'Real-time notifications' },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-100">{item.label}</div>
                      <div className="text-sm text-gray-500">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code block */}
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-xl" />
              <div className="relative rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-700" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-mono">integration.js</span>
                    <CopyButton text={codeExample} />
                  </div>
                </div>
                <pre className="p-4 text-sm font-mono overflow-x-auto">
                  <code className="text-gray-300">{codeExample}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Quick start guide</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Get from zero to production in three steps. Our modular architecture
              lets you integrate incrementally.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickstartSteps.map((item) => (
              <div
                key={item.step}
                className="group relative p-6 rounded-2xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all hover:-translate-y-1"
              >
                <div className="text-5xl font-bold text-gray-800 mb-4 group-hover:text-gray-700 transition-colors">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-100">
                  {item.title}
                </h3>
                <p className="text-gray-400 mb-4">{item.desc}</p>
                <code className="inline-block px-3 py-1.5 rounded-lg bg-gray-800 text-sm font-mono text-emerald-400">
                  {item.code}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Built for developers</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to ship travel features without building an OTA from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const colorClasses = {
                emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
                amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              };
              return (
                <div
                  key={feature.title}
                  className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800 hover:border-gray-700 transition-all"
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${colorClasses[feature.color as keyof typeof colorClasses]}`}
                  >
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Architecture diagram */}
            <div className="relative p-8 rounded-2xl bg-gray-900/50 border border-gray-800">
              <div className="grid grid-cols-3 gap-4 text-center">
                {/* Your App */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20">
                    <Smartphone className="w-8 h-8 text-rose-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-rose-400">Your App</div>
                  </div>
                  <div className="text-xs text-gray-500">Native SDK</div>
                </div>

                {/* OnArrival */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <Globe className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-emerald-400">OnArrival</div>
                  </div>
                  <div className="text-xs text-gray-500">PWA + APIs</div>
                </div>

                {/* Your Backend */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <Server className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                    <div className="text-sm font-medium text-amber-400">Your Backend</div>
                  </div>
                  <div className="text-xs text-gray-500">S2S + Webhooks</div>
                </div>
              </div>

              {/* Connection lines */}
              <div className="absolute top-1/2 left-[33%] w-[34%] h-px bg-gradient-to-r from-rose-500/50 via-emerald-500/50 to-emerald-500/50" />
              <div className="absolute top-1/2 right-[33%] w-[34%] h-px bg-gradient-to-r from-emerald-500/50 via-amber-500/50 to-amber-500/50" />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-4">
                Hybrid PWA architecture
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Your native app embeds our PWA for the booking experience.
                The JS Bridge handles authentication, payments, and events
                while your backend receives webhooks for booking lifecycle.
              </p>
              <Link
                href="/docs/introduction/high-level-overview"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                View integration architecture
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SDK Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sample implementations</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Reference implementations for popular mobile frameworks to accelerate your integration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {sdkCards.map((sdk) => (
              <Link
                key={sdk.title}
                href={sdk.href}
                className="group flex items-center gap-4 p-5 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${sdk.color}-500/10 border border-${sdk.color}-500/20`}>
                  <sdk.icon className={`w-6 h-6 text-${sdk.color}-400`} />
                </div>
                <div>
                  <div className="font-semibold text-gray-100 group-hover:text-white">
                    {sdk.title}
                  </div>
                  <div className="text-sm text-gray-500">Sample code</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600 ml-auto group-hover:text-gray-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-12 overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

            <div className="relative text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Ready to integrate?</h2>
              <p className="text-gray-400 text-lg mb-8">
                Start with our UAT environment and go live in weeks, not months.
                Our team is here to support your integration every step of the way.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/docs/integration/pre-requisites"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-gray-900 font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  View Pre-requisites
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/docs/support/faqs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium transition-colors"
                >
                  FAQs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                <span className="text-gray-900 font-bold text-xs">OA</span>
              </div>
              <span className="text-gray-400">OnArrival Documentation</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/docs/introduction/overview" className="hover:text-gray-300 transition-colors">
                Docs
              </Link>
              <Link href="/docs/integration/api-reference" className="hover:text-gray-300 transition-colors">
                API
              </Link>
              <Link href="/docs/support/faqs" className="hover:text-gray-300 transition-colors">
                Support
              </Link>
              <span className="text-gray-700">|</span>
              <span>&copy; {new Date().getFullYear()} OnArrival</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
