const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: ["./src/index.jsx"],
  output:{
    // path: path.resolve("./public/"),
    path: path.resolve(__dirname, './dist/public'),
    // path: path.resolve(__dirname, './dist/public/js'),
    publicPath: '/',
    // filename: 'main.js',
    filename: "bundle.js"
  },
  mode: "development",
  module:{
    rules:[
      {
        test:/\.(js|jsx)/, 
        exclude: /node_modules/, 
        use:{ loader:"babel-loader" } 
      },
      {
        test: /\.(css|scss)$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [].concat([
    new MiniCssExtractPlugin(),
    new CompressionPlugin({
      test: /\.(js|jsx)(\?.*)?$/i,
      algorithm: "gzip",
      compressionOptions: { level: 4 },
      filename: "[path][base].gz",
    }),
    new webpack.DefinePlugin({
      '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
    }),
  ]),
};