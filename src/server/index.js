import {renderToString} from 'loki/lib/dom/server';
import loki from 'loki';
import App from '../components/app';

console.log(renderToString(<App/>), 'yo');
