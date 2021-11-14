import YtMap from '@/components/YtMap';
import { PromoteLayer, Mask } from '@/components/Map';

import styles from '../Home.module.less';

export default {
  name: 'Promote',

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <Mask />
          <PromoteLayer />
        </YtMap>
      </div>
    );
  }
};
