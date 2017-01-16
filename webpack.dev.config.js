const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new ExtractTextPlugin('styles.css')
];

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    aggregateTimeout: 100,
    poll: 500
  },
  entry: './client/index',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: plugins,
  resolve: {
    root: path.join(__dirname, 'client'),
    extensions: ['', '.js', '.jsx']
  },
  postcss: [autoprefixer({ browsers: ['last 5 versions', 'ie >= 10'] })],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      },
      {
        test: /\.s?css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!resolve-url!sass')
      },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      {
        test: /\.json/,
        loader: 'json'
      },
    ],
  },
};