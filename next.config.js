/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	experimental: {
		appDir: true,
		serverActions: true,
	},
	images: {
		domains: ["fakeimg.pl"],
	},
};

module.exports = nextConfig;
