import {createVirtualNode, default as terio} from 'terio';
import Header from '../header';

export default class App extends terio.Component {
    constructor(...args) {
        super(...args);
        const counter = 0;
        this.state = {
            counter,
            showSomething: counter % 2,
            ar: []
        };
    }
    mounted() {
        this.interval = setInterval(() => {
            const counter = this.state.counter + 1;
            this.state.ar.push(counter);
            this.setState({
                counter,
                showSomething: counter % 2,
                ar: this.state.ar
            });
        }, 1000);
    }
    willUnmount() {
        clearInterval(this.interval);
    }
    handleClick() {
        console.log('yo', this);
    }
    render() {
        // {this.state.showSomething ? '' : (<terio.Fragment>
        //     <span>1</span>
        //     <span>2</span>
        //     </terio.Fragment>)}
        return (
            <div>
                {this.state.showSomething ? <span>something</span> : ''}
                <Header onclick={this.handleClick.bind(this)}>
                    Header is shown
                </Header>
                {this.state.ar.map(el => <p id={el}>{el}</p>)}
            </div>
        );
    }
}
