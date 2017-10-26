//webpack插件配置
var webpack = require("webpack");
var path = require("path");  
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = [
  //每次构建钱先清除改目录下所有文件
  new CleanWebpackPlugin(['dist']),
  //自动加载模块，而不必到处 import 或 require
  new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: "lodash"
  }),
  //生成映射关系的依赖图
  new ManifestPlugin({
      fileName: "manifest/manifest.json"
  }),
  //在编译出现错误时跳过输出阶段,确保输出资源不会包含错误
  new webpack.NoEmitOnErrorsPlugin(),
  //删除未引用代码,压缩js插件
  new UglifyJSPlugin({
      uglifyOptions: {
        ie8: false,       //是否支持ie8
        ecma: 5,          //支持ECMAScript的版本
        output: {},       //默认输出为最佳压缩优化
        compress: true,   //压缩选项
        warnings: false   //显示警告提示
      }
  }),
  //提取css文件，单独使用link标签加载css并设置路径，相对于output配置中的publickPath
  new ExtractTextPlugin({
      filename: "static/[name].css",
      allChunks: true
  }),
  //将公共代码抽离出来合并为一个单独文件
  new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 将公共模块提取，生成名为`common`的chunk
      filename: isProd ? 'static/[name].[hash].js' : 'static/[name].js',
      //为了防止重复可以将这些公共模块移入父 chunk，减少总体的大小，但会对首次加载时间产生不良影响
      minChunks: function(module, count){            
          if(module.resource && (/^.*\.(css|scss|less)$/).test(module.resource)) {
            return false;
          }
          return module.context && module.context.indexOf("node_modules") !== -1;
      }
  }),
  new HtmlWebpackPlugin({
      filename: "index.html",      //生成的html存放路径，相对于path
      template: 'src/index.html',  //html模板路径
      inject: 'body',                     //js插入的位置，true/'head'/'body'/false
      //hash: true,                         //为静态资源生成hash值
      minify: {                           //压缩HTML文件    
          removeComments: true,           //移除HTML中的注释
          collapseWhitespace: false       //删除空白符与换行符
      }
  }),
  //启用模块热替换
  new webpack.HotModuleReplacementPlugin(),
  //在编译时配置的全局常量
  new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify('development')
  })
]