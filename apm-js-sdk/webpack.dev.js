const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: ['./src/index.ts']
  },
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].[hash].js'
  },
  devtool: "source-map",
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './test/index.html',
      filename: 'index.html',
      inject: 'head'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: '0.0.0.0',
    compress: true,
    inline: true,
    hot: true,
    port: 8000
  }
};
