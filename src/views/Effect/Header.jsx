import styles from './Header.module.less';

import { INDUSTRY_MAP, BUSINESS, ECONOMY, PROJECT } from '@/constants';

import headerText from '../../assets/Effect/header-line.png';

// import { Button } from 'element-ui';

export default {
  name: 'Header',

  data() {
    return {
      active: 'gzcx',
    };
  },

  methods: {
    change(name) {
      this.active = name;
      this.$emit('change', name);
    },
  },

  render() {
    return (
      <div class={styles.tabs}>
        <div class={styles.texts}>
          {/* <Button
            icon="el-icon-arrow-left"
            style={{
              color: '#fff',
              position: 'absolute',
              left: '1px',
              backgroundColor: 'transparent',
              borderWidth: '0 !important'
            }}
            onClick={() => this.$router.replace('/')}
          >
            返回
          </Button> */}
          <router-link to={{ name: INDUSTRY_MAP }} class={styles.text}>
            乡村振兴
          </router-link>
          <span
            onclick={this.change.bind(this, 'gzcx')}
            class={[styles.text, this.active === 'gzcx' && styles.textActive]}
          >
            成效考评总览
          </span>
          <router-link to={{ name: BUSINESS }} class={styles.text}>
            招商管理
          </router-link>
          <router-link to={{ name: ECONOMY }} class={styles.text}>
            经济运行
          </router-link>
        </div>
        <div class={styles.center}>
          <img src={headerText} class={styles.left}></img>
          <h3 class={styles.title}>成效考评</h3>
          <img src={headerText} class={styles.right}></img>
        </div>
        <div class={styles.texts}>
          {/* <span
            onclick={this.change.bind(this, 'zbkh')}
            class={[styles.text, this.active === 'zbkh' && styles.textActive]}
          >
            乡镇指标考核
          </span> */}
          <router-link to={{ name: PROJECT }} class={styles.text}>
            重点项目打卡
          </router-link>
        </div>
      </div>
    );
  }
};
