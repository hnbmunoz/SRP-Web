require("dotenv").config();

module.exports = {
    apps: [
        {
            name: `base-layout-web-${process.env.NODE_ENV}`,
            script: "serve",
            env: {
                PM2_SERVE_PATH: "./build",
                PM2_SERVE_PORT: process.env.PM2_SERVE_PORT || 3004,
                PM2_SERVE_SPA: "true",
                NODE_ENV: process.env.NODE_ENV || "production",
            },
            watch: false,
            error_file: "logs/err.log",
            out_file: "logs/out.log",
            log_file: "logs/combined.log",
            time: true,
        },
    ],
};