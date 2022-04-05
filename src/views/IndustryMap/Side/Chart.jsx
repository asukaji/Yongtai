import VChart from 'vue-echarts';
import styles from './Chart.module.less';

import VueTypes from 'vue-types';
import { fetchVillageDetail } from '@/api';
import { formatOption } from './utils';

export default {
  name: 'Chart',

  props: {
    division: VueTypes.string.def('')
  },

  data() {
    return {
      value: null
    };
  },

  computed: {
    village() {
      return this.$route.params.village;
    },

    option() {
      return formatOption(this.division, this.value?.list);
    },

    title() {
      return this.value?.title;
    }
  },

  watch: {
    village: {
      immediate: true,
      async handler(village) {
        if (!village) {
          return;
        }

        this.value = await fetchVillageDetail(village, this.division);
      }
    }
  },

  render() {
    return (
      <div class={styles.chart}>
        <h4 class={styles.title}>{this.title}</h4>
        <VChart option={this.option} />
      </div>
    );
  }
};
