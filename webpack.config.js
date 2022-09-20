const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";
console.log(process.argv)
const ADDRESS = process.argv[4];

console.log("building project for contract @", ADDRESS);

const config = {
  entry: "./index.tsx",
  experiments: {
    topLevelAwait: true
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({}),
    new webpack.ProvidePlugin({ process: 'process/browser' }),
    new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
    new webpack.DefinePlugin({ ADDRESS: `"${ADDRESS}"` }),
  ],
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.m?js$/i,
        type: "javascript/auto",
      },
      {
        test: /\.m?js$/i,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".mjs"],
    fallback:
    {
      assert: require.resolve('assert'),
      assert: require.resolve("assert/"),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      fs: require.resolve('fs'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve('stream-browserify'),
      url: require.resolve('url'),
      url: require.resolve("url/")
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};