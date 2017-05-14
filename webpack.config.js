var path = require('path');

module.exports = {
  entry: path.join(__dirname, '/dist/js/master.js'),
  output: {
    path: path.join(__dirname, '/dist/js/'),
    filename: 'apnscp.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
			presets:['babel-preset-es2015']
        },
        progress: true
      }
    ]
  },
};
