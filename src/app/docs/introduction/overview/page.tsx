'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Zap,
  Clock,
  Shield,
  Code2,
  Terminal,
  Webhook,
  Smartphone,
  Globe,
  Server,
  ChevronRight,
  Copy,
  Check,
  CreditCard,
  Plane,
} from 'lucide-react';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="p-1.5 rounded hover:bg-gray-700 transition-colors">
      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-gray-500" />}
    </button>
  );
}

const quickStartCode = `// 1. Configure JS Bridge in your native app
window.OnArrivalBridge = {
  eventLogin: () => nativeSDK.getCredentials(),
  eventPaymentGateway: (data) => nativeSDK.triggerPayment(data),
  eventDownload: (url) => nativeSDK.downloadFile(url),
};

// 2. Initialize session with JWT
const response = await fetch('https://devflights.onarriv.io/api/session', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer ' + jwt }
});

// 3. Handle booking events
window.OnArrival.on('BOOKING_CONFIRMED', (event) => {
  console.log('PNR:', event.pnr);
});`;

export default function OverviewPage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="relative rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700 p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
            <Terminal className="w-4 h-4" />
            Getting Started
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            OnArrival Platform Overview
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl">
            Integrate flight booking into your app with our hybrid PWA architecture.
            Pre-built UI, unified payments, and real-time webhooks — ship in weeks, not months.
          </p>
        </div>
      </div>

      {/* What you get */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-emerald-400" />
          What OnArrival Provides
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            {
              icon: Plane,
              title: 'Search & Booking UI',
              desc: 'Pre-built PWA with flight search, fare selection, and checkout flows',
              color: 'blue',
            },
            {
              icon: CreditCard,
              title: 'Payment Integration',
              desc: 'S2S payment init, native SDK triggers, and transaction webhooks',
              color: 'violet',
            },
            {
              icon: Shield,
              title: 'Authentication',
              desc: 'JWT-based sessions with profile sync via S2S API',
              color: 'emerald',
            },
            {
              icon: Webhook,
              title: 'Lifecycle Events',
              desc: 'Webhooks for booking, payment, and cancellation states',
              color: 'amber',
            },
          ].map((item) => {
            const colors = {
              blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
              emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
              amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
            };
            return (
              <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${colors[item.color as keyof typeof colors]}`}>
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-medium text-gray-100">{item.title}</div>
                  <div className="text-sm text-gray-400">{item.desc}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integration Model */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-400" />
          Integration Model
        </h2>

        <div className="rounded-xl bg-gray-900/50 border border-gray-800 p-6">
          <p className="text-gray-400 mb-6">
            OnArrival uses a hybrid PWA + native architecture. Your app loads our booking
            experience in a WebView while native bridges handle authentication, payments,
            and file downloads.
          </p>

          {/* Architecture diagram */}
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 mb-2">
                <Smartphone className="w-8 h-8 text-rose-400 mx-auto" />
              </div>
              <div className="font-medium text-gray-200">Your Native App</div>
              <div className="text-xs text-gray-500">JS Bridge + SDK</div>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-2">
                <Globe className="w-8 h-8 text-emerald-400 mx-auto" />
              </div>
              <div className="font-medium text-gray-200">OnArrival PWA</div>
              <div className="text-xs text-gray-500">Booking Experience</div>
            </div>
            <div className="text-center">
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-2">
                <Server className="w-8 h-8 text-amber-400 mx-auto" />
              </div>
              <div className="font-medium text-gray-200">Your Backend</div>
              <div className="text-xs text-gray-500">S2S APIs + Webhooks</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2 text-blue-400 font-medium mb-2">
                <Smartphone className="w-4 h-4" />
                Frontend Track
              </div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• WebView loads OnArrival PWA</li>
                <li>• JS Bridge handles native events</li>
                <li>• eventLogin(), eventPaymentGateway(), eventDownload()</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-gray-800/50">
              <div className="flex items-center gap-2 text-amber-400 font-medium mb-2">
                <Server className="w-4 h-4" />
                Backend Track
              </div>
              <ul className="space-y-1 text-sm text-gray-400">
                <li>• S2S API for payments & profile</li>
                <li>• Webhooks for booking lifecycle</li>
                <li>• JWT validation & session management</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-emerald-400" />
          Quick Start
        </h2>

        <div className="rounded-xl bg-gray-900 border border-gray-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-700" />
                <div className="w-3 h-3 rounded-full bg-gray-700" />
                <div className="w-3 h-3 rounded-full bg-gray-700" />
              </div>
              <span className="text-sm text-gray-500 font-mono">integration.js</span>
            </div>
            <CopyButton text={quickStartCode} />
          </div>
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            <code className="text-gray-300">{quickStartCode}</code>
          </pre>
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5 text-violet-400" />
          Integration Timeline
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          {[
            { week: 'Week 1-2', title: 'Setup & Auth', tasks: ['UAT credentials', 'JWT implementation', 'JS Bridge setup'] },
            { week: 'Week 2-3', title: 'Integration', tasks: ['Payment flow', 'Webhook handlers', 'Error handling'] },
            { week: 'Week 3-4', title: 'Testing & Launch', tasks: ['E2E testing', 'Production sign-off', 'Go live'] },
          ].map((phase) => (
            <div key={phase.week} className="p-5 rounded-xl bg-gray-900/50 border border-gray-800">
              <div className="text-emerald-400 text-sm font-mono mb-1">{phase.week}</div>
              <div className="font-semibold text-gray-100 mb-3">{phase.title}</div>
              <ul className="space-y-1.5">
                {phase.tasks.map((task) => (
                  <li key={task} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {task}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Environments */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Environments</h2>

        <div className="rounded-xl bg-gray-900/50 border border-gray-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-4 py-3 font-medium text-gray-400">Environment</th>
                <th className="text-left px-4 py-3 font-medium text-gray-400">Base URL</th>
                <th className="text-left px-4 py-3 font-medium text-gray-400">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800/50">
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-xs font-medium">UAT</span>
                </td>
                <td className="px-4 py-3 font-mono text-emerald-400">devflights.onarriv.io</td>
                <td className="px-4 py-3 text-gray-400">Development & testing</td>
              </tr>
              <tr>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-xs font-medium">PROD</span>
                </td>
                <td className="px-4 py-3 font-mono text-gray-500">After UAT sign-off</td>
                <td className="px-4 py-3 text-gray-400">Live traffic</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Next Steps</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { href: '/docs/get-started/high-level-architecture', title: 'High Level Overview', desc: 'Interactive architecture diagram', icon: Globe },
            { href: '/docs/integration-guide/pre-requisites', title: 'Pre-requisites', desc: 'Credentials & setup checklist', icon: Shield },
            { href: '/docs/integration-guide/authentication', title: 'Authentication', desc: 'JWT & session implementation', icon: Code2 },
            { href: '/docs/integration-guide/payment-integration', title: 'Payments', desc: 'Payment flow & refunds', icon: CreditCard },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 p-4 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
                <link.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-100 group-hover:text-white">{link.title}</div>
                <div className="text-sm text-gray-500">{link.desc}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
