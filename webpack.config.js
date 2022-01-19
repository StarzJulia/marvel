const path = require('path');

module.exports = {
  mode: 'development',
  entry: ["babel-polyfill", "./src/index.tsx"],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
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
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/build',
    filename: "build.js",
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    },
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true,
    hot: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/v1/**': { 
        target: 'http://gateway.marvel.com',
        changeOrigin: true,
        secure: false
      },
    }   
  },
}