import styles from './index.module.less';

import { fetchPropertyState } from '@/api';
import _ from 'lodash';

export default {
  name: 'Center',

  data() {
    return {
      value: null
    };
  },

  computed: {
    wT() {
      return _.find(this.value, ['townName', '梧桐'])?.num;
    },
    sK() {
      return _.find(this.value, ['townName', '嵩口'])?.num;
    },
    gL() {
      return _.find(this.value, ['townName', '葛岭'])?.num;
    },
    dY() {
      return _.find(this.value, ['townName', '大洋'])?.num;
    }
  },

  async mounted() {
    this.value = await fetchPropertyState();
  },

  render() {
    return (
      <div class={styles.center}>
        <div>
          <h2>集体和国有资产资源摸统计</h2>
          <div>
            <div>
              <router-link to="/property/details/梧桐/2">
                <p>{this.wT}</p>
                <p>梧桐镇村资源</p>
              </router-link>
              <router-link to="/property/details/嵩口/2">
                <p>{this.sK}</p>
                <p>嵩口镇村资源</p>
              </router-link>
            </div>
            <div>
              <router-link to="/property/details/葛岭/2">
                <p>{this.gL}</p>
                <p>葛岭镇村资源</p>
              </router-link>
              <router-link to="/property/details/大洋/2">
                <p>{this.dY}</p>
                <p>大洋镇村资源</p>
              </router-link>
            </div>
          </div>
        </div>
        <div>
          <router-link to="/property/details/葛岭/2">葛岭镇</router-link>
          <router-link to="/property/details/梧桐/2">梧桐镇</router-link>
          <router-link to="/property/details/嵩口/2">嵩口镇</router-link>
          <router-link to="/property/details/大洋/2">大洋镇</router-link>
        </div>
        <div>
          <router-link to="">丹云乡</router-link>
          <router-link to="">白云乡</router-link>
          <router-link to="">红星乡</router-link>
          <router-link to="">盘古乡</router-link>
          <router-link to="">霞拔乡</router-link>
          <router-link to="">东洋乡</router-link>
          <router-link to="">长庆镇</router-link>
          <router-link to="">盖洋乡</router-link>
          <router-link to="">洑口乡</router-link>
          <router-link to="">同安镇</router-link>
          <router-link to="">赤溪乡</router-link>
          <router-link to="">富泉乡</router-link>
          <router-link to="">樟城镇</router-link>
          <router-link to="">城峰镇</router-link>
          <router-link to="">岭路乡</router-link>
          <router-link to="">清凉镇</router-link>
          <router-link to="">塘前乡</router-link>
        </div>
      </div>
    );
  }
};
