const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { useCssLoader, usePostcssLoader } = require("./utils");

module.exports = function (isProduction) {
  return {
    test: /\.less$/,
    oneOf: [
      // 其它的 scss 全部打包到一个文件
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          useCssLoader(false),
          {
            loader: "less-loader",
          },
        ],
      },
    ],
  };
};
