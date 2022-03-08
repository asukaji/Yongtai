import { Switch } from 'element-ui';
import styles from './Switch.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'Switcher',

  props: {
    value: VueTypes.bool.def()
  },

  render() {
    return (
      <div class={styles.switch}>
        <Switch value={this.$props.value} />
      </div>
    );
  }
};
