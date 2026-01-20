'use client';

import { cn } from '@/lib/utils';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="my-6 overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className={cn('w-full text-sm', className)}>
        {children}
      </table>
    </div>
  );
}
