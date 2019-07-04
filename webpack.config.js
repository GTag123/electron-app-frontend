/* eslint-disable no-undef */
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/renderer.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'renderer-bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'src/fonts/[name].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery/dist/jquery.min',
            jQuery: 'jquery/dist/jquery.min',
            notificate: [path.resolve(__dirname, 'src/components/js/notify'), 'default'] // func name when export not default
        })
    ],
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.css', '.js', '.jsx'],
    }
}
