require("dotenv").config();

module.exports = {
    reactStrictMode: true,
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
            config.resolve.fallback = {
                fs: false
            }
        }

        return config;
    },
    env: {
        dbUrl: process.env.dburl,
        contractAddress: process.env.contractAddress,
        rpcAddress: process.env.rpcAddress
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};