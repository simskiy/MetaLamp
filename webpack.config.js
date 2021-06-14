const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const ESLintPlugin = require("eslint-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const plugins = []

// массив страниц
let pages = ['index', 'search', 'colorsType', 'formElements']


if (isProd) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin( {
    filename: '[name].css',
    chunkFilename: '[id].css',
  }))
}

const entryFiles = (arr) => {
  let entrys = {};
  for (let page of arr) {
    entrys[page] = `@blocks/${page}/${page}.js`
  }
  return entrys
}

for (let page of pages) {
  plugins.push(new HTMLWebpackPlugin({
    filename: `${page}.html`,
    template: `./pages/${page}.pug`,
    chunks: [`${page}`]
  }))
}

plugins.push(new CleanWebpackPlugin())

plugins.push(new CopyWebpackPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, 'src/assets/favicon.ico'),
      to: path.resolve(__dirname, 'dist/images')
    }
  ],
}))

plugins.push(new ESLintPlugin({
  extensions: ["js", "jsx", "ts", "tsx"],
}))

plugins.push(new webpack.ProvidePlugin({
  $: 'jquery',
  jQuery: 'jquery'
}))

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  devtool: isDev ? 'source-map' : false,
  entry: entryFiles(pages),
	output: {
    filename: 'js/[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
	},

  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@blocks': path.resolve(__dirname, './src/blocks')
    }
  },

  optimization: {
    minimize: isProd,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
        sourceMap: isDev
      }),
      new TerserPlugin()
    ],
    splitChunks: {
      chunks: 'all',
    }
  },

  devServer: {
    port: 8080,
    contentBase: './dist',
    open: true,
    hot: isDev,
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.html$/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
      {
        test: /\.html$/i,
        use: ['extract-loader', 'html-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource',
        generator: {
         filename: 'images/[hash][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
        generator: {
         filename: 'fonts/[hash][ext][query]'
        }
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      }
    ],
  }
}
