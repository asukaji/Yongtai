

import styles from './Static.module.less';

export default {
  name: 'Static',

  render() {
    return <div class={styles.paragraph}>{this.$slots.default}</div>;
  }
};
