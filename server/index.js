import {renderToString} from 'loki/lib/dom/server';
import loki from 'loki';
import App from '../client/components/app';
import {IS_PROD, USE_SSR} from '../shared/constants/app';
import webpack from 'webpack';
import {resolve} from 'path';
import appTemplate from './templates/app';
import Koa from 'koa';
import middleware from 'koa-webpack';
import devWebpackConfig from '../webpack/dev/webpack.config.client.js';

const app = new Koa;

const EXTENSION_REGEX = /\.([a-z]+)$/;

function statsToAssets(stats) {
    return Object.entries(stats.assetsByChunkName)
        .reduce((assets, [key, value]) => {
            value = Array.isArray(value) ? value : [value];
            assets[key] = assets[key] || {};
            for(const fileName of value) {
                const extension = EXTENSION_REGEX.exec(fileName);
                if(extension) {
                    assets[key][extension[1]] = assets[key][extension[1]] || [];
                    assets[key][extension[1]].push(fileName);
                }
            }
            return assets;
        }, {});
}
if(IS_PROD) {
    const stats = require('../public/stats.json');
    const assets = statsToAssets(stats);
    app.use(async (ctx, next) => {
        ctx.state.assets = assets;
        console.log(ctx.state.assets)
        next();
    });
} else {
    const compiler = webpack(devWebpackConfig);
    app.use(middleware({
        compiler: compiler,
        dev: devWebpackConfig.devServer
    }));
    app.use(async (ctx, next) => {
        ctx.state.assets = statsToAssets(ctx.state.webpackStats.toJson());
        console.log(ctx.state.assets)
        next();
    });
}
app.use(async ctx => {
    console.log('in')
    ctx.body = appTemplate({
        renderedAppString: renderToString(<App/>),
        assets: ctx.state.assets
    });
});
app.listen(8080);
