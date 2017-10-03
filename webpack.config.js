const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const LOGGER_VERSION = 'camping-0-0-1';
const BUNDLE_VERSION = 'camping-v0.0.1';
const LICENSE_MESSAGE = BUNDLE_VERSION + '\nCopyright ' + new Date().getFullYear() + ', David DiMaria.';

module.exports = {
  entry: {
    bundle: [
      'url-search-params',
      './src/index.ts',
    ]
  },
  output: {
    path: __dirname,
    filename: './dist/camping.js',
    library: ['mqgl'],
    libraryTarget: 'umd'
  },
  devServer: {
    inline: true,
    port: 8090,
    contentBase: './src/examples',
  },
  module: {
    loaders: [
      // ts-loader: convert typescript (es6) to javascript (es6),
      {
        test: /\.ts?$/,
        loaders: ['ts-loader']
      },
      // babel-loader for pure javascript (es6) => javascript (es5)
      {
        test: /\.(js?)$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      // sass compilation
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader',
        })
      },
      {
        test: /\.png$/,
        use: ['url-loader?mimetype=image/png']
      },
      {
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
          options: {}
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: './dist/camping.css', allChunks: true}),
    new webpack.DefinePlugin({VERSION: JSON.stringify(LOGGER_VERSION)}),
    new webpack.BannerPlugin({banner: LICENSE_MESSAGE})
  ],
  resolve: {
    extensions: ['.js', '.ts', '.scss'],
    alias: {}
  }
};
