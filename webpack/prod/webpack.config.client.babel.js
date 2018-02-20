import webpack from 'webpack';
import paths from '../paths.babel';
import {resolve} from 'path';
import {StatsWriterPlugin} from 'webpack-stats-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    devtool: 'source-map',
    entry: {
        main: paths.CLIENT_ENTRY,
        vendor: ['loki']
    },
    output: {
        filename: '[name].[chunkhash].js',
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
                use: ExtractTextPlugin.extract({
                    fallback: 'isomorphic-style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            importLoaders: 1,
                            localIdentName: '[folder]___[local]___[hash:base64:5]'
                        }
                    }, 'sass-loader']
                })
            }
        ]
    },
    plugins: [
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
        new StatsWriterPlugin(),
        new ExtractTextPlugin('main.[hash].css')
    ]
}
