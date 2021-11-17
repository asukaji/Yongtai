import iconFile from '@/assets/Icon/icon-file.png';
import styles from './Float.module.less';

export default {
  name: 'Float',

  render() {
    return <div class={styles.float} onClick={this.$emit.bind(this, 'click')}>
      <img src={iconFile} />
      概况
    </div>;
  }
};