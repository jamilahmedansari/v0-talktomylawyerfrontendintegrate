/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.css': {
          loaders: ['css-loader'],
          as: '*.css',
        },
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    // Disable LightningCSS in favor of standard PostCSS
    if (config.experiments) {
      config.experiments.css = false;
    }
    return config;
  },
}

export default nextConfig
