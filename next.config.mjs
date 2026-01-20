import withMarkdoc from '@markdoc/next.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
};

export default withMarkdoc({ mode: 'static' })(nextConfig);
