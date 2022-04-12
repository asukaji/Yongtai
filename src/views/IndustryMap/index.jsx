import YtMap from '@/components/YtMap';
import { VillagesPolygon, StreetsPolygonNoName } from '@/components/Map';
import { Marker, Text, TrafficLayer } from '@amap/amap-vue';
import Header from './Header';
import Side from './Side';
import Footer from './Footer';
import VillageProjects from './VillageProjects';
import styles from './index.module.less';

import Card from './Card';

import text from '../../assets/Effect/bg-ditutext.png';
import icon from '../../assets/Effect/location.png';
import close from '../../assets/Effect/close.png';

import _ from 'lodash';

import { features as wt } from '@/assets/Geo/village-WT.json';
import { features as dy } from '@/assets/Geo/village-DY.json';
import { features as gl } from '@/assets/Geo/village-GL.json';
import { features as sk } from '@/assets/Geo/village-SK.json';
import { features as ta } from '@/assets/Geo/village-TA.json';
import { features as streets } from '@/assets/Geo/format.json';
import marker from '@/assets/MapPlugin/marker-center.png';
import { INDUSTRY_MAP, ZOOM, CENTER } from '@/constants';

export const VILLAGE_NAME = '一镇一品';
const featuresMap = new Map([
  ['梧桐镇', wt],
  ['大洋镇', dy],
  ['葛岭镇', gl],
  ['嵩口镇', sk],
  ['同安镇', ta]
]);

export default {
  name: 'IndustryMap',

  provide() {
    return {
      map: this
    };
  },

  data() {
    return {
      items: {},
      markers: {},
      mapLocations: [],
      cardVisible: false,
      change: false,
    };
  },

  computed: {
    street() {
      return this.$route.params.street;
    },

    center() {
      return _.find(streets, ({ properties: { name } }) => name === this.street)
        ?.properties.point;
    }
  },

  watch: {
    street() {
      this.mapLocations = [];
    }
  },

  methods: {
    onVillageClick({ name, point }) {
      this.mapLocations = [];
      this.change = false;
      this.$refs.Map.setCenter(point);
      console.log('点标记', point);

      const { street = VILLAGE_NAME, village } = this.$route.params;
      if (name === village) {
        return;
      }
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${street}/${name}/${lastPath}`);
      this.cardVisible = false;
    },

    onStreetClick({ name, point }) {
      if (point) {
        this.$refs.Map.setCenter(point);
        this.$refs.Map.setZoom(12);
      }

      const lastPath = _.last(this.$route.path.split('/'));
      this.mapLocations.splice(0);
      this.cardVisible = false;

      this.$router.replace(`/${INDUSTRY_MAP}/${name}/${lastPath}`);
    },

    onMapClick() {
      this.$refs.Map.setCenter(CENTER);
      this.$refs.Map.setZoom(ZOOM);
      const lastPath = _.last(this.$route.path.split('/'));
      this.$router.replace(`/${INDUSTRY_MAP}/${lastPath}`);
    },

    handleItemChange(item) {
      if(this.mapLocations.length !== 0){
        this.mapLocations = [];
      } else {
        this.items = item;
        this.mapLocations.splice(0);
        this.mapLocations.push(item);
        this.cardVisible = false;
        this.change = true;
      }
    },

    handleItemClicks(item) {
      this.markers = item;  
    },

    renderCard() {
      this.cardVisible = true;
    },

    close() {
      this.cardVisible = false;
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap
          ref="Map"
          zoom={10.4}
          center={[118.987697, 25.768119]}
          mapStyle="amap://styles/grey"
          // onMapClick={this.onMapClick}
        >
          {this.street ? (
            <div onClick={this.onMapClick} class={styles.back}>
              返回乡镇地图
            </div>
          ) : null}
          <Header />
          <Side />
          <Footer onChange={this.handleItemChange.bind(this)} />

          {this.street ? (
            <VillagesPolygon
              features={featuresMap.get(this.street ?? VILLAGE_NAME)}
              onVillageClick={this.onVillageClick}
            />
          ) : (
            <StreetsPolygonNoName onStreetClick={this.onStreetClick} />
          )}

          {this.street ? (
            <Marker
              position={this.center}
              icon={marker}
              onClick={this.onStreetClick.bind(this, { name: this.street })}
            />
          ) : null}
          {this.street ? (
            <Text
              position={this.center}
              text={this.street ?? VILLAGE_NAME}
              offset={[-12, -32]}
              domStyle={{
                fontSize: '15px',
                color: '#fff'
              }}
            />
          ) : null}
          <TrafficLayer autoRefresh={false} />

          {this.mapLocations.map((location) => (
            <Marker
              position={[location.longitudes, location.latitudes]}
              offset={[-75, -50]}
              key={location.name}
              onClick={this.renderCard}
            >
              <div>
                <div class={styles.marker}>
                  <img src={text} />
                  <p class={styles.name}>{location.name}</p>
                </div>
                <div>
                  <img src={icon} class={styles.icon}></img>
                </div>
              </div>
            </Marker>
          ))}

          <VillageProjects
            onClick={[this.renderCard, this.handleItemClicks.bind(this)]}
            change={this.change}
          />

          <router-view></router-view>
        </YtMap>

        <div class={[styles.card, this.cardVisible && styles.cardVisible]}>
          <img class={styles.close} src={close} onClick={this.close}></img>
          <Card projects={this.items} mark={this.markers} />
        </div>
      </div>
    );
  }
};
