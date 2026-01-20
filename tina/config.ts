import { defineConfig, LocalAuthProvider } from 'tinacms';

// Local mode for development - no cloud needed
const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === 'true';

export default defineConfig({
  contentApiUrlOverride: '/api/tina/gql',
  authProvider: isLocal ? new LocalAuthProvider() : undefined,
  branch: process.env.TINA_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main',
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'images',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'docs',
        label: 'Documentation',
        path: 'content/docs',
        format: 'md',
        ui: {
          filename: {
            readonly: false,
            slugify: (values) => {
              return values?.title
                ?.toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^a-z0-9-]/g, '') || '';
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: [
              { label: 'Introduction', value: 'introduction' },
              { label: 'Integration', value: 'integration' },
              { label: 'Samples', value: 'samples' },
              { label: 'Support', value: 'support' },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Display Order',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Content',
            isBody: true,
            templates: [
              {
                name: 'callout',
                label: 'Callout',
                fields: [
                  {
                    type: 'string',
                    name: 'type',
                    label: 'Type',
                    options: ['note', 'tip', 'warning', 'danger', 'info'],
                  },
                  {
                    type: 'string',
                    name: 'title',
                    label: 'Title',
                  },
                  {
                    type: 'rich-text',
                    name: 'children',
                    label: 'Content',
                  },
                ],
              },
              {
                name: 'codeBlock',
                label: 'Code Block',
                fields: [
                  {
                    type: 'string',
                    name: 'language',
                    label: 'Language',
                    options: [
                      'javascript',
                      'typescript',
                      'python',
                      'json',
                      'bash',
                      'kotlin',
                      'swift',
                      'dart',
                      'yaml',
                    ],
                  },
                  {
                    type: 'string',
                    name: 'code',
                    label: 'Code',
                    ui: {
                      component: 'textarea',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
