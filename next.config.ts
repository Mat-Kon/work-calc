import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles/abstract')],
    additionalData: `@use "variables" as vars; @use "mixins" as mix;`,
  },
};

export default nextConfig;
