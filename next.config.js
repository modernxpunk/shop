/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		// serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"],
	},
	images: {
		domains: ["fakeimg.pl", "cloudflare-ipfs.com"],
	},
};

module.exports = nextConfig;
