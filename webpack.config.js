const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        resolve('src', 'index.js')
    ],
    output: {
        filename: 'main.js',
        path: resolve('public'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]___[local]___[hash:base64:5]'
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Loki demo',
            filename: resolve('public', 'index.html'),
            template: resolve('src', 'index.html')
        })
    ],
    devServer: {
        contentBase: resolve('public'),
        historyApiFallback: true,
        inline: true,
        publicPath: '/'
    }
}
