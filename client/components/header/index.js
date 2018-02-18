import {createVirtualNode, default as loki} from 'loki';
import styles from './index.scss';

export default class Header extends loki.Component {
    handleClick() {
        // console.log('uyo');
    }
    render() {
        return <header class={styles.header} onclick={this.handleClick.bind(this)} style={{
            'font-weight': 'bold',
            'font-style': 'italic'
        }}>Headers</header>;
    }
}
