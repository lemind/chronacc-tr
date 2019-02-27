const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: ['babel-polyfill', './src/app.js'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: { minimize: isProd }},
            // 'postcss-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?.*$|$)/,
        use: 'file-loader?name=[name].[ext]?[hash]'
      },
      {
        test: /\.html$/,
        use: [
          'raw-loader'
        ]
      },
      {
        test: /\.json$/,
        use: ['json-loader']
      }
    ]
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, '../src/'),
      components: path.resolve(__dirname, '../src/components/'),
      models: path.resolve(__dirname, '../src/models/'),
      helpers: path.resolve(__dirname, '../src/helpers/'),
      cases: path.resolve(__dirname, '../src/cases/'),
      'src/redux': path.resolve(__dirname, '../src/redux/'),
      'api': path.resolve(__dirname, '../src/api/'),
    },
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
        },
      },
    }
  }
}