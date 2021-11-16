import VueTypes from 'vue-types';
import styles from './FooterTabs.module.less';

import _ from 'lodash';

export default {
  name: 'FooterTabs',

  props: {
    tabs: VueTypes.array.def([])
  },

  computed: {
    activeName() {
      return this.$route.name;
    }
  },

  render() {
    return (
      <div class={styles.footer}>
        {_.isEmpty(this.tabs) ?
          this.$slots.default
          :_.map(this.tabs, ({ name, title, icon, activeIcon }) => (
            <router-link to={{ name }}>
              <div
                key={name}
                class={[
                  styles.tabItem,
                  this.activeName === name && styles.active
                ]}
              >
                <img src={this.activeName === name ? activeIcon : icon} />
                {title}
              </div>
            </router-link>
          ))}
      </div>
    );
  }
};
