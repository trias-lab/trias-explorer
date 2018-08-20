var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var ip = 'localhost';
var config = require('./webpack.config.base.js');

config.devtool = "source-map";

config.entry = {
  app: [
    'webpack-dev-server/client?http://' + ip + ':3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './html/app',
  ],
};

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
  new BundleTracker({filename: './webpack-stats-local.json'}),
]);
module.exports = config;
