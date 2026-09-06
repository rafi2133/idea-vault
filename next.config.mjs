/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: "",
        
      },
    ],
    dangerouslyAllowLocalIP: true,
  },
  
};

export default nextConfig;
