import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  api: {
    bodyParser: {
      sizeLimit: "50mb", // or larger if your video is big
    },
  },
};

export default nextConfig;
