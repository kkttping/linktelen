const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
      webpackConfig.externals = {
        BMap: "BMap",
      };

      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'https://cmsen.linktel.com/',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/api": ''
      //   }
      // },
      "/items": {
        target: "https://cmsen.linktel.com",
        changeOrigin: true,
      },
      "/assets": {
        target: "https://cmsen.linktel.com",
        changeOrigin: true,
      },
      "/files": {
        target: "https://cmsen.linktel.com",
        changeOrigin: true,
      },
    },
  },
};
