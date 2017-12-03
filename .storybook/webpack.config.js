module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.json', '*'],
  },
}
