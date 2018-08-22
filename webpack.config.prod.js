var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const CleanWebpackPlugin = require('clean-webpack-plugin'); // remove files
const CopyWebpackPlugin = require('copy-webpack-plugin')  // copy files

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
  }),
  //拷贝文件到文件系统
  new CopyWebpackPlugin([ 
    //from相对于context, context相对于此文件所在目录，
    //to生产模式时是相对于output.path;开发模式时相对于 output.publicPath
    {from: './favicon.ico', to:'../',context: 'html/'},
    {from: './vendors/', to:'../vendors/',context: 'html/',toType: 'dir'},
    // {from: './img/', to:'../img/',context: 'src/',toType: 'dir'},
    // {from: './*', to:'../js/',context: 'src/js/vendor'},
    // {from: './partials/', to:'../partials/',context: 'src/'},
  ]),
]);
module.exports = config;