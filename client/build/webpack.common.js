const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// ToDo: check it
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: ['@babel/polyfill', './src/app.tsx'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js|jsx|tsx)?$/,
        use: ['babel-loader','ts-loader'],
        exclude: path.resolve(__dirname, '../node_modules')
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              minimize: isProd,
              sourceMap: true
            }
          },
          {
            loader: "less-loader"
          }
        ],
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
    extensions: ['.ts', '.tsx', '.js', '.json'],
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      hash: true
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2
        },
        vendors: {
          chunks: "initial",
          test: /node_modules/,
          name: 'vendors',
          maxSize: 300000,
          minSize: 200000
        },
      },
    }
  }
}
