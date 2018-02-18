import {renderToString} from 'loki/lib/dom/server';
import loki from 'loki';
import App from '../client/components/app';
import {IS_PROD, USE_SSR} from '../shared/constants/app';
import webpack from 'webpack';
import express from 'express';
import {resolve} from 'path';
import WebpackDevServer from 'webpack-dev-server';
import {template} from 'lodash';

const TEMPLATE_SETTINGS = {
    evaluate:    /{{([\s\S]+?)}}/g,
    interpolate: /{{=([\s\S]+?)}}/g,
    escape:      /{{-([\s\S]+?)}}/g
};

let server, fs = require('fs'), manifest, appTemplate;

if(!IS_PROD) {
    const devWebpackConfig = require('../webpack/dev/webpack.config.client.js');
    const compiler = webpack(devWebpackConfig);
    new WebpackDevServer(compiler, {
        contentBase: resolve('public'),
        hot: true,
        before(app) {
            server = app;
            fs = compiler.outputFileSystem;
        }
    })
    .listen(8080);
}
console.log(resolve('public/manifest.json'));
server.get('/*', function(req, res) {
    manifest = manifest || fs.readFileSync(resolve('public/manifest.json'), 'utf-8');
    appTemplate = appTemplate || template(fs.readFileSync(resolve('public/app.html'), 'utf-8'), TEMPLATE_SETTINGS);
    let renderedAppString = '';
    if(USE_SSR) {
        renderedAppString = renderToString(<App/>);
        console.log(renderedAppString);
    }
    return res.send(appTemplate({manifest, renderedAppString}));
});
