const resolve = require('path').resolve;
const webpack = require('webpack');
const StartServerPlugin = require('start-server-webpack-plugin');

module.exports = {
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
        resolve('server', 'index.js')
    ],
    output: {
        filename: 'main.js',
        path: resolve('server-build'),
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
        new StartServerPlugin({
            name: 'main.js',
            nodeArgs: ['--inspect']
        })
    ]
}
