import YtMap from '@/components/YtMap';
import { TourLayer } from '@/components/Map';

import styles from '../Home.module.less';

export default {
  name: 'Tour',

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <TourLayer />
        </YtMap>
      </div>
    );
  }
};
