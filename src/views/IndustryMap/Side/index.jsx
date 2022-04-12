import Chart from './Chart';
import styles from '../index.module.less';

import { fetchStreetDetail } from '@/api';
import _ from 'lodash';

import { VILLAGE_NAME } from '../index';

import anli from '../../../assets/Icon/anli.png';
import guoshu from '../../../assets/Icon/guoshu.png';
import linye from '../../../assets/Icon/linye.png';
import nongye from '../../../assets/Icon/nongye.png';
import renkou from '../../../assets/Icon/renkou.png';
import rice from '../../../assets/Icon/rice.png';
import xiangcun from '../../../assets/Icon/xiangcun.png';
import daxiangcun from '../../../assets/Icon/daxiangcun.png';
import xiangzhen from '../../../assets/Icon/xiangzhen.png';

export default {
  name: 'Side',

  data() {
    return {
      state: { street: null, village: null },
    };
  },

  computed: {
    street() {
      return this.$route.params.street ?? VILLAGE_NAME;
    },

    village() {
      return this.$route.params.village;
    },

    showVillage() {
      return !!this.village;
    },

    titleName() {
      return this.value?.title;
    }
  },

  watch: {
    street: {
      immediate: true,

      async handler(street) {
        this.state.street = await fetchStreetDetail(street);
      }
    }
  },

  methods: {
    renderDash(title) {
      return <div class={styles.dash}>{this.village}{title}</div>;
    },

    renderMedia() {
      const { street } = this.state;

      return (
        <div class="media">
          {_.map(street?.media, ({ src, type }) =>
            type === 'image' ? (
              <img src={src} vViewer />
            ) : (
              <div to={src} class="video">
                <video controls="controls">
                  <source src={src} />
                </video>
              </div>
            )
          )}
        </div>
      );
    },

    renderStreet() {
      const { street } = this.state;
      return (
        <div class={styles.paragraph}>
          <h1>{this.street}</h1>

          <div align="left" class={styles.namet}>
            所获荣誉
          </div>
          <div class={styles.rongyus}>
            <div class={styles.rongyu}>
              <img class={styles.rongyuIcon} src={rice}></img>
              <span class={styles.rongyuText}>{street?.honors[0].honor}</span>
            </div>
            <div class={styles.rongyu}>
              <img class={styles.rongyuIcon} src={anli}></img>
              <span class={styles.rongyuText}>{street?.honors[1].honor}</span>
            </div>
            <div class={styles.rongyu}>
              <img class={styles.rongyuIcon} src={daxiangcun}></img>
              <span class={styles.rongyuText}>{street?.honors[2].honor}</span>
            </div>
          </div>

          <div align="left" class={styles.namet}>
            乡镇情况
          </div>
          <div>
            <div class={styles.xiangzhenList}>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={xiangzhen}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[0].num}
                    {street?.townSituations[0].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[0].name}
                  </div>
                </div>
              </div>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={xiangcun}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[1].num}
                    {street?.townSituations[1].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[1].name}
                  </div>
                </div>
              </div>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={renkou}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[2].num}
                    {street?.townSituations[2].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[2].name}
                  </div>
                </div>
              </div>
            </div>

            <div class={styles.xiangzhenList}>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={nongye}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[3].num}
                    {street?.townSituations[3].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[3].name}
                  </div>
                </div>
              </div>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={linye}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[4].num}
                    {street?.townSituations[4].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[4].name}
                  </div>
                </div>
              </div>
              <div class={styles.xiangzhen}>
                <div>
                  <img class={styles.xiangzhenIcon} src={guoshu}></img>
                </div>
                <div align="left">
                  <div class={styles.xiangzhenText}>
                    {street?.townSituations[5].num}
                    {street?.townSituations[5].unit}
                  </div>
                  <div class={styles.xiangzhenName}>
                    {street?.townSituations[5].name}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div align="left" class={styles.namet}>
            乡镇介绍
          </div>
          <div>
            <pre>{street?.content}</pre>
            {this.renderMedia()}
          </div>
        </div>
      );
    },

    renderVillage() {
      return (
        <div>
          {this.renderDash('人口资源')}
          <div class={styles.sideContainer}>
            <Chart division="div1" />
            <Chart division="div2" />
          </div>
          {this.renderDash('民生事业与自然资源')}
          <div class={styles.sideContainer}>
            <Chart division="div3" />
            <Chart division="div4" />
          </div>
          <div class={styles.sideContainer}>
            <Chart division="div5" />
            <Chart division="div6" />
          </div>
        </div>
      );
    }
  },

  render() {
    return (
      <div class={styles.side}>
        {this.showVillage ? this.renderVillage() : this.renderStreet()}
      </div>
    );
  }
};
