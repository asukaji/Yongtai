import { Tabs, TabPane } from 'element-ui';
import styles from '../index.module.less';

import VueTypes from 'vue-types';
import _ from 'lodash';
import { fetchWorkData } from '@/api';
import moment from 'moment';
import { DatePicker, Select, Option } from 'element-ui';

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
      },
      time: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '2019',
          label: '2019'
        },
        {
          value: '2020',
          label: '2020'
        },
        {
          value: '2021',
          label: '2021'
        },
        {
          value: '2022',
          label: '2022'
        },
        {
          value: '2023',
          label: '2023'
        },
      ]
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
      if(this.states.date === '2022') {
        this.$emit('click', item);
        this.$emit('active', this.state.activeKey);
      }
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
            width: '100%',
            marginTop: '20px',
          }}
          class={styles.scorll}
        >
          {_.map(
            this.state.projects,
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
      // const date = moment(item).format('YYYY');
      this.states.date = item;
      const result = await fetchWorkData(
        this.village ?? this.street ?? '一镇一品',
        this.type,
        this.state.activeKey,
        this.states.date
      );
      this.state.projects = result.project;
      const activeKey = this.state.activeKey;
      this.$emit('date',{item,activeKey});
    }
  },

  render() {
    return (
      <div class={styles.footerItem}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {/* <h4>乡村振兴项目</h4> */}
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
        </div>
        <div align="right" style={{ marginRight: '10px', marginTop: '-5px' }}>
          {/* <span style={{ color: '#fff', fontSize: '10px' }}>选择年份：</span> */}
          {/* <DatePicker
            style={{
              marginTop: '10px',
              width: '100px'
            }}
            type="year"
            placeholder="选择年份"
            vModel={this.states.date}
            onChange={this.setDate.bind(this)}
          /> */}
          <Select
            style={{
              marginTop: '10px',
              width: '120px'
            }}
            placeholder="请选择年份"
            vModel={this.states.date}
            size="mini"
            onChange={this.setDate.bind(this)}
          >
            {this.time.map(({ value, label }) => (
              <Option value={value} label={label} />
            ))}
          </Select>
        </div>
        {this.renderProjects()}
      </div>
    );
  }
};
