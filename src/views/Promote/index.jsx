import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';
import { FooterTabs } from '@/components/Custom';
import { Tabs, TabPane } from 'element-ui';
import Header from '../Header';
import ChartsDrawer from '../Tour/ChartsDrawer';
import DrawerContainer from './DrawerContainer';
import styles from './index.module.less';

import { PROMOTE_INDEX, PROMOTE_VILLAGE } from '@/constants';

export default {
  name: 'Promote',

  data() {
    return {
      activeArea: undefined
    };
  },

  provide() {
    return {
      map: this
    };
  },

  computed: {
    activeKey() {
      const [pathName, tabName] = this.$route.name.split('.');
      return [pathName, tabName].join('.');
    }
  },

  methods: {
    onClick(area) {
      this.activeArea = area;
    },

    beforeLeave(name) {
      this.$router.replace({ name });
    },

    renderFooter() {
      return (
        <div class={styles.tabs}>
          <Tabs value={this.activeKey} beforeLeave={this.beforeLeave}>
            <TabPane
              key={PROMOTE_INDEX}
              name={PROMOTE_INDEX}
              label="乡村振兴"
            />
            <TabPane
              key={PROMOTE_VILLAGE}
              name={PROMOTE_VILLAGE}
              label="美丽乡村建设"
            />
          </Tabs>
        </div>
      );
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header>
          {this.activeKey === PROMOTE_VILLAGE ? (
            <ChartsDrawer styles={{ width: '30%' }} visible={true}>
              <DrawerContainer onClick={this.onClick} />
            </ChartsDrawer>
          ) : null}
        </Header>
        <YtMap>
          <StreetsPolygon />
          <router-view></router-view>
          <FooterTabs>{this.renderFooter()}</FooterTabs>
        </YtMap>
      </div>
    );
  }
};
