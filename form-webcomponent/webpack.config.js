/* IMPORTS */
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
/* CONSTANTS */
const buildFolder = "dist";

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  watch: true,
  resolve: {
    alias: {
      app: path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    contentBase: "./dist",
    port: 3006,
    host: "0.0.0.0",
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, buildFolder),
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
};
