import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const pagesRepository =
  process.env.GITHUB_REPOSITORY?.split('/')[1] || 'ISE-Domain-JJK-Alt';
const pagesBasePath = `/${pagesRepository}`;

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix: pagesBasePath,
      env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath },
    }
  : { env: { NEXT_PUBLIC_BASE_PATH: '' } };

export default nextConfig;
