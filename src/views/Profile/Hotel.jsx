import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import styles from '../Home.module.less';

import { fetchTownList, fetchTownDetail } from '@/api';

export default {
  name: 'Hotel',

  data() {
    return {
      hotels: undefined
    };
  },

  async mounted() {
    this.hotels = await fetchTownList();
    fetchTownDetail(this.hotels?.[0]?.id);
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
