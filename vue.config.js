const webpack = require('webpack');
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
    // devtool: 'source-map',
    resolve: {
      alias: {
        '@vue/compiler-sfc': require.resolve('@vue/compiler-sfc'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false', // 해당 플래그를 false로 설정
      }),
    ],
  }
});
