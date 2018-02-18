const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

module.exports = {
    devtool: 'eval-source-map',
    entry: [
        resolve('client', 'index.js')
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
            filename: resolve('public', 'app.html'),
            template: resolve('client', 'index.html')
        }),
        new ManifestPlugin({
            writeToFileEmit: true
        })
    ],
    devServer: {
        contentBase: resolve('public'),
        historyApiFallback: true,
        inline: true,
        publicPath: '/'
    }
}
