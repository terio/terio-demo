import webpack from 'webpack';
import paths from '../paths.babel';
import {resolve} from 'path';

export default {
    devtool: 'inline-source-map',
    target: 'node',
    node: {
        console: false,
        global: false,
        process: false,
        __filename: false,
        __dirname: false,
        Buffer: false,
        setImmediate: false
    },
    entry: [
        paths.SERVER_ENTRY
    ],
    output: {
        filename: 'main.js',
        path: paths.SERVER_BUILD,
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    externals: [require('webpack-node-externals')()],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    node: 'current'
                                }
                            }]
                        ]
                    }
                },
                exclude: /client/
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    node: 'current'
                                }
                            }]
                        ],
                        plugins: ['@babel/plugin-transform-async-to-generator']
                    }
                },
                include: /client/,
                exclude: /server/
            },
            {
                test: /\.scss$/,
                use: [
                    'isomorphic-style-loader',
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
        new webpack.BannerPlugin({
            raw: true,
            banner: 'require("source-map-support/register");'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
}
