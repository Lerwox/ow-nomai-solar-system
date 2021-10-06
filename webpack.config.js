const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

var config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: './scripts/index.js',
    styles: './styles/main.scss'
	},
	output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'assets/scripts/[name].js',
    library: 'ow-solar-system',
    libraryTarget: 'umd',
		publicPath: '/'
	},
	module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[sha512:hash:base64:7].[ext]',
            outputPath: 'assets/images/'
          }
        }]
      },
      {
        test: /\.(otf|eot|svg|ttf|woff|woff2)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[sha512:hash:base64:7].[ext]',
            outputPath: 'assets/fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/styles/[name].css', chunkFilename: '[id].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    })
  ]
}

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map'

    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        { loader: 'css-loader' },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })

		config.optimization = {
			runtimeChunk: 'single'
		},

    config.devServer = {
      static: {
				directory: path.resolve(__dirname, './public'),
				publicPath: 'http://localhost:2345/'
			},
      host: 'localhost', 
      port: 2345,
      historyApiFallback: true,
      open: true,
      hot: true,
    }
  }

  else if (argv.mode === 'production') {
    config.devtool = 'source-map'

    config.module.rules.push({
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        { loader: 'css-loader' },
        { loader: 'resolve-url-loader' },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    })
  }

  return config
}