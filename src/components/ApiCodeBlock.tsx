'use client';

import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { cn } from '@/lib/utils';
import { Copy, Check, Play, Loader2 } from 'lucide-react';

interface CodeSample {
  language: string;
  label: string;
  code: string;
}

interface ApiCodeBlockProps {
  endpoint?: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  samples: CodeSample[];
  response?: string;
  title?: string;
  description?: string;
}

const languageIcons: Record<string, string> = {
  curl: '🌐',
  javascript: '🟨',
  typescript: '🔷',
  python: '🐍',
  java: '☕',
  kotlin: '🟣',
  swift: '🍎',
  dart: '🎯',
  go: '🔵',
  ruby: '💎',
  php: '🐘',
  csharp: '🟢',
};

export function ApiCodeBlock({
  endpoint,
  method = 'GET',
  samples,
  response,
  title,
  description,
}: ApiCodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(samples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const simulateRequest = async () => {
    setIsSimulating(true);
    setSimulatedResponse(null);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));

    setSimulatedResponse(response || '{"success": true, "message": "Request simulated successfully"}');
    setIsSimulating(false);
  };

  const methodColors: Record<string, string> = {
    GET: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    POST: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    PUT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    DELETE: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
    PATCH: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  };

  return (
    <div className="my-8 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      {/* Header with endpoint */}
      {(endpoint || title) && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          {title && (
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {title}
            </h4>
          )}
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {description}
            </p>
          )}
          {endpoint && (
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className={cn(
                'px-2 py-0.5 rounded-md text-xs font-bold border',
                methodColors[method]
              )}>
                {method}
              </span>
              <code className="text-gray-700 dark:text-gray-300">{endpoint}</code>
            </div>
          )}
        </div>
      )}

      {/* Language tabs */}
      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 overflow-x-auto">
        {samples.map((sample, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
              activeTab === idx
                ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm border border-gray-200 dark:border-gray-700'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
            )}
          >
            <span className="text-base">{languageIcons[sample.language] || '📄'}</span>
            {sample.label}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="relative">
        <Highlight
          theme={themes.nightOwl}
          code={samples[activeTab].code.trim()}
          language={samples[activeTab].language === 'curl' ? 'bash' : samples[activeTab].language}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(className, 'p-4 overflow-x-auto text-sm !bg-[#011627]')}
              style={style}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="inline-block w-8 text-gray-500 select-none text-right mr-4">
                    {i + 1}
                  </span>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          {response && (
            <button
              onClick={simulateRequest}
              disabled={isSimulating}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 hover:text-emerald-200 transition-colors disabled:opacity-50"
            >
              {isSimulating ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              Try it
            </button>
          )}
        </div>
      </div>

      {/* Response section */}
      {(response || simulatedResponse) && (
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Response
            </span>
          </div>
          <Highlight
            theme={themes.nightOwl}
            code={(simulatedResponse || response || '').trim()}
            language="json"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre
                className={cn(className, 'p-4 overflow-x-auto text-sm !bg-[#011627]')}
                style={style}
              >
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      )}
    </div>
  );
}

// Helper component for inline endpoint badges
export function Endpoint({ method, path }: { method: string; path: string }) {
  const methodColors: Record<string, string> = {
    GET: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    POST: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    PUT: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    DELETE: 'bg-red-500/10 text-red-600 dark:text-red-400',
    PATCH: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  };

  return (
    <span className="inline-flex items-center gap-2 font-mono text-sm">
      <span className={cn('px-1.5 py-0.5 rounded text-xs font-bold', methodColors[method])}>
        {method}
      </span>
      <code className="text-gray-700 dark:text-gray-300">{path}</code>
    </span>
  );
}
