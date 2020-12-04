/* eslint-disable @typescript-eslint/no-var-requires */
const PreloadWebpackPlugin = require('preload-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    config.plugin('preload').use(new PreloadWebpackPlugin())
  },
  configureWebpack: {
    optimization: {
      runtimeChunk: 'single'
    }
  }
}
