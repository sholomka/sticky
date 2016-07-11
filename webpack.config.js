const webpack = require("webpack");

module.exports = {
    entry: "./js/sticky.js",
    resolve: {
        modulesDirectories: [
            "./js"
        ]
    },
    loader: 'babel-loader',
    module: {
        loaders: [
          {
              loader: 'babel-loader',
              exclude: 'node_modules',
              query: {
                  presets: ['es2015']
              }
          }
        ]
    },
    output: {
        publicPath: "./js",
        filename: "./js/index.js"
    }
};


