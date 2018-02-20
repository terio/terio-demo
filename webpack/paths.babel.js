import {resolve} from 'path';

const BUILD_DIRECTORY = resolve('build');

export default {
    CLIENT_BUILD: resolve(BUILD_DIRECTORY, 'client'),
    SERVER_BUILD: resolve(BUILD_DIRECTORY, 'server'),
    CLIENT_ENTRY: resolve('client', 'index'),
    SERVER_ENTRY: resolve('server', 'index')
};
