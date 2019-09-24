const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: [
    "@babel/polyfill",
    path.join(__dirname, './src/main.js')
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{
            loader: "html-loader",
            options: {
                minimize: true
            }
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {}
      },
      // 解析vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {}
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ],
  },
  resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin()
  ]
}