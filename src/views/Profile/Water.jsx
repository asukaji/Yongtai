import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import styles from '../Home.module.less';

import { fetchWaterList, fetchWaterDetail } from '@/api';

export default {
  name: 'Water',

  data() {
    return {
      water: undefined
    };
  },

  async mounted() {
    this.water = await fetchWaterList();
    fetchWaterDetail(this.water?.[0]?.id);
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <Mask />
        </YtMap>
      </div>
    );
  }
};
