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
              <div>
                <p>{this.wT}</p>
                <p>梧桐镇村资源</p>
              </div>
              <div>
                <p>{this.sK}</p>
                <p>嵩口镇村资源</p>
              </div>
            </div>
            <div>
              <div>
                <p>{this.gL}</p>
                <p>葛岭镇村资源</p>
              </div>
              <div>
                <p>{this.dY}</p>
                <p>大洋镇村资源</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <router-link to="/property/details/葛岭/2">葛岭镇村</router-link>
          <router-link to="/property/details/梧桐/2">梧桐镇村</router-link>
          <router-link to="/property/details/嵩口/2">嵩口镇村</router-link>
          <router-link to="/property/details/大洋/2">大洋镇村</router-link>
        </div>
      </div>
    );
  }
};
