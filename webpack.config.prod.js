var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //删除文件

var config = require('./webpack.config.base.js');

config.output.path = require('path').resolve('./html/static/bundles/prod/');
config.plugins = config.plugins.concat([
  new CleanWebpackPlugin(['html/static/bundles/prod']),   //删除文件夹
  new BundleTracker({
    filename: './webpack-stats-prod.json'
  }),
  //webpack2的UglifyJsPlugin不再压缩loaders，通过以下设置来压缩loaders
  new webpack.LoaderOptionsPlugin({
    minimize: true
  }),
  // minifies your code
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compressor: {
      warnings: false
    },
    output: {
      comments: false, //关闭注释
    },
  })
]);
module.exports = config;