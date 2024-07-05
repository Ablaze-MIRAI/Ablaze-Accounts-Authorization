/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
        port: "",
        pathname: "**"
      }
    ]
  },
  async rewrites () {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*"
      }
    ]
  }
};

export default nextConfig;
