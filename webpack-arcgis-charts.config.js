var path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const toBeCopied = [
  { from: './node_modules/@arcgis/charts-components/dist/arcgis-charts-components/t9n', to: '../arcgis-charts/t9n' }
]

module.exports = {
  entry: {
    'arcgis-charts': './src/arcgis-charts.js',
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].bundle.js',
    path: `${path.join(__dirname, "build")}/arcgis-charts`,
    publicPath: '',
    libraryTarget: 'system'
  },
  mode: process.env.NODE_ENV || "development",
  devtool: 'inline-source-map',
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"],
    extensions: [".js", ".json", ".jsx", ".css"],
    fallback: {
      fs: false,
      buffer: false,
      crypto: false,
      stream: false
    }
  },
  plugins: [new CopyWebpackPlugin({ patterns: toBeCopied })]
};