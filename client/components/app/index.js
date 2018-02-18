import {createVirtualNode, default as loki} from 'loki';
import Header from '../header';

export default class App extends loki.Component {
    render() {
        return (
            <div>
                <Header/>
            </div>
        );
    }
}
