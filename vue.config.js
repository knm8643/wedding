const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  outputDir: "build",
  // indexPath: '../dist/index.html',
  productionSourceMap: true,
  assetsDir: 'src/assets',
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/variables.scss";
        `
      }
    }
  },
  // 배포시 주석해주세요
  configureWebpack: {
    devtool: 'source-map',
  }
});
