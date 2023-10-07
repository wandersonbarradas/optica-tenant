/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: "/([^/]+)/mais/([^/]+?)$",
                headers: [
                    {
                        key: "Cache-Control",
                        value: "no-store, no-cache, must-revalidate",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
