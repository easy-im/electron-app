const path = require("path")
const webpack = require("webpack")
const { findEntries } = require("./utils")
const moduleRules = require("./module-rules")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const pkg = require("../../package.json")
const serveConfig = require("../../configs/serve.json")

function resolvePath(targetPath) {
  return path.resolve(__dirname, "../../", targetPath)
}

module.exports = () => {

  const isProduction = process.env.NODE_ENV === 'production'
  // 多页面应用：查找页面
  const entries = findEntries()

  const baseConfig = {
    mode: isProduction ? "production" : "development",

    entry: entries.entry,

    target: "electron-renderer",

    output: {
      hashDigestLength: 8,
      path: path.resolve(__dirname, "../../dist/renderer"),
      publicPath: isProduction ? "../" : "/",
      filename: isProduction ? "js/[name].[chunkhash].js" : "js/[name].js",
      chunkFilename: isProduction
        ? "js/chunk-[name].[chunkhash].js"
        : "js/chunk-[name].js"
    },

    node: {
      __dirname: !isProduction,
      __filename: !isProduction
    },

    module: {
      rules: moduleRules(isProduction)
    },

    resolve: {
      alias: {
        "@": resolvePath("src"),
        renderer: resolvePath("src/renderer"), // @/renderer
        components: resolvePath("src/renderer/components"),
        utils: resolvePath("src/renderer/utils"),
        assets: resolvePath("src/renderer/assets"),
        pages: resolvePath("src/renderer/pages"),
        api: resolvePath("src/renderer/api"),
        configs: resolvePath("configs"),
        share: resolvePath("src/share")
      }
    },

    plugins: [
      ...entries.htmlPlugin,
      new webpack.DefinePlugin({
        __APP_VERSION__: JSON.stringify(pkg.version),
      }),
      new MiniCssExtractPlugin({
        filename: isProduction
          ? "css/main.[contenthash:10].css"
          : "css/main.bundle.css"
      })
    ],

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            minChunks: 4
          }
        }
      },
      runtimeChunk: {
        name: "runtime"
      }
    },

    devServer: {
      // contentBase: path.resolve(__dirname, "../../public")
      static: {
        directory:  path.resolve(__dirname, "../../public"),
      },
      host: "0.0.0.0",
      // https: true,
      historyApiFallback: true,
      port: serveConfig.renderer.port,
    },

    devtool: isProduction ? "nosources-source-map" : "inline-source-map",
  }

  return baseConfig
}
