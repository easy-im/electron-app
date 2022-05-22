const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { useFileLoader } = require("./utils");

module.exports = function (isProduction) {
  return [
    {
      test: /tsx?$/i,
      loader: "ts-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)|(NIM_Web_SDK.*\.js)/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  modules: false,
                  targets: {
                    electron: "9.2",
                  },
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
            ],
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            sourceMap: false,
          },
        },
      ],
    },
    {
      test: /\.(png|jpe?g|gif)(\?\S*)?$/,
      use: [useFileLoader("images")],
    },
    {
      test: /\.(wav|mp3)$/,
      use: [useFileLoader("audio")],
    },
    {
      test: /\.(svga)$/,
      use: [useFileLoader("svga")],
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
      use: [useFileLoader("fonts")],
    },
  ];
};
