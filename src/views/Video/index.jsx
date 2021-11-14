import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';

import styles from '../Home.module.less';

export default {
  name: 'Traffic',

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <StreetsPolygon />
        </YtMap>
      </div>
    );
  }
};
