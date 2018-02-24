import {createVirtualNode, default as loki} from 'loki';
import Header from '../header';

export default class App extends loki.Component {
    constructor(...args) {
        super(...args);
        const counter = 0;
        this.state = {
            counter,
            showHeader: counter % 2
        };
    }
    mounted() {
        this.interval = setInterval(() => {
            const counter = this.state.counter + 1;
            this.setState({
                counter,
                showHeader: counter % 2
            });
        }, 10);
    }
    willUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div>
                {this.state.showHeader ? (<Header>
                    Header is shown
                </Header>) : 'Header is hidden'}
            </div>
        );
    }
}
