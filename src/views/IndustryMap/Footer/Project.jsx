import { Tabs, TabPane } from 'element-ui';
import styles from '../index.module.less';

import VueTypes from 'vue-types';
import _ from 'lodash';
import { fetchWorkData } from '@/api';

const TABS = [
  { label: '省专项', name: 'project_szx' },
  { label: '省非专项', name: 'project_sfz' },
  { label: '市项目', name: 'project_city' },
  { label: '美丽乡村', name: 'project_mlxc' }
];

export default {
  name: 'Project',

  props: {
    value: VueTypes.array.def([])
  },

  data() {
    return {
      state: {
        activeKey: 'project_szx',
        projects: []
      }
    };
  },

  computed: {
    street() {
      return this.$route.params.street;
    },

    village() {
      return this.$route.params.village;
    },

    type() {
      return this.village ? 'village' : 'town';
    }
  },

  watch: {
    'state.activeKey': {
      async handler(key) {
        const result = await fetchWorkData(
          this.village ?? this.street,
          this.type,
          key
        );
        this.state.projects = result.project;
      }
    },

    village: {
      immediate: true,

      async handler(village) {
        if (!village) {
          return;
        }
        const result = await fetchWorkData(
          village,
          this.type,
          this.state.activeKey
        );
        this.state.projects = result.project;
      }
    }
  },

  methods: {
    renderProjects() {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'auto',
            width: '436px',
            marginTop: '48px'
          }}
        >
          {_.map(
            _.isEmpty(this.state.projects) ? this.value : this.state.projects,
            ({ name }) => (
              <div
                key={name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#DBDB8A',
                  flex: '128px',
                  fontSize: '12px',
                  height: '64px',
                  minWidth: '128px',
                  marginRight: '8px'
                }}
              >
                {name}
              </div>
            )
          )}
        </div>
      );
    }
  },

  render() {
    return (
      <div class={styles.footerItem}>
        <h4>乡村振兴项目</h4>
        <Tabs
          tabPosition="bottom"
          vModel={this.state.activeKey}
          class={styles.tabs}
        >
          {_.map(TABS, ({ name, label }) => (
            <TabPane key={name} name={name}>
              <div slot="label">
                <p>{label}</p>
              </div>
            </TabPane>
          ))}
        </Tabs>
        {this.renderProjects()}
      </div>
    );
  }
};
