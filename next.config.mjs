/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ["ts", "tsx", "mdx"],
	output: "standalone",
	experimental: {
		typedRoutes: true,
	},
};

export default nextConfig;
