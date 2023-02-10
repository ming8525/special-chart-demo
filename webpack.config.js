const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const toBeCopied = [
    { from: './node_modules/@arcgis/charts-components/dist/arcgis-charts-components/t9n', to: './arcgis-charts/t9n'}
  ]

module.exports = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js"
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, "src")
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },{
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                use: ["file-loader"]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new CopyWebpackPlugin({ patterns: toBeCopied })
    ],
    node: {
        fs: "empty"
    }
};