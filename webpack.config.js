const path = require(`path`);

module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    port: 8082,
    hot: true,
    compress: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: `babel-loader`,
      exclude: path.join(__dirname, `node_modules`)
    }]
  }
};
