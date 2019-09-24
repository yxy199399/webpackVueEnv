const merge = require('webpack-merge');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack')

const webpackConfig = merge(baseWebpackConfig, {
    mode:'production',
    module: {
      rules: [
        // 处理scss
        {
          test: /\.(scss|css)$/,
          use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'postcss-loader',
              'sass-loader',
          ]
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        'process.env': {
          ENV_CONFIG: '"dev"',
          BASE_API: '"https://api-prod"'
        }
      })
    ]
    //environment specific config goes here
});

module.exports = webpackConfig;