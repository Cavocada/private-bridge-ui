const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const base = require('./webpack.config.base');
const config = require('../config');

// const { PROJECT_ROOT } = require('../utils/getPath');

// base.output.publicPath = `http://${config.dev.ip}:${config.dev.port}/`;
base.output.publicPath = '/';

module.exports = merge(base, {
  target: 'web',
  mode: 'development',
  devtool: 'eval-source-map',
  watchOptions: {
    aggregateTimeout: 600,
  },
  devServer: {
    // contentBase: path.resolve(PROJECT_ROOT, './public'),
    open: true,
    hot: true,
    host: config.dev.ip,
    port: config.dev.port,
    compress: true,
    proxy: {
      '/pos/*': {
        target: 'http://b.slasharetest.com/',
        changeOrigin: true,
        secure: true,
      },
    },
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/index.html' }],
    },
  },
  plugins: [
    // 设置cleanStaleWebpackAssets 是为了保证后续热更新时, 不在清空所有数据, 只在第一次运行时清空数据
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 支持热更新
    new HotModuleReplacementPlugin(),
    // React 官方出品 快速 热更新
    new ReactRefreshWebpackPlugin(),
  ],
});
