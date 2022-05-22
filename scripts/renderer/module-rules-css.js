const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { useCssLoader, usePostcssLoader } = require("./utils")

module.exports = function (isProduction) {
  
  return {
    test: /\.css$/,
    oneOf: [
      // 其它的 css 全部打包到一个文件
      {
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // only enable hot in development
              // hmr: process.env.NODE_ENV === "development",
              // // if hmr does not work, this is a forceful method.
              // reloadAll: true
            }
          },
          useCssLoader(false)
        ]
      }
    ]
  }
}
