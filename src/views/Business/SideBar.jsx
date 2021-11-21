import { Tabs, TabPane } from 'element-ui';
import styles from './SideBar.module.less';

import { businessRoutes } from '@/constants';

export default {
  name: 'BusinessSideBar',

  computed: {
    activeKey() {
      const [pathName, tabName] = this.$route.name.split('.');
      return [pathName, tabName].join('.');
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
        tabPosition="left"
        value={this.activeKey}
        beforeLeave={this.beforeLeave}
        class={styles.sideBar}
      >
        {businessRoutes.map(([name, label]) => (
          <TabPane key={name} name={name} label={label} />
        ))}
      </Tabs>
    );
  }
};
