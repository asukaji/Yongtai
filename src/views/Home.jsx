import YtMap from '@/components/YtMap';
import { SatelliteLayer, Polygon, Marker } from '@amap/amap-vue';
import SideBar from './SideBar';
import styles from './Home.module.less';

import { FUZHOU, YONGTAI } from '@/constants';
import { coordinates } from '@/assets/Geo/Yongtai.json';
import markerBlue from '@/assets/MapPlugin/marker-blue.png';
import markerRed from '@/assets/MapPlugin/marker-red.png';

export default {
  name: 'Home',

  render() {
    return (
      <div class={styles.home}>
        <YtMap zoom={9} showLabel={false}>
          <SatelliteLayer visible />

          <Polygon
            path={coordinates}
            strokeColor="#0078FF"
            fillColor="#0078FF"
            fillOpacity={0.2}
          />

          <Marker
            position={FUZHOU}
            icon={markerRed}
            label={{
              content: '福州市'
            }}
            class={styles.markerRed}
          />

          <Marker
            position={YONGTAI}
            icon={markerBlue}
            label={{
              content: '永泰县'
            }}
          />
        </YtMap>
        <SideBar />
      </div>
    );
  }
};
