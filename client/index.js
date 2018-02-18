import {createVirtualNode, default as loki} from 'loki';
import lokiDOM from 'loki/lib/dom';
import App from './components/app';

lokiDOM.mount(<App/>, document.getElementById('app'));
