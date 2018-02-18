const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    entry: {
        app: resolve('client', 'index.js'),
        vendor: ['loki']
    },
    output: {
        filename: '[name].[chunkhash].js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Loki demo',
            filename: resolve('public', 'index.html'),
            template: resolve('client', 'index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                // This prevents stylesheet resources with the .css or .scss extension
                // from being moved from their original chunk to the vendor chunk
                if(module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                    return false;
                }
                return module.context && module.context.includes('node_modules');
            }
        }),
        new ManifestPlugin(),
        new ExtractTextPlugin('app.[hash].css')
    ],
    devServer: {
        contentBase: resolve('public'),
        historyApiFallback: true,
        inline: true,
        publicPath: '/'
    }
}
