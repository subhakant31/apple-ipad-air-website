const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({ filename: "style.css" }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./src/assets"),
          to: path.resolve(__dirname, "./public/assets"),
        },
        {
          from: path.resolve(__dirname, "./src/index.html"),
          to: path.resolve(__dirname, "./public"),
        },
      ],
    }),
  ],

  entry: ["./src/index.js"],
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./public"),
    clean: true,
  },

  mode: "development",
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|png|svg|gif|eot|woff|ttf)$/,
        type: "asset/resource",
      }
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, "./public"),
    },
  },
};
