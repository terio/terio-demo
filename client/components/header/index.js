import {createVirtualNode, default as loki} from 'loki';
import styles from './index.scss';

export default class Header extends loki.Component {
    constructor(...args) {
        super(...args);
        const colors = ['red', 'blue'];
        const counter = 0;
        this.state = {
            counter,
            color: colors[counter % colors.length]
        };
        setInterval(() => {
            const counter = this.state.counter + 1;
            this.setState({
                counter,
                color: colors[counter % colors.length]
            });
        }, 1000);
    }
    handleClick() {
        // console.log('uyo');
    }
    render() {
        return <header class={styles.header} onclick={this.handleClick.bind(this)} style={{
            'font-weight': 'bold',
            'font-style': 'italic',
            'color': this.state.color
        }}>{this.children} and Counter is: {this.state.counter}</header>;
    }
}
