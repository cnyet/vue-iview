var webpack = require("webpack");
var util = require('util');                                 //nodejs的核心模块，提供常用函数的集合
var path = require("path");                                                     //引入nodejs再带的path模块，用于处理目录的对象
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");     //将模块中公共部分抽离出来生成单独的文件
var HtmlWebpackPlugin = require("html-webpack-plugin");                          //生成HTML文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");     //将js中引用的css文件分离出单个CSS文件
var CleanWebpackPlugin = require('clean-webpack-plugin');           //清理文件
var ManifestPlugin = require('webpack-manifest-plugin');            //保留所有模块的映射关系的详细要点
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');            //能够删除未引用代码压缩js插件
var postcssSprites = require('postcss-sprites');                //合并图片生产雪碧图
var sprites = postcssSprites.default;
var precss = require('precss');                     //PostCSS插件中的预处理插件包
var assets = require('postcss-assets');             //用来处理图片和 SVG,图片转换成 Base64 编码的 data url 的格式
var autoprefixer = require('autoprefixer');         //增加浏览器相关的声明前缀
var args = require('yargs').argv;                      //给程序传递参数
var isProd = Boolean(process.env.NODE_ENV === "production");             //执行命令是否包含生产环境的字段
var isDev = Boolean(process.env.NODE_ENV === "development");
var devTool = 'inline-cheap-module-source-map';
var server = require("./config/server");
var eslintFormat = require("eslint-friendly-formatter");                 //eslint格式化
var loaders = require("./config/loader-config");            
var plugins = require("./config/plugins-config");

module.exports = {
    //配置入口文件
    entry: {
        app: "./app"
    },    
    //打包输出文件
    output: { 
        path: path.resolve(__dirname, "dist"),          //输出文件目录
        filename: "[name].js",                          //输出文件名定义
        chunkFilename: '[name].bundle.js',              //设置非入口文件chunk的文件名
        publicPath: '/'                                 //指定在浏览器中所引用的目录,设置服务器上的资源根目录
    },
    //设置模块如何被解析
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    //loader用于对模块的源代码进行转换
    module: loaders,
    //解决loader无法实现的事
    plugins: plugins,
    //编译后的代码映射回原始源代码
    devtool: "inline-source-map",       
    //web服务器
    devServer: server
};