import {createVirtualNode, default as terio} from 'terio';
import terioDOM from 'terio/lib/dom';
import App from './components/app';

terioDOM.mount(<App/>, document.getElementById('app'));
