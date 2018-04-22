import {createVirtualNode, default as terio} from 'terio';
import styles from './index.scss';

const colors = ['red', 'blue'];
export default class Header extends terio.Component {
    constructor(...args) {
        super(...args);
        const counter = 0;
        this.state = {
            counter,
            color: colors[counter % colors.length]
        };
    }
    mounted() {
        console.log('in1')
        this.interval = setInterval(() => {
            const counter = this.state.counter + 1;
            this.setState({
                counter,
                color: colors[counter % colors.length]
            });
        }, 1000);
    }
    willUnmount() {
        console.log('in2')
        clearInterval(this.interval);
    }
    handleClick(){}
    render() {
        return <header class={styles.header} onclick={this.handleClick.bind(this)} style={{
            'font-weight': 'bold',
            'font-style': 'italic',
            'color': this.state.color
        }}>{this.children} and Counter is: {this.state.counter}</header>;
    }
}
