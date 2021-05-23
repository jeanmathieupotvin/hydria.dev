const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/js/index.js',
  output: {
      path: `${__dirname}/build/javascripts`,
      filename: 'bundle.js'
  },
  optimization: {
    minimizer: [ new UglifyJsPlugin() ]
  }
}
