import YtMap from '@/components/YtMap';
import { SatelliteLayer, Polygon, Marker } from '@amap/amap-vue';
import SideBar from './SideBar';
import { Carousel, CarouselItem } from 'element-ui';
import styles from './Home.module.less';

import { FUZHOU, YONGTAI } from '@/constants';
import { coordinates } from '@/assets/Geo/Yongtai.json';
import markerBlue from '@/assets/MapPlugin/marker-blue.png';
import markerRed from '@/assets/MapPlugin/marker-red.png';
import bg0 from '@/assets/Bg/home1.jpeg';
import bg1 from '@/assets/Bg/home2.jpeg';
import bg2 from '@/assets/Bg/home3.jpeg';
import bg3 from '@/assets/Bg/home4.jpeg';
import bg4 from '@/assets/Bg/home5.jpeg';

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
              content: '福州市区'
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
        <Carousel type="card">
          <CarouselItem
            key="bg0"
            style={{ backgroundImage: `url(${bg0})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg1"
            style={{ backgroundImage: `url(${bg1})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg2"
            style={{ backgroundImage: `url(${bg2})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg3"
            style={{ backgroundImage: `url(${bg3})` }}
          ></CarouselItem>
          <CarouselItem
            key="bg4"
            style={{ backgroundImage: `url(${bg4})` }}
          ></CarouselItem>
        </Carousel>
        <SideBar />
      </div>
    );
  }
};
