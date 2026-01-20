import fs from 'fs';
import path from 'path';
import Markdoc from '@markdoc/markdoc';
import yaml from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'content/docs');

export interface DocFrontmatter {
  title: string;
  description?: string;
  category?: string;
  order?: number;
}

export interface DocContent {
  frontmatter: DocFrontmatter;
  content: string;
  slug: string[];
}

// Recursively get all markdown files
export function getAllDocSlugs(): string[][] {
  const slugs: string[][] = [];

  function walkDir(dir: string, baseSlug: string[] = []) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, [...baseSlug, file]);
      } else if (file.endsWith('.md') || file.endsWith('.mdoc')) {
        const name = file.replace(/\.(md|mdoc)$/, '');
        if (name === 'index') {
          slugs.push(baseSlug);
        } else {
          slugs.push([...baseSlug, name]);
        }
      }
    }
  }

  walkDir(CONTENT_DIR);
  return slugs;
}

// Get document by slug
export function getDocBySlug(slug: string[]): DocContent | null {
  const possiblePaths = [
    path.join(CONTENT_DIR, ...slug) + '.md',
    path.join(CONTENT_DIR, ...slug) + '.mdoc',
    path.join(CONTENT_DIR, ...slug, 'index.md'),
    path.join(CONTENT_DIR, ...slug, 'index.mdoc'),
  ];

  let filePath: string | null = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      filePath = p;
      break;
    }
  }

  if (!filePath) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content } = parseFrontmatter(fileContent);

  return {
    frontmatter,
    content,
    slug,
  };
}

// Parse frontmatter and content
function parseFrontmatter(fileContent: string): { frontmatter: DocFrontmatter; content: string } {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);

  if (match) {
    const frontmatter = yaml.load(match[1]) as DocFrontmatter;
    return {
      frontmatter: {
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description,
        category: frontmatter.category,
        order: frontmatter.order,
      },
      content: match[2],
    };
  }

  return {
    frontmatter: { title: 'Untitled' },
    content: fileContent,
  };
}

// Get all docs for navigation
export function getAllDocs(): DocContent[] {
  const slugs = getAllDocSlugs();
  const docs: DocContent[] = [];

  for (const slug of slugs) {
    const doc = getDocBySlug(slug);
    if (doc) {
      docs.push(doc);
    }
  }

  return docs.sort((a, b) => (a.frontmatter.order || 999) - (b.frontmatter.order || 999));
}

// Markdoc config
export const markdocConfig = {
  tags: {
    callout: {
      render: 'Callout',
      attributes: {
        type: { type: String, default: 'note' },
        title: { type: String },
      },
    },
    tabs: {
      render: 'Tabs',
      attributes: {
        labels: { type: Array },
      },
    },
    tab: {
      render: 'Tab',
      attributes: {
        label: { type: String, required: true },
      },
    },
    table: {
      render: 'Table',
      attributes: {},
    },
    'api-code': {
      render: 'ApiCodeBlock',
      attributes: {
        endpoint: { type: String },
        method: { type: String, default: 'GET' },
        title: { type: String },
        description: { type: String },
        response: { type: String },
      },
    },
    'integration-flow': {
      render: 'IntegrationFlowDiagram',
      selfClosing: true,
    },
    'sequence-diagram': {
      render: 'SequenceDiagram',
      attributes: {
        title: { type: String, required: true },
        participants: { type: Array },
        steps: { type: Array },
      },
    },
  },
  nodes: {
    fence: {
      render: 'CodeBlock',
      attributes: {
        language: { type: String },
        content: { type: String },
      },
    },
  },
};

// Parse Markdoc content
export function parseMarkdoc(content: string) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, markdocConfig);
  return transformed;
}
