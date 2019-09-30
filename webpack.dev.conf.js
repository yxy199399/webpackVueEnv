const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const webpack = require('webpack')

const webpackConfig = merge(baseWebpackConfig, {
    mode:'development',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:4200',
          pathRewrite: {'^/api' : ''},
          changeOrigin: true,
        }
      }
    },
    module: {
      rules: [
        // 处理scss
        {
          test: /\.(scss|css)$/,
          use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
              'sass-loader',
          ]
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          ENV_CONFIG: '"dev"',
          BASE_API: '"http://localhost:4200"'
        }
      })
    ]
});

module.exports = webpackConfig;