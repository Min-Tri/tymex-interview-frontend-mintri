import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placeholder.com','via.placeholder.com','i.pravatar.cc','placehold.co'],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
