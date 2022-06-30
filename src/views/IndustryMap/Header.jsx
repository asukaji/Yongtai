import { Button, Tabs, TabPane, Dropdown, DropdownMenu, DropdownItem } from 'element-ui';
import styles from './index.module.less';

import line from '../../assets/Effect/header-line.png';

import _ from 'lodash';

import { surveyProject } from '@/api';

import {
  INDUSTRY_MAP,
  INDUSTRY_MAP_PROFILE,
  INDUSTRY_MAP_NATURAL,
  INDUSTRY_MAP_NATIVE
} from '@/constants';

export default {
  name: 'Header',

  data() {
    return {
      survey: {},
      state: null
    };
  },

  computed: {
    activeKey() {
      const activeKey = _.last(this.$route.path?.split('/'));
      return `${INDUSTRY_MAP}.${activeKey}`;
    }
  },

  methods: {
    beforeLeave(name) {
      this.$emit('tabs', false);
      const { street, village } = this.$route.params;
      // this.$emit('change');

      this.$router.replace(
        `/${INDUSTRY_MAP}${street ? `/${street}` : ''}${
          village ? `/${village}` : ''
        }/${_.last(name.split('.'))}`
      );

      if (name.split('.')[1] === 'natural' || name.split('.')[1] === 'native') {
        this.$emit('change', false);
      } else {
        this.$emit('change', true);
      }
    },

    renderTabs() {
      return (
        <div
          class={[styles.tabs, styles.tabsHeader]}
          style={{ fontSize: '12px' }}
        >
          <Tabs
            value={this.activeKey}
            beforeLeave={this.beforeLeave}
          >
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
    },

    async handelSurveyProject(command) {
      this.survey = await surveyProject(command);
      this.$emit('click', this.survey);
    },
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
        <div style={{ width: '30%' }}>{this.renderTabs()}</div>

        <div>
          <img src={line} class={styles.line1}></img>
          <span
            style={{
              color: '#ffffff',
              fontWeight: 'bold'
            }}
          >
            乡村振兴
          </span>
          <img src={line} class={styles.line2}></img>
        </div>

        <div
          style={{
            width: '30%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Dropdown trigger="click" onCommand={this.handelSurveyProject}>
            <span
              style={{
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                bottom: '0',
                backgroundColor: 'transparent',
                borderWidth: '0 !important'
              }}
            >
              乡村振兴概况
            </span>
            <DropdownMenu slot="dropdown">
              <DropdownItem command="产业振兴">产业振兴</DropdownItem>
              <DropdownItem command="人才振兴">人才振兴</DropdownItem>
              <DropdownItem command="生态振兴">生态振兴</DropdownItem>
              <DropdownItem command="文化振兴">文化振兴</DropdownItem>
              <DropdownItem command="组织振兴">组织振兴</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <router-link
            to="/project"
            style={{
              fontSize: '12px',
              color: '#fff',
              marginLeft: '40px',
              textDecoration: 'none',
              zIndex: 2
            }}
          >
            重点项目
          </router-link>
        </div>
      </div>
    );
  }
};
