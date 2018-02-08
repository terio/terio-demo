import { resolve } from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {
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
