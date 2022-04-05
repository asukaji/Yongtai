import { Button, Tabs, TabPane } from 'element-ui';
import styles from './index.module.less';

import line from '../../assets/Effect/header-line.png';

import _ from 'lodash';

import {
  INDUSTRY_MAP,
  INDUSTRY_MAP_PROFILE,
  INDUSTRY_MAP_NATURAL,
  INDUSTRY_MAP_NATIVE
} from '@/constants';

export default {
  name: 'Header',

  computed: {
    activeKey() {
      const activeKey = _.last(this.$route.path?.split('/'));
      return `${INDUSTRY_MAP}.${activeKey}`;
    }
  },

  methods: {
    beforeLeave(name) {
      const { street, village } = this.$route.params;

      this.$router.replace(
        `/${INDUSTRY_MAP}${street ? `/${street}` : ''}${
          village ? `/${village}` : ''
        }/${_.last(name.split('.'))}`
      );
    },

    renderTabs() {
      return (
        <div class={[styles.tabs, styles.tabsHeader]}>
          <Tabs value={this.activeKey} beforeLeave={this.beforeLeave}>
            <TabPane
              key={INDUSTRY_MAP_PROFILE}
              name={INDUSTRY_MAP_PROFILE}
              label="乡镇资源总览"
            />
            <TabPane
              key={INDUSTRY_MAP_NATURAL}
              name={INDUSTRY_MAP_NATURAL}
              label="自然资源"
            />
            <TabPane
              key={INDUSTRY_MAP_NATIVE}
              name={INDUSTRY_MAP_NATIVE}
              label="特色产业"
            />
          </Tabs>
        </div>
      );
    }
  },

  render() {
    return (
      <div class={styles.header}>
        <Button
          icon="el-icon-arrow-left"
          style={{
            color: '#fff',
            position: 'absolute',
            left: '12px',
            bottom: '0',
            backgroundColor: 'transparent',
            borderWidth: '0 !important'
          }}
          onClick={() => this.$router.replace('/')}
        >
          返回
        </Button>
        {this.renderTabs()}
        <img src={line} class={styles.line1}></img>
        <span
          style={{
            color: '#ffffff',
            fontWeight: 'bold'
          }}
        >
          永泰县产业地图
        </span>
        <img src={line} class={styles.line2}></img>
        <router-link
          to="/project"
          style={{
            position: 'absolute',
            right: '25%',
            fontSize: '13px',
            color: '#fff',
            textDecoration: 'none',
            zIndex: 2
          }}
        >
          重点项目
        </router-link>
      </div>
    );
  }
};
