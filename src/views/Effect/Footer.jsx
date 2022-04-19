import {
  fetchPromoteProfile as beautyVallage,
  fetchProvinceProfile
} from '@/api';

import _ from 'lodash';

import styles from './Footer.module.less';

import { DatePicker } from 'element-ui';

// import Page from './Page';
import Echats from './Echats';

import arrows from '../../assets/Effect/jiantou.png';

export default {
  name: 'EffectFooter',

  data() {
    return {
      type: 'project_szx', // foo, bar, baz, beautyVallage
      active: 'area', // area, type
      list: {
        area: [],
        type: []
      },
      state: {
        date: [],
        id: undefined,
        title: ''
      }
    };
  },

  watch: {
    async type() {
      this.list = await this.getList();
      // console.log('cardtype',this.type);
    },
    async list() {
      this.value = -1;
    }
  },

  created() {
    this.init();
  },

  methods: {
    getList() {
      switch (this.type) {
        case 'project_city':
          return fetchProvinceProfile('project_city');
        case 'project_sfz':
          return fetchProvinceProfile('project_sfz');
        case 'project_szx':
          return fetchProvinceProfile('project_szx');
        case 'beautyVallage':
          return beautyVallage();
      }
    },
    async init() {
      _.assign(this.list, await this.getList());
    },
    setType(value) {
      this.type = value;
      console.log('cardtype', this.list);
    },
    setActive(value) {
      this.active = value;
    },
    handleItemChange(item) {
      this.$emit('change', {
        code: item.nameCode,
        type: this.active,
        projectClass: this.type,
        treeCard:item.treeCard,
      });
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
          <div>
            <p
              class={[
                styles.secondOption,
                this.active === 'area' && [styles.line]
              ]}
              onClick={this.setActive.bind(this, 'area')}
            >
              按照地区查询
            </p>
            {/* <p
            class={[
              styles.secondOption,
              this.active === 'type' && [styles.line]
            ]}
            onClick={this.setActive.bind(this, 'type')}
          >
            按照项目分类查询
          </p> */}
          </div>
          <DatePicker
            type="year"
            placeholder="选择年"
            vModel={this.state.date}
          />
        </div>
        {/* page */}
        <div class={styles.page}>
          {/* <Page
            list={this.list[this.active]}
            onClick={this.handleItemChange.bind(this)}
            change={this.type}
            changes={this.active}
          /> */}
        </div>
        <Echats
          list={this.list[this.active]}
          projectClass={this.type}
          onClick={this.handleItemChange.bind(this)}
          change={this.type}
          changes={this.active}
        />
      </div>
    );
  }
};
