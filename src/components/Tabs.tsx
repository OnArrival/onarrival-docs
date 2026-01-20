'use client';

import React, { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

const TabsContext = createContext<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}>({
  activeTab: '',
  setActiveTab: () => {},
});

interface TabsProps {
  labels?: string[];
  children: React.ReactNode;
}

export function Tabs({ labels = [], children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(labels[0] || '');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="my-6 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {labels.map((label) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={cn(
                'px-4 py-2.5 text-sm font-medium transition-colors',
                activeTab === label
                  ? 'text-blue-600 bg-white dark:bg-gray-900 border-b-2 border-blue-600 -mb-px'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="p-4 bg-white dark:bg-gray-900">{children}</div>
      </div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export function Tab({ label, children }: TabProps) {
  const { activeTab } = useContext(TabsContext);

  if (activeTab !== label) return null;

  return <div>{children}</div>;
}
