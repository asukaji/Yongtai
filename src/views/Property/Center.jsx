import styles from './index.module.less';

import { fetchPropertyState, fetchPropertyStateHandel } from '@/api';
import _ from 'lodash';

import Wander from './Wander';

export default {
  name: 'Center',

  data() {
    return {
      value: null, 
      values: [],
      valuesed: [],
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

  async created() {
    this.values = await fetchPropertyStateHandel();
    this.valuesed = this.sortByKey(this.values, 'num');
  },

  async mounted() {
    this.value = await fetchPropertyState();
  },

  methods: {
    onClick(item) {
      // console.log('ddddd', item);
      window.location.href = `#/property/details/${item.townName}/2`;
    },
    sortByKey(array,key){
      return array.sort(function(a,b){
        var x = a[key];
        var y = b[key];
        return ((x<y) ? -1 :((x>y) ? 1:0));
      });
    }
  },

  render() {
    return (
      <div class={styles.center}>
        <h4 style={{ color: '#fff' }}>全县各类资产在册情况</h4>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div style={{ display: 'flex' }}>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/林业资源/3`;}}>林业资源</div>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/国有资产资源/3`;}}>国有资产资源</div>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/村集体资产/3`;}}>村集体资产</div>
          </div>
          <div style={{ display: 'flex' }}>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/农业资源/3`;}}>农业资源</div>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/水域使用权/3`;}}>水域使用权</div>
            <div class={styles.buttom} onClick={() => {window.location.href = `#/property/details/旅游资源/3`;}}>旅游资源</div>
          </div>
        </div>
        <div style={{ height: '65%' }}>
          <Wander values={this.valuesed} onChange={this.onClick.bind(this)} />
        </div>
        {/* <div>
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
          </div> */}
        {/* <div>
          <div>
            <router-link to="/property/details/葛岭/2">葛岭镇</router-link>
            <router-link to="/property/details/梧桐/2">梧桐镇</router-link>
            <router-link to="/property/details/嵩口/2">嵩口镇</router-link>
            <router-link to="/property/details/大洋/2">大洋镇</router-link>
          </div>
          <div>
            <router-link to="/property/details/丹云/2">丹云乡</router-link>
            <router-link to="/property/details/白云/2">白云乡</router-link>
            <router-link to="/property/details/红星/2">红星乡</router-link>
            <router-link to="/property/details/盘谷/2">盘谷乡</router-link>
            <router-link to="/property/details/霞拔/2">霞拔乡</router-link>
            <router-link to="/property/details/东洋/2">东洋乡</router-link>
            <router-link to="/property/details/长庆/2">长庆镇</router-link>
            <router-link to="/property/details/盖洋/2">盖洋乡</router-link>
            <router-link to="/property/details/洑口/2">洑口乡</router-link>
            <router-link to="/property/details/同安/2">同安镇</router-link>
            <router-link to="/property/details/赤锡/2">赤锡乡</router-link>
            <router-link to="/property/details/富泉/2">富泉乡</router-link>
            <router-link to="/property/details/樟城/2">樟城镇</router-link>
            <router-link to="/property/details/城峰/2">城峰镇</router-link>
            <router-link to="/property/details/岭路/2">岭路乡</router-link>
            <router-link to="/property/details/清凉/2">清凉镇</router-link>
            <router-link to="/property/details/塘前/2">塘前乡</router-link>
          </div>
        </div> */}
      </div>
    );
  }
};
