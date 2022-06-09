const path = require("path");
const webpack = require("webpack");

module.exports = () => {
  return {
    target: "electron-main",

    mode: process.env.NODE_ENV === "production" ? "production" : "development",

    // watch: process.env.NODE_ENV !== "production",

    entry: {
      main: path.join(__dirname, "../../dist/src/main/index.js"),
    },

    node: {
      __dirname: false,
      __filename: false,
    },

    output: {
      filename: "[name].js",
      path: path.join(__dirname, "../../dist/main"),
    },

    module: {},

    resolve: {
      extensions: [".js", ".json", ".node"],
    },

    plugins: [
      new webpack.DefinePlugin({
      }),
    ],

    // optimization: {
    //   minimize: false
    // }
  };
};
