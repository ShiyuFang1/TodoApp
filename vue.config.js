const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      "/api": {
        target: "https://xkcd.com/",
        changeOrigin: true,

        pathRewrite: { "^/api": "" },
      },
    },
  },
});
