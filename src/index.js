import {createVirtualNode, default as loki} from 'loki'
import lokiDOM from 'loki/src/dom'

class B extends loki.Component {}
// const a = new b;
console.log(<B src="abcd"/>)

lokiDOM.mount(<B src="abcd"/>, document.getElementById('app'));
