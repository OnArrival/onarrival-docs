# OnArrival Documentation Site

Developer documentation for the OnArrival flight booking integration platform.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Content:** Markdoc + Markdown
- **CMS:** TinaCMS (local mode)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/OnArrival/onarrival-docs.git
cd onarrival-docs

# Install dependencies
npm install
```

### Development

**Option 1: Site only**

```bash
npm run dev
```

**Option 2: Site + CMS (recommended)**

```bash
npm run dev:tina
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### CMS Admin

When running with `npm run dev:tina`, access the CMS at:

```
http://localhost:3000/admin/index.html
```

The CMS allows visual editing of all documentation content.

## Project Structure

```
├── content/docs/          # Markdown documentation files
│   ├── introduction/      # Getting started guides
│   ├── integration/       # Integration guides (auth, payments, etc.)
│   ├── samples/           # Code samples (Flutter, React Native, etc.)
│   └── support/           # FAQs and support docs
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── admin/         # TinaCMS admin interface
│   │   ├── api/           # API routes (TinaCMS GraphQL)
│   │   └── docs/          # Documentation pages
│   ├── components/        # React components
│   │   ├── DocsLayout.tsx # Main documentation layout
│   │   ├── CodeBlock.tsx  # Syntax-highlighted code blocks
│   │   ├── Callout.tsx    # Info/warning callouts
│   │   └── ...
│   ├── lib/               # Utilities
│   └── markdoc/           # Markdoc configuration
├── tina/                  # TinaCMS configuration
│   └── config.ts          # Content schema
└── public/                # Static assets
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run dev:tina` | Start dev server with TinaCMS |
| `npm run build` | Build for production |
| `npm run build:tina` | Build with TinaCMS |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Adding Documentation

### Using the CMS

1. Run `npm run dev:tina`
2. Open http://localhost:3000/admin/index.html
3. Navigate to Documentation
4. Create or edit pages visually

### Manually

1. Create a `.md` file in `content/docs/[category]/`
2. Add frontmatter:

```yaml
---
title: "Page Title"
description: "Brief description"
category: "integration"
order: 1
---
```

3. Write content in Markdown

### Custom Components

Use these Markdoc tags in your markdown:

**Callout:**
```markdown
{% callout type="tip" title="Pro Tip" %}
Your tip content here.
{% /callout %}
```

Types: `note`, `tip`, `warning`, `danger`, `info`

**Code Block:**
````markdown
```javascript
const example = "code";
```
````

## Features

- **Search** — Press `Cmd+K` (or `Ctrl+K`) to search
- **Dark theme** — Optimized for developer readability
- **Table of Contents** — Auto-generated from headings
- **Previous/Next** — Navigation between pages
- **Mobile responsive** — Works on all devices
- **Copy code** — One-click code copying

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Static Export

```bash
npm run build
# Output in .next/ directory
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Environment Variables

For TinaCMS cloud mode (optional):

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=your-client-id
TINA_TOKEN=your-token
TINA_BRANCH=main
```

Local mode requires no environment variables.

## Contributing

1. Create a feature branch
2. Make changes
3. Run `npm run lint` to check for issues
4. Submit a pull request

## License

Proprietary - OnArrival
