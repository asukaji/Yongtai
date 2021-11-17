import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import styles from '../Home.module.less';

import { fetchGeothermalList, fetchGeothermalDetail } from '@/api';

export default {
  name: 'Geothermal',

  data() {
    return {
      geothermal: undefined
    };
  },

  async mounted() {
    this.geothermal = await fetchGeothermalList();
    fetchGeothermalDetail(this.geothermal?.[0]?.id);
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
