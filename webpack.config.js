const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const meteorExternals = require('webpack-meteor-externals');

const clientConfig = {
  devtool: 'cheap-module-eval-source-map',
  entry: './startup/client/main.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './startup/client/main.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  externals: [meteorExternals()],
  devServer: {
    hot: true,
  },
};

const serverConfig = {
  entry: ['./startup/server/main.js'],
  target: 'node',
  devServer: {
    hot: true,
  },
  externals: [meteorExternals()],
};

module.exports = [clientConfig, serverConfig];
