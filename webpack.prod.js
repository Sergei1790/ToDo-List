const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  // if error occurs shows in which file. Without this if we have a lot of files, error will be shown in bundled file
  devtool: 'source-map',
});