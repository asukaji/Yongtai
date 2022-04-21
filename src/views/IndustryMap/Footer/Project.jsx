import { Tabs, TabPane } from 'element-ui';
import styles from '../index.module.less';

import VueTypes from 'vue-types';
import _ from 'lodash';
import { fetchWorkData } from '@/api';
import moment from 'moment';
import { DatePicker } from 'element-ui';

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
        activeKey: '',
        projects: []
      },
      states: {
        date: '2022'
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
          this.village ?? this.street ?? '一镇一品',
          this.type,
          key,
          this.states.date
        );
        this.state.projects = result.project;
      }
    },

    village: {
      immediate: true,

      async handler(village) {
        if (!village && !this.street) {
          return;
        }

        const result = await fetchWorkData(
          village ?? this.street,
          this.type,
          this.state.activeKey,
          this.states.date
        );
        this.state.projects = result.project;
      }
    }
  },

  created() {
    this.state.activeKey = 'project_szx';
  },

  methods: {
    handleClick(item) {
      this.$emit('click', item);
    },
    renderProjects() {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflow: 'scroll',
            height: '130px',
            width: '436px',
            marginTop: '10px'
          }}
        >
          {_.map(
            _.isEmpty(this.state.projects) ? this.value : this.state.projects,
            (item) => (
              <div
                key={this.state.projects.nameCode}
                onClick={() => this.handleClick.call(this, item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#DBDB8A',
                  width: '130px',
                  // flex: '128px',
                  fontSize: '12px',
                  height: '64px',
                  minWidth: '128px',
                  marginTop: '5px',
                  marginRight: '8px',
                  cursor: 'pointer'
                }}
              >
                {item.name}
              </div>
            )
          )}
        </div>
      );
    },

    async setDate(item) {
      const date = moment(item).format('YYYY');
      this.states.date = date;
      const result = await fetchWorkData(
        this.village ?? this.street ?? '一镇一品',
        this.type,
        this.state.activeKey,
        this.states.date
      );
      this.state.projects = result.project;

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
        <DatePicker
          style={{
            marginTop: '10px',
            transform: 'translateX(50%)'
          }}
          type="year"
          placeholder="选择年份"
          vModel={this.states.date}
          onChange={this.setDate.bind(this)}
        />
        {this.renderProjects()}
      </div>
    );
  }
};
