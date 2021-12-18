import styles from './Header.module.less';

import IconBack from '@/assets/Icon/icon-back.png';

export default {
  name: 'Header',

  render() {
    return (
      <div class={styles.header}>
        <div class="img" onClick={() => this.$router.go(-1)}>
          <img src={IconBack} />
        </div>
      </div>
    );
  }
};
