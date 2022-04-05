import YtMap from '@/components/YtMap';
import { VillagesPolygon, StreetsPolygon } from '@/components/Map';
import { Marker, Text, TrafficLayer } from '@amap/amap-vue';
import Header from './Header';
import Side from './Side';
import Footer from './Footer';
import styles from './index.module.less';

import _ from 'lodash';

import { features as wt } from '@/assets/Geo/village-WT.json';
import { features as dy } from '@/assets/Geo/village-DY.json';
import { features as gl } from '@/assets/Geo/village-GL.json';
import { features as sk } from '@/assets/Geo/village-SK.json';
import { features as ta } from '@/assets/Geo/village-TA.json';
import { features as streets } from '@/assets/Geo/format.json';
import marker from '@/assets/MapPlugin/marker-center.png';
import { INDUSTRY_MAP, ZOOM, CENTER } from '@/constants';

export const VILLAGE_NAME = '梧桐镇';
const featuresMap = new Map([
  [VILLAGE_NAME, wt],
  ['大洋镇', dy],
  ['葛岭镇', gl],
  ['嵩口镇', sk],
  ['同安镇', ta]
]);

export default {
  name: 'IndustryMap',

  computed: {
    street() {
      return this.$route.params.street;
    },

    center() {
      return _.find(streets, ({ properties: { name } }) => name === this.street)
        ?.properties.point;
    }
  },

  methods: {
    onVillageClick({ name, point }) {
      this.$refs.Map.setCenter(point);

      const { street = VILLAGE_NAME, village } = this.$route.params;
      if (name === village) {
        return;
      }
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${street}/${name}/${lastPath}`);
    },

    onStreetClick({ name, point }) {
      this.$refs.Map.setCenter(point);
      this.$refs.Map.setZoom(12);

      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${name}/${lastPath}`);
    },

    onMapClick() {
      this.$refs.Map.setCenter(CENTER);
      this.$refs.Map.setZoom(ZOOM);
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${lastPath}`);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap
          ref="Map"
          zoom={ZOOM}
          center={this.center ?? CENTER}
          mapStyle="amap://styles/dark"
          onMapClick={this.onMapClick}
        >
          <Header />
          <Side />
          <Footer />

          {this.street ? (
            <VillagesPolygon
              features={featuresMap.get(this.street ?? VILLAGE_NAME)}
              onVillageClick={this.onVillageClick}
            />
          ) : (
            <StreetsPolygon onStreetClick={this.onStreetClick} />
          )}

          {this.street ? <Marker position={this.center} icon={marker} /> : null}
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

          <router-view></router-view>
        </YtMap>
      </div>
    );
  }
};
