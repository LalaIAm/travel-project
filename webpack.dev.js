const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: {
        main: './src/client/index.js',
    },
    mode: 'development',
    output: {
        libraryTarget: 'var',
        library: 'Travel',
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:4000',
        },
        open: true,
        compress: true,
        contentBase: './dist',
        hot: true,
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{ loader: 'file-loader' }],
            },
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html',
            chunks: ['main'],
        }),
        new HtmlWebPackPlugin({
            template: './src/client/views/login.html',
            filename: './login.html',
            chunks: ['auth'],
        }),
        new CleanWebpackPlugin({
            verbose: true,
            dry: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false,
        }),
        new Dotenv()
    ],
};
