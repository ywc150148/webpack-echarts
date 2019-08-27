// 开发环境配置文件

const merge = require('webpack-merge'); // 合并webpack配置文件js
const commonConfig = require('./webpack.config.common.js'); // 引入公用webpack配置

const webpack = require('webpack');

const config = {
    devServer: {
        contentBase: './dist', // 网站目录
        host: 'localhost', // 域名
        port: 8080, // 端口
        compress: true, // 服务器压缩
        hot: true, // HMR 热替换
    },
    devtool:'cheap-module-eval-source-map', // 错误信息源代码定位行数
    plugins: [ // 插件
        new webpack.NamedModulesPlugin(), // 开启HMR的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.HotModuleReplacementPlugin(), // 开启 HMR
    ]
}

module.exports = merge(commonConfig,config); // 合并webpack配置 