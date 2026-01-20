'use client';

import { Info, Lightbulb, AlertTriangle, XCircle, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const icons = {
  note: Info,
  info: Info,
  tip: Lightbulb,
  warning: AlertTriangle,
  danger: XCircle,
  important: Zap,
};

const styles = {
  note: 'bg-blue-500/5 border-blue-500/20',
  info: 'bg-cyan-500/5 border-cyan-500/20',
  tip: 'bg-emerald-500/5 border-emerald-500/20',
  warning: 'bg-amber-500/5 border-amber-500/20',
  danger: 'bg-red-500/5 border-red-500/20',
  important: 'bg-violet-500/5 border-violet-500/20',
};

const iconStyles = {
  note: 'text-blue-400',
  info: 'text-cyan-400',
  tip: 'text-emerald-400',
  warning: 'text-amber-400',
  danger: 'text-red-400',
  important: 'text-violet-400',
};

const titleStyles = {
  note: 'text-blue-400',
  info: 'text-cyan-400',
  tip: 'text-emerald-400',
  warning: 'text-amber-400',
  danger: 'text-red-400',
  important: 'text-violet-400',
};

interface CalloutProps {
  type?: 'note' | 'info' | 'tip' | 'warning' | 'danger' | 'important';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'note', title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div className={cn('my-6 rounded-xl border p-4', styles[type])}>
      <div className="flex items-start gap-3">
        <Icon className={cn('h-5 w-5 mt-0.5 flex-shrink-0', iconStyles[type])} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className={cn('font-semibold mb-1', titleStyles[type])}>{title}</p>
          )}
          <div className="text-gray-300 text-sm leading-relaxed [&>p]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
