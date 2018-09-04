const path = require("path");
const webpack = require("webpack");

const commonConfig = {
  entry: {
    app: ["babel-polyfill", "./src/app.js"]
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["env", "stage-0"]
        }
      }
    ]
  }
};

const serverConfig = {
  ...commonConfig,
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: "index.js",
    library: "",
    libraryTarget: "commonjs"
  },
  target: "node",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        TARGET: JSON.stringify("node")
      }
    })
  ]
};

const webConfig = {
  ...commonConfig,
  output: {
    library: "mixpanel-user-library",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "umd"),
    filename: "index.js"
  },
  target: "web",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        TARGET: JSON.stringify("web")
      }
    })
  ]
};

module.exports = [serverConfig, webConfig];
