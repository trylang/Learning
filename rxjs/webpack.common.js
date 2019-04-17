const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    // another: './src/another-module.js'
  },
  devtool: 'inline-source-map',
  // externals: {
  //   lodash: {
  //     commonjs: 'lodash',
  //     commonjs2: 'lodash',
  //     amd: 'lodash',
  //     root: '_'
  //   }
  // },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Progressive Web Application'
    }),
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendors",
  //         chunks: "all"
  //       },
  //       vendor: {
  //         chunks: "initial",
  //         test: path.resolve(__dirname, "node_modules"),
  //         name: "vendor",
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  output: {
    // filename: '[name].bundle.js',
    filename: '[name].[chunkhash].js',
    // filename: 'webpack-numbers.js',
    // library: 'webpackNumbers',
    path: path.resolve(__dirname, 'dist')
  }
};