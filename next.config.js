/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["fakeimg.pl", "cloudflare-ipfs.com"],
	},
};

module.exports = nextConfig;
