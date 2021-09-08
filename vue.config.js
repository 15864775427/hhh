const path = require("path");
const webpack = require("webpack");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
  productionSourceMap: false, //生产环境是否生成 sourceMap 文件
  devServer: {
    hot: true, //hot配置是否启用模块的热替换功能，devServer的默认行为是在发现源代码被变更后，通过自动刷新整个页面来做到事实预览，开启hot后，将在不刷新整个页面的情况下通过新模块替换老模块来做到实时预览
    open: false, // 使用浏览器自动打开
    https: false,
    host: '0.0.0.0',
    port: 80,
    proxy: {
      "/api": {
        target: "http://172.22.8.95:20201/",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/banshi": {
        target: "http://banshi.beijing.gov.cn/",
        changeOrigin: true,
        pathRewrite: {
          "^/banshi": ""
        }
      }
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("utils", resolve("src/utils"));
  }
};
