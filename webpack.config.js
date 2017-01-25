const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = process.env.NODE_ENV === 'development';
const isHot = process.env.NODE_ENV === 'hot';
const isProduction = process.env.NODE_ENV === 'production';

const config = {};

/*
* Output & Entry & Resolve
* */

config.output = {
  path: path.join(__dirname, 'public'),
  filename: 'bundle.js',
  publicPath: '/public/'
};

if (isHot) {
  config.entry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    './client/index'
  ];
} else {
  config.entry = './client/index';
}

config.resolve = {
  root: path.join(__dirname, 'client'),
  extensions: ['', '.js', '.jsx']
};

/*
* Devtools & Watch
* */

if (isProduction) {
  config.devtool = 'source-map';
} else {
  config.devtool = 'cheap-module-eval-source-map';
}

if (isHot || isDevelopment) {
  config.watchOptions = {
    aggregateTimeout: 100,
    poll: 500
  };
}

/*
* Plugins & postcss
* */

config.plugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV'])
];

if (isProduction) {
  config.plugins.push(
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
    })
  );
}

if (isHot) {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

if (isProduction) {
  config.postcss = [autoprefixer({ browsers: ['last 5 versions', 'ie >= 10'] })];
}

/*
* Loaders
* */

config.module = {};
config.module.loaders = [
  {
    test: /\.(js|jsx)$/,
    loader: 'babel',
    exclude: /(node_modules)/
  },
  { test: /\.png$/, loader: "url-loader?limit=100000" },
  {
    test: /\.json/,
    loader: 'json'
  },
];

if (isProduction) {
  config.module.loaders.push({
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass')
  })
} else {
  config.module.loaders.push({
    test: /\.s?css$/,
    loader: 'style!css!resolve-url!sass'
  });
}

module.exports = config;
