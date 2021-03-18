const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, 'src'),
  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",
  devtool: isDev ? 'source-map' : false,
	entry: {
    // подключаем предварительно полифилл
    main: ['@babel/polyfill', './js/index.js'],
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
      '#': path.resolve(__dirname, './src/blocks')
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

  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './pages/index.pug'
    }),
    new HTMLWebpackPlugin({
      filename: 'colors-type.html',
      template: './pages/colors-type.pug'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favicon.ico'),
          to: path.resolve(__dirname, 'dist/images')
        },
    //     {
    //       from: path.resolve(__dirname, '/\.src/assets/fonts/'),
    //       to: path.resolve(__dirname, 'dist')
    //     }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    })
  ],

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   "sass-loader"
        //   ]
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          }
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, './src/assets/img'),
        options: {
          name: '[name].[ext]',
          outputPath: './images'
        }
      },
      {
        test: /\.(ttf|woff|woff2|eot|svg)$/,
        loader: 'file-loader',
        include: path.resolve(__dirname, './src/assets/fonts'),
        options: {
          name: '[name].[ext]',
          outputPath: './fonts',
          esModule: false,
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
