import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocSlugs, parseMarkdoc } from '@/lib/content';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { Callout } from '@/components/Callout';
import { CodeBlock } from '@/components/CodeBlock';
import { Tabs, Tab } from '@/components/Tabs';
import { Table } from '@/components/Table';
import { ApiCodeBlock } from '@/components/ApiCodeBlock';
import { SequenceDiagram, IntegrationFlowDiagram } from '@/components/SequenceDiagram';
import { HighLevelOverview } from '@/components/HighLevelOverview';

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const components = {
  Callout,
  CodeBlock,
  Tabs,
  Tab,
  Table,
  ApiCodeBlock,
  SequenceDiagram,
  IntegrationFlowDiagram,
  HighLevelOverview,
};

// Custom pages that use dedicated React components instead of markdown
const customPages: Record<string, React.ComponentType> = {
  'introduction/high-level-overview': HighLevelOverview,
};

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    return { title: 'Not Found' };
  }

  return {
    title: `${doc.frontmatter.title} | OnArrival Docs`,
    description: doc.frontmatter.description,
  };
}

export default async function DocPage({ params }: PageProps) {
  const resolvedParams = await params;
  const doc = getDocBySlug(resolvedParams.slug);

  if (!doc) {
    notFound();
  }

  // Check if this page has a custom component
  const slugPath = resolvedParams.slug.join('/');
  const CustomComponent = customPages[slugPath];

  if (CustomComponent) {
    return <CustomComponent />;
  }

  const content = parseMarkdoc(doc.content);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          {doc.frontmatter.title}
        </h1>
        {doc.frontmatter.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {doc.frontmatter.description}
          </p>
        )}
      </div>
      <article className="prose prose-gray dark:prose-invert max-w-none prose-headings:scroll-mt-20 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:before:content-none prose-code:after:content-none prose-pre:bg-transparent prose-pre:p-0 prose-table:overflow-x-auto">
        {Markdoc.renderers.react(content, React, { components })}
      </article>
    </div>
  );
}
