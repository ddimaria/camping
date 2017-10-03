const webpack = require('webpack');
var webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.spec.ts',
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**/*.ts': ['webpack']
    },
    webpack: {
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
    },
    plugins: ['karma-mocha', 'karma-chai', 'karma-sinon', 'karma-webpack', 'karma-chrome-launcher'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 1500,
    browsers: ['Chrome'],
    browserDisconnectTimeout: 60000,
    browserNoActivityTimeout : 60000,
    singleRun: false,
    concurrency: 1,
    client: {
      config: {
        browserConsoleLogOptions: true
      },
      mocha: {
        timeout: 60000
      }
    },
    mime: {
      'text/x-typescript': ['ts']
    },
  })
};
