const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

exports.findEntries = function findEntries() {
  const pagesRoot = path.resolve(__dirname, '../../src/renderer/pages')
  const pages = fs.readdirSync(pagesRoot)
  const entries = []
  pages.forEach(page => {
    if (fs.existsSync(path.join(pagesRoot, page, 'index.tsx')) && fs.existsSync(path.join(pagesRoot, page, 'index.html'))) {
      entries.push(page)
    }
  })
  const entry = {}
  const htmlPlugin = []
  entries.forEach(name => {
    entry[name] = path.resolve(__dirname, `../../src/renderer/pages/${name}/index.tsx`)
    htmlPlugin.push(new HtmlWebpackPlugin({
      filename: `${name}/index.html`,
      template: path.resolve(__dirname, `../../src/renderer/pages/${name}/index.html`),
      chunks: ['runtime', 'vendors', name],
    }))
  })
  return {
    entries,
    entry,
    htmlPlugin,
  }
}

exports.useFileLoader = function useFileLoader(outputPath) {
  return {
    loader: 'file-loader',
    options: {
      esModule: false,
      outputPath,
      publicPath: `../${outputPath}/`
    }
  }
}

// css-loader 的配置请参考 https://github.com/webpack-contrib/css-loader
exports.useCssLoader = function useCssLoader(useModules, importLoaders=0) {
  return {
    loader: 'css-loader',
    options: {
      esModule: false,
      modules: useModules ? {
        localIdentName: '[local]_[hash:base64:5]'
      } : false,
      importLoaders
    }
  }
}

// postcss-loader 的配置参考 https://github.com/webpack-contrib/postcss-loader
exports.usePostcssLoader = function usePostcssLoader() {
  return {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          "autoprefixer"
        ]
      }
    }
  }
}