var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const CopyWebpackPlugin = require('copy-webpack-plugin')  // copy files

var ip = 'localhost';
var config = require('./webpack.config.base.js');

config.devtool = "source-map";

config.entry.app =  [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './html/app',
];

config.devServer = {
  // contentBase: '/static/bundles',
  hot: true,
  port: 3000,
  inline: true,
  headers: {"Access-Control-Allow-Origin":"*"},
  historyApiFallback: true,   //the index.html page will be served in place of any 404 responses.
}

config.output.publicPath = 'http://' + ip + ':3000' + '/assets/bundles/';

config.plugins = config.plugins.concat([
  new webpack.NamedModulesPlugin(),   //当开启 HMR 的时候使用该插件会显示模块的相对路径
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  //拷贝文件到 webpack-dev-server服务器
  new CopyWebpackPlugin([ //from相对于context, context相对于此文件所在目录，
    //to生产模式时是相对于output.path;开发模式时相对于 output.publicPath
    {from: './favicon.ico', to:'./',context: 'html/'},  
    {from: './vendors/', to:'./vendors/',context: 'html/',toType: 'dir'},
    ]),
  new BundleTracker({filename: './webpack-stats-local.json'}),
]);
module.exports = config;
