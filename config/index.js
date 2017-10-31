const path = require("path");

module.exports = {
  build: {
    env: {
        NODE_ENV: '"production"'
    },
    index: path.resolve(__dirname, "../dist/index.html"),           //首页
    assetsRoot: path.resolve(__dirname, "../dist"),                 //根目录
    assetsSubDirectory: "static",                                   //静态资源的目录            
    assetsPublicPath: "/",                                          //服务器根目录
    productionSourceMap: true,
    productionGzip: false,                                          //gzip打包
    productionGzipExtensions: ["js", "css"],                        //gzip打包的文件类型
    bundleAnalyzerReport: process.env.npm_config_report     
  },
  dev: {
    env: {
        NODE_ENV: '"development"'
    },
    port: process.env.PORT || 3000,
    autoOpenBrowser: true,
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {},
    cssSourceMap: false
  }
};