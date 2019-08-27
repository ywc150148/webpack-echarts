const path = require('path');
const webpack = require('webpack');

const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const ENV_NODE = process.env.ENV_NODE;
console.log('[webpack.config.common.js]：当前环境是', process.env.NODE_ENV)

module.exports = {
    mode: ENV_NODE, // 设置环境 生产环境 production || 开发环境 development
    entry: { // 入口文件
        index: './src/assets/js/index.js',
    },
    output: { // 出口配置
        // 入口文件名称 hash contenthash chunkhash
        filename: ENV_NODE === 'production' ? '[name].[contenthash:7].js' : '[name].[hash:7].js',
        // 非入口chunk文件（比如动态加载的文件）名称
        chunkFilename: ENV_NODE === 'production' ? '[name].[chunkhash:7].js' : '[name].[hash:7].js',
        // 输出文件夹
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/' // 公共路径 
    },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/ // 排除此文件，不处理此文件内容
            }, {
                test: /\.(css|scss|sass)$/,
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // 生产环境css分离js
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }, {
                test: /\.less$/,
                use: [
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // 生产环境css分离js
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10, // 10k以内的图片转base64打包到js中
                        name: '[name].[hash:7].[ext]', // 打包文件名
                        outputPath: 'images/' // 打包路径
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 10, // 10k以内的图片转base64打包到js中
                        name: '[name].[hash:7].[ext]', // 打包文件名
                        outputPath: 'font/' // 打包路径
                    }
                }]
            },
            {
                test: /\.(htm|html)$/,
                use: [{
                    loader: 'html-withimg-loader'
                }]
            },
        ]
    },
    plugins: [ // 插件
        // 创建环境变量 可以在开发中获取此处创建的环境变量来使用 （package.json中设置）
        new webpack.DefinePlugin({
            "NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }), 
        new CleanWebpackPlugin(), // 清理dist文件夹
        // 不处理static目录，直接拷贝到输出目录 打包到dist中，static里的文件只是复制一遍而已
        new CopyWebpackPlugin([{
            from:path.join(__dirname,'/src/static'),
            to: 'static'
        }]),
        new HtmlWebpackPlugin({ // 打包生成HTML
            template: './page/index.html', // 要打包的文件
            filename: './index.html', // 生成的文件名
            chunks: ['styles','vendors','common','manifest','index'], // 用于多页面，当有多个入口(entry)文件，选择要使用的js自动添加到生成的html中
            minify: {
                //是否对大小写敏感，默认false
                caseSensitive: true,

                //是否简写boolean格式的属性如：disabled="disabled" 简写为disabled  默认false
                collapseBooleanAttributes: true,

                //是否去除空格，默认false
                collapseWhitespace: true,

                //是否压缩html里的css（使用clean-css进行的压缩） 默认值false；
                minifyCSS: true,

                //是否压缩html里的js（使用uglify-js进行的压缩）
                minifyJS: true,

                //Prevents the escaping of the values of attributes
                preventAttributesEscaping: true,

                //是否移除属性的引号 默认false
                removeAttributeQuotes: true,

                //是否移除注释 默认false
                removeComments: true,

                //从脚本和样式删除的注释 默认false
                removeCommentsFromCDATA: true,

                //是否删除空属性，默认false
                removeEmptyAttributes: true,

                // 若开启此项，生成的html中没有 body 和 head，html也未闭合
                removeOptionalTags: false,

                //删除多余的属性
                removeRedundantAttributes: true,

                //删除script的类型属性，在h5下面script的type默认值：text/javascript 默认值false
                removeScriptTypeAttributes: true,

                //删除style的类型属性， type="text/css" 同上
                removeStyleLinkTypeAttributes: true,

                //使用短的文档类型，默认false
                useShortDoctype: true,
            },
        }),
        
    ]
}