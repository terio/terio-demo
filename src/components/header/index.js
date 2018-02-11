import {createVirtualNode, default as loki} from 'loki';
import styles from './index.scss';
console.log(styles);
export default class Header extends loki.Component {
    render() {
        return <div className={styles.header}>Header</div>;
    }
}
