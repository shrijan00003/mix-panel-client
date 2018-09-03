const path = require("path");

module.exports = {
  entry: {
    app: ["babel-polyfill", "./src/app.js"]
  },
  output: {
    library: "mixpanel-user-library",
    libraryTarget: "umd",
    path: path.resolve(__dirname),
    filename: "index.js"
  },
  target: "node",
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
