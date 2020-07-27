var path = require("path");
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  context: __dirname,

  entry: {
    // Add as many entry points as you have container-react-components here
    app: './html/app.js',
    vendors: ['react','./html/js/qrcode.js']
  },

  output: {
      path: path.resolve('./html/static/bundles/dev/'),
      filename: "[name]-[hash].js",
      publicPath: '/static/bundles/prod/'
  },

  externals: [
  ], // add all vendor libs

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({name:'vendors', filename:'vendors.js'}),
    new ExtractTextPlugin({ //样式文件单独打包
      filename: "app.css",
      disable: false,
      allChunks: true
    })
  ], // add all common plugins here
  module: {
    rules:[
      {
        test: /\/expression\/parser\.js$/,
        use: 'exports-loader?parser'
      },
      {
        test: /\.css$/,
        use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback:'style-loader',
            use: [{
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    //process.env.NODE_ENV 变量获取的是命令行中传递的参数（./pack_run.sh 中）
                    minimize: process.env.NODE_ENV==='production'  //生产模式才压缩css文件，否则开发模式下sourcemap会有问题
                }
            },  {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: () => [autoprefixer({ browsers: ['defaults', 'ie >= 8', 'Android >= 4.1', 'iOS >= 10', 'Firefox >= 45'] })],
              },
            }],
        }))
      },
      {
          test: /\.less$/i,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
              fallback:'style-loader',
              use: [{
                  loader: 'css-loader',
                  options: {
                      sourceMap: true,
                      minimize: process.env.NODE_ENV==='production'
                  }
              },  {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true,
                  plugins: () => [autoprefixer({ browsers: ['defaults', 'ie >= 8', 'Android >= 4.1', 'iOS >= 10', 'Firefox >= 45'] })],
                },
              }, {
                  loader: 'less-loader',
                  options: {
                      sourceMap: true
                  }
              }],
          }))
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/,
        use: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=81920'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ] // add all common loaders here
  },

  resolve: {
    modules:['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx', '.css']
  }
};
