import YtMap from '@/components/YtMap';
import { SatelliteLayer, Polygon, Marker } from '@amap/amap-vue';
import SideBar from './SideBar';
import { Carousel, CarouselItem } from 'element-ui';
import Header from './Header';
import styles from './Home.module.less';

import { FUZHOU, YONGTAI } from '@/constants';
import { coordinates } from '@/assets/Geo/Yongtai.json';
import markerBlue from '@/assets/MapPlugin/marker-blue.png';
import markerRed from '@/assets/MapPlugin/marker-red.png';
import bg0 from '@/assets/Bg/home1.jpeg';
import bg1 from '@/assets/Bg/home2.jpeg';
import bg2 from '@/assets/Bg/home3.jpeg';
import bg3 from '@/assets/Bg/home4.jpeg';
// import bg4 from '@/assets/Bg/home5.jpeg';
import title from '@/assets/Bg/bg-title.png';

export default {
  name: 'Home',

  methods: {
    open(path) {
      this.$router.push(path);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap zoom={9} showLabel={false}>
          <Header />
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

        <Carousel type="card" direction="vertical">
          <CarouselItem
            key="bg0"
            
            
          >
            <div class={styles.carouselItem} style={{ backgroundImage: `url(${bg0})` }} onClick={this.open.bind(this, '/profile/ecological')}></div>
          </CarouselItem>
          <CarouselItem
            key="bg1"
            
          >
            <div class={styles.carouselItem} style={{ backgroundImage: `url(${bg1})` }} onClick={this.open.bind(this, '/profile/industrial')}></div>
          </CarouselItem>
          <CarouselItem
            key="bg2"
            
          >
            <div class={styles.carouselItem} style={{ backgroundImage: `url(${bg2})` }} onClick={this.open.bind(this, '/profile/urban')}></div>
          </CarouselItem>
          <CarouselItem
            key="bg3"
            
          >
            <div class={styles.carouselItem} style={{ backgroundImage: `url(${bg3})` }} onClick={this.open.bind(this, '/profile/livelihood')}></div>
          </CarouselItem>
          {/* <CarouselItem
            key="bg4"
            style={{ backgroundImage: `url(${bg4})` }}
          ></CarouselItem> */}
        </Carousel>

        <img src={title} class={styles.title} />

        <SideBar />
      </div>
    );
  }
};
