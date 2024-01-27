var path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  target: ['web', 'es5'],
  entry: { 
    'main' : './src/main.ts',
    'core' : './live2dcubismcore.min.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: ({ chunk }) => {
      return chunk.name === 'main' ? 'bundle.js' : '[name].js';
  },
    publicPath: './dist/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@framework': path.resolve(__dirname, '../../../Framework/src'),
      // 'Live2DCubismCore': path.resolve(__dirname,'../../../Core/live2dcubismcore.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
        name: '[name].[ext]',
        outputPath: 'images', // adjust the output path as needed
      },
    },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'audio', // adjust the output path as needed
      }}    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
    template: 'index.html',
    filename: 'index.html',
  }),
  ],
  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, '/'),
        serveIndex: true,
        watch: true,
      }
    ],
    hot: true,
    port: 5000,
    host: '0.0.0.0',
    compress: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
