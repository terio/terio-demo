import webpack from 'webpack';
import paths from '../paths.babel';
import {resolve} from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    devtool: 'eval-source-map',
    entry: [
        paths.CLIENT_ENTRY
    ],
    output: {
        filename: 'main.js',
        path: paths.CLIENT_BUILD,
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
            template: resolve('server', 'templates/app.js')
        })
    ],
    devServer: {
        contentBase: paths.CLIENT_BUILD,
        historyApiFallback: true,
        inline: true,
        publicPath: '/'
    }
}
