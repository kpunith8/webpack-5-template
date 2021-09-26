const _ = require('lodash');
const webpackDev = require('./webpack.config.dev');

module.exports = {
  ..._.omit(webpackDev, ['devServer']),
  mode: 'production',
  devtool: 'source-map',
}