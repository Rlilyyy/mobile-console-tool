module.exports = {
  entry: {
    index: './src/console.js'
  },

  output: {
    path: './dist',
    publicPath: '/',
    filename: '[name].min.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' }
    ]
  }
}
