import {
  fetchPromoteProfile as beautyVallage,
  fetchProvinceProfile
} from '@/api';

import _ from 'lodash';

import styles from './Footer.module.less';

import Page from './Page';

import arrows from '../../assets/Effect/jiantou.png';

export default {
  name: 'EffectFooter',

  data() {
    return {
      type: 'beautyVallage', // foo, bar, baz, beautyVallage
      active: 'area', // area, type
      list: {
        area: [],
        type: []
      }
    };
  },

  watch: {
    async type() {
      this.list = await this.getList();
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
    },
    setActive(value) {
      this.active = value;
    },
    handleItemChange(item) {
      this.$emit('change', { code: item.nameCode, type: this.active, projectClass: this.type });
    },
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
              class={[styles.option, this.type === 'project_szx' && styles.chunk]}
              onClick={this.setType.bind(this, 'project_szx')}
            >
              省专项
            </p>
            <p
              class={[styles.option, this.type === 'project_sfz' && styles.chunk]}
              onClick={this.setType.bind(this, 'project_sfz')}
            >
              省非专项
            </p>
            <p
              class={[styles.option, this.type === 'project_city' && styles.chunk]}
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
        {/* page */}
        <div class={styles.page}>
          <Page
            list={this.list[this.active]}
            onClick={this.handleItemChange.bind(this)}
          />
        </div>
      </div>
    );
  }
};
