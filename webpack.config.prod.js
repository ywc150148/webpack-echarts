// 生产环境配置文件
const merge = require('webpack-merge'); // 合并webpack配置文件js
const commonConfig = require('./webpack.config.common.js'); // 引入公用webpack配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const OptimizeCssAssetsplugin = require('optimize-css-assets-webpack-plugin');

const config = {
    // devtool: 'cheap-module-source-map', // 设置source-map 调试错误 错误信息源代码定位行数 开启后打包的文件有一份map格式的文件
    plugins: [
        // 生产环境css分离js 提取css文件 不合并在js里 
        new MiniCssExtractPlugin({
            // 打包出的css名称
            filename: 'css/[name].[contenthash:7].css',
            chunkFilename:'css/[name].[chunkhash:7].css',
        }),
    ],
    // 提取公共文件
    optimization: {
        splitChunks: {
            // 从哪些chunks里面抽取代码 initial(入口文件) | all (所有) | async (异步模块 默认)
            chunks: "all",
            // 抽取代码在压缩前最小大小 默认30000
            minSize: 30000,
            // 抽取代码在压缩前最大大小 默认0,不限制最大大小
            maxSize: 0,
            // 被引用次，默认1
            minChunks: 1,
            // 最大异步请求数，默认5
            maxAsyncRequests: 5,
            // 最大初始化加载次数，默认3
            maxInitialRequests: 3,
            // 抽取出来的文件的自动生成名字的分隔符，默认~
            automaticNameDelimiter: '~',
            // 抽取出来的文件名字，默认truw，表示自动生成文件名
            name: true,
            // 
            cacheGroups: {
                // 将所有css打包成一个
                // 注意权重设置为最高，不然其他cachGroups会提前打包一份样式文件
                styles: {
                    name: 'styles',
                    test: /\.(css|scss|sass|less)$/,
                    chunks: 'all',
                    priority: 20, // 优先级 抽取权重，越大优先级越高
                    enforce: true // true 不限制大小 | false 使用上层minSize配置
                },
                // 第三方库单独打包
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',
                    name: 'vendors',
                    priority: 10,
                    enforce: true
                },
                // 把所有引入超过1次的模块抽取为common
                common: {
                    name: 'common',
                    chunks: 'initial',
                    priority: 2,
                    minChunks: 2,
                    enforce: true
                }
            }
        },
        // 提取manifest，管理模块之间交互
        runtimeChunk: {
            name: "manifest"
        },
        minimizer:[
            // 压缩js 这是一款基于Babel的压缩工具，支持es6的特性，取代UglifyJS
            new BabiliPlugin(),
            // 压缩css
            new OptimizeCssAssetsplugin()
        ]
    }
}

module.exports = merge(commonConfig, config); // 合并webpack配置 