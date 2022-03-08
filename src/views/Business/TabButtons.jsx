import {Tabs, TabPane } from 'element-ui';
import styles from './TabButtons.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'TabButtons',

  props: {
    tabs: VueTypes.array.def([])
  },

  computed: {
    activeKey() {
      return this.$route.name;
    }
  },

  methods: {
    beforeLeave(name) {
      this.$router.replace({ name });
    }
  },

  render() {
    return (
      <Tabs
        value={this.activeKey}
        beforeLeave={this.beforeLeave}
        class={styles.tabButtons}
      >
        {this.tabs.map(([name, label]) => (
          <TabPane key={name} name={name} label={label} />
        ))}
      </Tabs>
    );
  }
};