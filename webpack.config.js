// webpack.config.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: {       
      directory: path.resolve(__dirname, './dist')
    },
	port: 8081,
	historyApiFallback: true
  },
  module: {
	  rules: [
		// ... other rules
		{
		  test: /\.vue$/,
		  loader: 'vue-loader'
		},
		
		  {
			test: /\.css$/,
			use: ['style-loader','css-loader']
		  },
		  {
			test: /\.png$/,
			use: "url-loader?limit=100000"
		  },
		  {
			 test: /\.jpg$/,
			 use: "file-loader"
		  },
		 {
			test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=application/font-woff'
		  },
		  {
			 test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			 use: 'url-loader?limit=10000&mimetype=application/octet-stream'
		  },
		  {
			 test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			 use: 'file-loader'
		  },
		  {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			use: 'url-loader?limit=10000&mimetype=image/svg+xml'
		  }
	  ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}