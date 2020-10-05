const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/Main.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js"],
    alias: {
      'node_modules': path.join(__dirname, 'node_modules'),
    }
  },
  module: {
    rules: [{ test: /\.ts$/, loader: "ts-loader" }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ],
    })
  ],
}