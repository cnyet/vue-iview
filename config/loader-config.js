//webpack模块加载器配置
var webpack = require("webpack");
var path = require("path");  
var eslintFormat = require("eslint-friendly-formatter");  
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  //当遇到在require()/import加载的文件时，打包之前先使用对应的loader转换一下
  rules: [
    {                
        test: /\.(js|vue)$/,
        enforce: "pre",                 //前置处理
        include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../test")],
        use: {
            loader: "eslint-loader",
            options: {
                fix: true,
                emitError: true,  
                formatter: eslintFormat
            }
        }
    }, {
        test: /\.vue$/,
        use: {
            loader: "vue-loader",
            options: {
                transformToRequire: {
                    video: 'src',
                    source: 'src',
                    img: 'src',
                    image: 'xlink:href'
                }
            }
        }
    }, {
        test: /\.js$/,
        use: "babel-loader",
        include: [path.resolve(__dirname, "../src"), path.resolve(__dirname, "../test")]                
    }, {
        test: /\.css$/, 
        include: [
            path.resolve(__dirname, "../src/")
        ],                    
        use: ExtractTextPlugin.extract({ 
            fallback: "style-loader",   
            use: ['css-loader']                     
        }),
    }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({    
            fallback: "style-loader",  
            use: [
                {loader: 'css-loader', options: { importLoaders: 1 }},
                {loader: 'less-loader'},
                {loader: 'postcss-loader',
                    options:{
                        plugins: [
                            require('postcss-import'),
                            require('postcss-assets'),
                            require('autoprefixer'),
                            require('cssnano')
                        ]
                    }                      
                }
            ]             
        })
    }, {
        test: /\.(png|jpg|gif)$/, 
        use: ['file-loader?limit=8192&name=assets/images/[name].[ext]']
    }, {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/, 
        use: ['file-loader?name=assets/fonts/[name].[ext]']
    }, {
        test: /\.html$/,
        use: {
            loader: "html-loader",
            options: {
                // attrs: [":data-src"],
                interpolate: "require"                         
            }
        }
    }
  ]
};