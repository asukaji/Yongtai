import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import { FooterTabs } from '@/components/Custom';
import styles from './index.module.less';

import iconService from '@/assets/Icon/icon-service.png';
import iconServiceActive from '@/assets/Icon/icon-service-active.png';
import iconRailway from '@/assets/Icon/icon-railway.png';
import iconRailwayActive from '@/assets/Icon/icon-railway-active.png';
import iconHighway from '@/assets/Icon/icon-highway.png';
import iconHighwayActive from '@/assets/Icon/icon-highway-active.png';
import iconNational from '@/assets/Icon/icon-national.png';
import iconNationalActive from '@/assets/Icon/icon-national-active.png';
import iconProvincial from '@/assets/Icon/icon-provincial.png';
import iconProvincialActive from '@/assets/Icon/icon-provincial-active.png';

const TABS = [
  { name: 'service', title: '服务区距离', icon: iconService, activeIcon: iconServiceActive },
  { name: 'railway', title: '铁路', icon: iconRailway, activeIcon: iconRailwayActive },
  { name: 'highway', title: '高速公路', icon: iconHighway, activeIcon: iconHighwayActive },
  { name: 'national', title: '国道干线', icon: iconNational, activeIcon: iconNationalActive },
  { name: 'provincial', title: '省道干线', icon: iconProvincial, activeIcon: iconProvincialActive },
];

export default {
  name: 'Traffic',

  provide() {
    return {
      map: this
    };
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap ref="Map">
          <Mask />
          <router-view></router-view>
          <FooterTabs tabs={TABS} />
        </YtMap>
      </div>
    );
  }
};
