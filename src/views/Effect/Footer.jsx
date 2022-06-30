import {
  fetchPromoteProfile as beautyVallage,
  fetchProvinceProfile
} from '@/api';

import _ from 'lodash';
import moment from 'moment';

import styles from './Footer.module.less';

import { DatePicker, Select, Option} from 'element-ui';

import Page from './Page';
import Echats from './Echats';

import arrows from '../../assets/Effect/jiantou.png';

export default {
  name: 'EffectFooter',

  data() {
    return {
      type: 'all', // foo, bar, baz, beautyVallage
      active: 'area', // area, type
      list: {
        area: [],
        type: []
      },
      dates: '2022',
      time: [
        {
          value: 'all',
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
        }
      ]
    };
  },

  watch: {
    async type() {
      this.list = await this.getList();
    },
    async list() {
      this.value = -1;
    },
    dates: {
      immediate: true,
      handler(dates) {
        console.log('aaaa',dates);
        this.$emit('date', dates);
      }
    }
  },

  created() {
    this.init();
  },

  methods: {
    getList() {
      switch (this.type) {
        case 'all':
          return fetchProvinceProfile('all', this.dates);
        case 'project_city':
          return fetchProvinceProfile('project_city', this.dates);
        case 'project_sfz':
          return fetchProvinceProfile('project_sfz', this.dates);
        case 'project_szx':
          return fetchProvinceProfile('project_szx', this.dates);
        case 'beautyVallage':
          return beautyVallage();
      }
    },

    async init() {
      _.assign(this.list, await this.getList());
    },

    setType(value) {
      this.type = value;
      //一级按钮点击事件
      this.$emit('type');
    },

    setActive(value) {
      this.active = value;
      //二级按钮点击事件
      this.$emit('active');
    },

    handleItemChange(item) {
      this.$emit('change', {
        code: item.nameCode,
        type: this.active,
        projectClass: this.type,
        treeCard: item.treeCard,
        datetime: this.dates
      });
    },

    handlePageChange(item) {
      this.$emit('click', {
        code: item.nameCode,
        type: this.active,
        projectClass: this.type,
        treeCard: item.treeCard,
        datetime: this.dates
      });
    },

    setDate(item) {
      // const date = moment(item).format('YYYY');
      this.dates = item;
      console.log('???',item);
      this.$emit('date', item);
      this.getList();
      this.init();
    }
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.header}>
          <div class={styles.title}>
            <img src={arrows} class={styles.arrows}></img>
            乡村振兴项目
          </div>
          <div class={styles.options}>
            <p
              class={[styles.option, this.type === 'all' && styles.chunk]}
              onClick={this.setType.bind(this, 'all')}
            >
              全部
            </p>
            <p
              class={[
                styles.option,
                this.type === 'project_szx' && styles.chunk
              ]}
              onClick={this.setType.bind(this, 'project_szx')}
            >
              省专项
            </p>
            <p
              class={[
                styles.option,
                this.type === 'project_sfz' && styles.chunk
              ]}
              onClick={this.setType.bind(this, 'project_sfz')}
            >
              省非专项
            </p>
            <p
              class={[
                styles.option,
                this.type === 'project_city' && styles.chunk
              ]}
              onClick={this.setType.bind(this, 'project_city')}
            >
              市项目
            </p>
            <p
              class={[
                styles.option,
                this.type === 'beautyVallage' && styles.chunk
              ]}
              onClick={this.setType.bind(this, 'beautyVallage')}
            >
              美丽乡村
            </p>
          </div>
        </div>
        <div class={styles.secondOptions}>
          <div style={{ display: 'flex' }}>
            <p
              class={[
                styles.secondOption,
                this.active === 'area' && [styles.line]
              ]}
              onClick={this.setActive.bind(this, 'area')}
            >
              按照地区查询
            </p>
            <p
              class={[
                styles.secondOption,
                this.active === 'type' && [styles.line]
              ]}
              onClick={this.setActive.bind(this, 'type')}
            >
              按照项目分类查询
            </p>
          </div>
          {/* <DatePicker
            type="year"
            placeholder="选择年份"
            vModel={this.dates}
            onChange={this.setDate.bind(this)}
          /> */}
          <Select
            style={{
              width: '120px'
            }}
            placeholder="请选择年份"
            vModel={this.dates}
            size="mini"
            onChange={this.setDate.bind(this)}
          >
            {this.time.map(({ value, label }) => (
              <Option value={value} label={label} />
            ))}
          </Select>
        </div>
        {/* page */}
        {this.active === 'type' && (
          <div class={styles.page}>
            <Page
              list={this.list[this.active]}
              onClick={this.handlePageChange.bind(this)}
              change={this.type}
              changes={this.active}
            />
          </div>
        )}
        {this.active === 'area' && (
          <Echats
            list={this.list[this.active]}
            projectClass={this.type}
            onClick={this.handleItemChange.bind(this)}
            change={this.type}
            changes={this.active}
          />
        )}
      </div>
    );
  }
};
