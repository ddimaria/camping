var webpackConfig = require('./webpack.config');
const path = require('path')

webpackConfig.module.rules = [{
  test: /\.ts$/,
  exclude: /node_modules/,
  loader: "awesome-typescript-loader",
  query: {
    compilerOptions: {
      inlineSourceMap: true,
      sourceMap: false
    }
  }
},
  {
    test: /\.ts$/,
    enforce: "post",
    loader: 'istanbul-instrumenter-loader',
    // include: path.join(__dirname, './src/**/*.ts'),
    exclude: [
      'node_modules',
      /\.spec\.ts$/,
      'src/*/!(test)/**/*.ts'
    ]
  }
];

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'sinon'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.ts',
    ],
    exclude: [],
    preprocessors: {
      'test/**/*.ts': ['webpack']
    },
    webpack: {
      devtool: 'inline-source-map',
      module: webpackConfig.module,
      resolve: webpackConfig.resolve,
      plugins: webpackConfig.plugins
    },
    plugins: [
      'karma-coverage', 'karma-webpack', 'karma-mocha', 'karma-chai', 'karma-sinon', 'karma-chrome-launcher', 'karma-coverage-istanbul-reporter'
    ],
    webpackServer: {
      noInfo: true
    },
    // any of these options are valid: https://github.com/istanbuljs/istanbul-api/blob/47b7803fbf7ca2fb4e4a15f3813a8884891ba272/lib/config.js#L33-L38
    coverageIstanbulReporter: {

       // reports can be any that are listed here: https://github.com/istanbuljs/istanbul-reports/tree/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib
      reports: ['html', 'lcovonly', 'text-summary'],

       // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: path.join(__dirname, 'coverage'),

       // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,

      // stop istanbul outputting messages like `File [${filename}] ignored, nothing could be mapped`
      skipFilesWithNoCoverage: false,

       // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {

        // all options available at: https://github.com/istanbuljs/istanbul-reports/blob/590e6b0089f67b723a1fdf57bc7ccc080ff189d7/lib/html/index.js#L135-L137
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }

      },
    },
    client: {
      config: {
        browserConsoleLogOptions: true
      },
      mocha: {
        timeout: 600000
      }
    },
    reporters: ['coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
    mime: {
      'text/x-typescript': ['ts']
    }
  });
};
