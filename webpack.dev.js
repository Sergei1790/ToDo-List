const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',

  // if error occurs shows in which file. Without this if we have a lot of files, error will be shown in bundled file
  devtool: 'inline-source-map',
  // Optional - tells webserver where to find files
  devServer: {
    static: './dist',
  },
});