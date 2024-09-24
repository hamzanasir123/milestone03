/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
       remotePatterns: [
        {
          protocol: "https",
          hostname: "manzeil.com"
        }
       ]
      },
};

export default nextConfig;
