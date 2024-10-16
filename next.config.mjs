/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["*.mirairo.dev", "*.ablaze.one"]
    }
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prettyavatars.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "**"
      }
    ]
  },
  env: {
    TZ: "UTC"
  }
};

export default nextConfig;
