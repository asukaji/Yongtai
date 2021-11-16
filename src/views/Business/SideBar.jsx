import { Tabs, TabPane } from 'element-ui';

import { businessRoutes } from '@/constants';

export default {
  name: 'BusinessSideBar',

  computed: {
    activeKey() {
      return this.$route.name;
    }
  },

  methods: {
    beforeLeave(name) {
      this.$router.push({ name });
    }
  },

  render() {
    return (
      <Tabs
        tabPosition="left"
        value={this.activeKey}
        beforeLeave={this.beforeLeave}
      >
        {businessRoutes.map(([name, label]) => (
          <TabPane key={name} name={name} label={label} />
        ))}
      </Tabs>
    );
  }
};
