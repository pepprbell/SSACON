const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");
const { resolve } = require("path");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
  entry: {
    router: "./router.js",
    app: "./index.js",
  },

  output: {
    path: resolve(__dirname, "./dist"),
    filename: "[name].js",
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", // output file name
      template: "index.html", // template file name
    }),
    new MiniCssExtractPlugin({ filename: "app.css" }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["dist"],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
};
