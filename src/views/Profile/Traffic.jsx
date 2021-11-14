import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';

import styles from '../Home.module.less';

export default {
  name: 'Traffic',

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
