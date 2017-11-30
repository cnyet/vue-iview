'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')    //将一个包或束提取到一个单独的文件
const isProduction = process.env.NODE_ENV === 'production'
// 获取绝对路径
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  //入口文件
  entry: {
    app: './src/main.js'
  },
  //文件输出路径
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    //设置别名
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  //处理不同文件的加载器
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          fix: true,
          emitError: true,
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              loaders: utils.cssLoaders({
                sourceMap: isProduction ? config.build.productionSourceMap : config.dev.cssSourceMap,
                extract: isProduction
              }),
              transformToRequire: {
                video: 'src',
                source: 'src',
                img: 'src',
                image: 'xlink:href'
              }
            }
          }, {
            loader: "iview-loader",
            options: {
              prefix: false   //prefix 设置为 true 后，所有 iView 组件标签名都可以使用前缀 i-
            }
          }
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
