const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "/",
  // indexPath: '../dist/index.html',
  outputDir: "build",
  productionSourceMap: true,
});
