import YtMap from '@/components/YtMap';
import { VillagesPolygon } from '@/components/Map';
import { Marker, Text, TrafficLayer } from '@amap/amap-vue';
import Header from './Header';
import Side from './Side';
import Footer from './Footer';
import styles from './index.module.less';

import _ from 'lodash';

import { features } from '@/assets/Geo/village-WT.json';
import { features as streets } from '@/assets/Geo/format.json';
import marker from '@/assets/MapPlugin/marker-center.png';
import { INDUSTRY_MAP } from '@/constants';

const VILLAGE_NAME = '梧桐镇';

export default {
  name: 'IndustryMap',

  computed: {
    center() {
      return _.find(
        streets,
        ({ properties: { name } }) => name === VILLAGE_NAME
      )?.properties.point;
    }
  },

  methods: {
    onVillageClick({ name, point }) {
      this.$refs.Map.setCenter(point);

      const { street, village } = this.$route.params;
      if (name === village) {
        return;
      }
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${street}/${name}/${lastPath}`);
    },

    onMapClick() {
      const { street } = this.$route.params;
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${street}/${lastPath}`);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap
          ref="Map"
          zoom={13}
          center={this.center}
          mapStyle="amap://styles/dark"
          onMapClick={this.onMapClick}
        >
          <Header />
          <Side />
          <Footer />

          <VillagesPolygon
            features={features}
            onVillageClick={this.onVillageClick}
          />
          <Marker position={this.center} icon={marker} />
          <Text
            position={this.center}
            text={VILLAGE_NAME}
            offset={[-12, -32]}
            domStyle={{
              fontSize: '15px',
              color: '#fff'
            }}
          />
          <TrafficLayer autoRefresh={false} />

          <router-view></router-view>
        </YtMap>
      </div>
    );
  }
};
