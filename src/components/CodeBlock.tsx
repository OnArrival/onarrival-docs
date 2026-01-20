'use client';

import React, { useState } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ children, language = '', title, showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = typeof children === 'string' ? children.trim() : '';

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Language display names
  const languageLabels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    js: 'JavaScript',
    ts: 'TypeScript',
    jsx: 'JSX',
    tsx: 'TSX',
    python: 'Python',
    bash: 'Bash',
    shell: 'Shell',
    json: 'JSON',
    yaml: 'YAML',
    kotlin: 'Kotlin',
    swift: 'Swift',
    dart: 'Dart',
    go: 'Go',
    rust: 'Rust',
    java: 'Java',
    curl: 'cURL',
    http: 'HTTP',
  };

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-gray-800 bg-gray-900/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-gray-700" />
          </div>
          {(title || language) && (
            <span className="text-xs font-mono text-gray-500">
              {title || languageLabels[language.toLowerCase()] || language}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs text-gray-400 hover:text-gray-200 hover:bg-gray-800 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="relative">
        <Highlight theme={themes.nightOwl} code={code} language={language || 'text'}>
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className={cn(className, 'p-4 overflow-x-auto text-sm leading-relaxed')}
              style={{ ...style, margin: 0, background: 'transparent' }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })} className="table-row">
                  {showLineNumbers && (
                    <span className="table-cell text-gray-600 select-none text-right pr-4 w-8 text-xs">
                      {i + 1}
                    </span>
                  )}
                  <span className="table-cell">
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  );
}
