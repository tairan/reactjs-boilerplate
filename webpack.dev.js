const path = require('path')
const webpackMerge = require('webpack-merge')
const commonConfig = require('./webpack.base.js')

module.exports = function (env) {
  return webpackMerge(commonConfig(), {
    devtool: 'cheap-module-source-map',
    output: {
      path: path.join(__dirname, 'dist/assets/'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map'
    },
    devServer: {
      port: 9000,
      host: 'localhost',
      historyApiFallback: true,
      noInfo: false,
      stats: 'minimal'
    }
  })
}
