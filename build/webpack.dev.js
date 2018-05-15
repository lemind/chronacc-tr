const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  watchOptions: {
    poll: 1000
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    port: 8090,
    stats: 'minimal'
  },
  plugins: [
    new FriendlyErrorsPlugin()
  ]
});