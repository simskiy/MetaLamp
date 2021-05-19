const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const plugins = [];

if (isProd) {
  // enable in production only
  plugins.push(new MiniCssExtractPlugin( {
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
  }));
}

plugins.push(new HTMLWebpackPlugin({
  filename: 'index.html',
  template: './pages/index.pug',
  chunks: ['index'],
  inject: 'body'
}))

plugins.push(new HTMLWebpackPlugin({
  filename: 'uikit.html',
  template: './pages/uikit.pug',
  chunks: ['uiKit'],
  inject: 'body'
}))

plugins.push(new HTMLWebpackPlugin({
  filename: 'search.html',
  template: './pages/search.pug',
  chunks: ['search'],
  inject: 'body'
}))

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
	entry: {
    // подключаем предварительно полифилл
    // 'main': ['@babel/polyfill', './js/index.js'],
    'index': '@blocks/index/index.js',
    'search': '@blocks/search/search.js',
    'uiKit': '@blocks/uiKit/uiKit.js',
  },

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
