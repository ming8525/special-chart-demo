const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const arcgisCharts = require('./webpack-arcgis-charts.config')

const toBeCopied = [
    { from: './system.min.js', to: './system.min.js' },
]

const main = {
    entry: path.join(__dirname, "src", "index.jsx"),
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        libraryTarget: 'system'
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".js", ".json", ".jsx", ".css"]
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        host: 'localhost',
        devMiddleware: {
            writeToDisk: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }, {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new CopyWebpackPlugin({ patterns: toBeCopied })
    ]
};

module.exports = [arcgisCharts, main]