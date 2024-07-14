/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
        port: "",
        pathname: "**",
      }
    ]
  },
  env: {
    TZ: "UTC"
  },
  //output: "standalone"
};

export default nextConfig;
