import click from '@/assets/About/click.png';

import Header from './Header';
import Introduce from './Introduce';
import Sidebar from './SideBar';

import { EFFECT_INDEX, PROPERTY, INDUSTRY_MAP } from '@/constants';


import styles from './index.module.less';


export default {
  name: 'About',

  methods: {
  },

  render() {
    return (
      <div class={styles.background}>
        <Header />
        <div class={styles.button}>
          <div class={styles.on}>
            <img src={click} class={styles.click}></img>
            <router-link to={{ name: INDUSTRY_MAP }}  class={styles.text}>乡村振兴</router-link>
          </div>
          <div class={styles.on}>
            <img src={click} class={styles.click}></img>
            <router-link to={{ name: PROPERTY }}  class={styles.text}>农村产权交易</router-link>
          </div>
          <div class={styles.on}>
            <img src={click} class={styles.click}></img>
            <router-link to={{ name: EFFECT_INDEX }} class={styles.text}>成效考评</router-link>
          </div>
          <div class={styles.on}>
            <img src={click} class={styles.click}></img>
            <router-link to={{ name: 'Home' }} class={styles.text}>其他重点工作</router-link>
          </div>
        </div>
        <div>
          <img src={'https://zhengxinyun.oss-cn-guangzhou.aliyuncs.com/xiangcun/icon/background/map.png'} class={styles.map}></img>
        </div>
        <div class={styles.foot}>
          {/* <Footer class={styles.footer}/> */}
          <Introduce class={styles.introduce}/>
        </div>
        <Sidebar />
      </div>
    );
  }
};
