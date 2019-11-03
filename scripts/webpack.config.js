/* eslint-disable no-console */

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// @ts-ignore
const pkg = require("../package.json");

const createConfig = mode => ({
  mode,
  entry: {
    main: path.resolve(__dirname, "../src/bootstrap.ts")
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../.build"),
    publicPath: "/svg-viewbox-crop/"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(js)|(tsx?)$/,
        loader: "babel-loader",
        options: { rootMode: "upward" }
      }
    ]
  },

  plugins: [
    mode === "production" && new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "../src/index.html"),
      filename: "index.html",
      title: pkg.name,
      hash: true,
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no"
      },
      minify: mode === "production" && {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),

    new AppManifestWebpackPlugin({
      logo: path.resolve(__dirname, "../src/assets/images/icon.png"),
      prefix: "/",
      config: {
        inject: true,
        appName: pkg.name,
        appDescription: pkg.description,
        developerName: pkg.author.name,
        developerUrl: pkg.author.url,
        version: pkg.version,
        background: "#fff",
        theme_color: "#fff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: mode === "production" && {
          android: true,
          appleIcon: true,
          favicons: true,
          firefox: false,
          yandex: false,
          windows: false,
          appleStartup: false,
          coast: false
        }
      }
    })
  ].filter(Boolean),

  devtool: mode === "production" ? "source-map" : false,

  /**
   * prevent webpack from giving warning about the bundle size
   */
  performance: {
    maxEntrypointSize: 10000000,
    maxAssetSize: 10000000
  },

  devServer: {
    historyApiFallback: {
      rewrites: [{ from: /./, to: "/index.html" }]
    },
    stats: "errors-only"
  }
});

module.exports = createConfig(process.env.NODE_ENV || "development");
