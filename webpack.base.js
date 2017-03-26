const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const I18nWebpackPlugin = require('i18n-webpack-plugin')

const path = require('path')

module.exports = function() {
  return {
    entry: {
      main: './src/index.tsx'
    },
    output: {
      path: path.join(__dirname, 'dist/assets/'),
      filename: '[name].bundle.js',
      publicPath: '/assets/',
      sourceMapFilename: '[name].map'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
      modules: [path.join(__dirname, 'src'), 'node_modules']
    },
    module: {
      rules: [{
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader']
        }, {
          test: /\.(jpg|png|gif)$/,
          use: 'file-loader'
        }, {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        }, { test: /\.tsx?$/,
          loader: 'awesome-typescript-loader'
        }, {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },
    externals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      jquery: 'jQuery'
    },
    plugins: [
      new I18nWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Webapp',
        template: './src/index.html',
        inject: 'body',
        minify: {
          removeAttributeQuotes: true
        },
        hash: true,
        cache: true,
        showErrors: true,
        chunks: ['main'],
        chunksSortMode: 'dependency',
        xhtml: true
      })
    ]
  }
}