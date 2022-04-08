import Chart from './Chart';
import styles from '../index.module.less';

import { fetchStreetDetail } from '@/api';
import _ from 'lodash';

import { VILLAGE_NAME } from '../index';

export default {
  name: 'Side',

  data() {
    return {
      state: { street: null, village: null }
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
      return <div class={styles.dash}>{title}</div>;
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
          
          <pre>{street?.content}</pre>
          {this.renderMedia()}
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
