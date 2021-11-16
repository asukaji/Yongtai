import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import { FooterTabs } from '@/components/Custom';
import styles from '../Home.module.less';

const TABS = [];

export default {
  name: 'Traffic',

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <Mask />
          <router-view></router-view>
          <FooterTabs tabs={TABS} />
        </YtMap>
      </div>
    );
  }
};
