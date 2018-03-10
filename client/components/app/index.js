import {createVirtualNode, default as terio} from 'terio';
import Header from '../header';

export default class App extends terio.Component {
    constructor(...args) {
        super(...args);
        const counter = 0;
        this.state = {
            counter,
            showSomething: counter % 2
        };
    }
    mounted() {
        this.interval = setInterval(() => {
            const counter = this.state.counter + 1;
            this.setState({
                counter,
                showSomething: counter % 2
            });
        }, 1000);
    }
    willUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <div>
                {this.state.showSomething ? '' : <Header>
                    Header is shown
                </Header>}
                {this.state.showSomething ? <span>something</span> : ''}
            </div>
        );
    }
}
