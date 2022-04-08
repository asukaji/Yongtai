import YtMap from '@/components/YtMap';
import { Marker } from '@amap/amap-vue';
import styles from './index.module.less';
import {
  fetchCoordProfile,
  fetchVillages,
  fetchProjectsByVillages,
  fetchProject
} from '@/api';

import _ from 'lodash';

import text from '../../assets/Effect/bg-ditutext.png';
import icon from '../../assets/Effect/location.png';
import close from '../../assets/Effect/close.png';

import { VillagesPolygon, StreetsPolygon } from '@/components/Map';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import SideBarTwo from './SideBarTwo';
import Card from './Card';
import { EFFECT_INDEX, ZOOM, CENTER } from '@/constants';


import { features as wt } from '@/assets/Geo/village-WT.json';
import { features as dy } from '@/assets/Geo/village-DY.json';
import { features as gl } from '@/assets/Geo/village-GL.json';
import { features as sk } from '@/assets/Geo/village-SK.json';
import { features as ta } from '@/assets/Geo/village-TA.json';
import { features as streets } from '@/assets/Geo/format.json';

export const VILLAGE_NAME = '梧桐镇';

const featuresMap = new Map([
  [VILLAGE_NAME, wt],
  ['大洋镇', dy],
  ['葛岭镇', gl],
  ['嵩口镇', sk],
  ['同安镇', ta]
]);

export default {
  name: 'Effect',

  data() {
    return {
      activeArea: undefined,
      type: undefined,
      location: {},
      mapLocations: [],
      villages: undefined,
      projects: [],
      cardVisible: false,
      code: '',
      typed: '',
      projectClass: '',
      siderBarVisible: true,
      siderBarTwoVisible: false
    };
  },

  provide() {
    return {
      map: this
    };
  },

  computed: {
    activeKey() {
      const [pathName, tabName] = this.$route.name.split('.');
      return [pathName, tabName].join('.');
    },

    street() {
      return this.$route.params.street;
    },

    center() {
      return _.find(streets, ({ properties: { name } }) => name === this.street)
        ?.properties.point;
    }
  },

  methods: {
    // onClick(area, type) {
    //   this.activeArea = area;
    //   this.type = type;
    // },

    beforeLeave(name) {
      this.$router.replace({ name });
    },
    async handleItemChange({ code, type, projectClass }) {
      if (projectClass === 'beautyVallage') {
        this.mapLocations = await fetchVillages(code, type);
      } else {
        this.mapLocations = await fetchCoordProfile(code, type, projectClass);
      }
      this.code = code;
      this.typed = type;
      this.projectClass = projectClass;
    },
    async renderCard(location) {
      if (this.projectClass === 'beautyVallage') {
        this.projects = await fetchProjectsByVillages(location.vallage);
      } else {
        this.projects = await fetchProject(
          this.code,
          this.typed,
          this.projectClass
        );
      }
      this.location = location;
      this.cardVisible = true;
    },
    close() {
      this.cardVisible = false;
    },
    change(name) {
      if (name === 'gzcx') {
        this.siderBarVisible = true;
        this.siderBarTwoVisible = false;
      } else if (name === 'zbkh') {
        this.siderBarVisible = false;
        this.siderBarTwoVisible = true;
      }
    },
    onVillageClick({ name, point }) {
      this.$refs.Map.setCenter(point);

      const { street = VILLAGE_NAME, village } = this.$route.params;
      if (name === village) {
        return;
      }
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${EFFECT_INDEX}/${street}/${name}/index`);
    },

    onStreetClick({ name, point }) {
      this.$refs.Map.setCenter(point);
      this.$refs.Map.setZoom(12);

      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${EFFECT_INDEX}/${name}/index`);
    },

    onMapClick() {
      this.$refs.Map.setCenter(CENTER);
      this.$refs.Map.setZoom(ZOOM);

      this.$router.replace(`/${EFFECT_INDEX}/index`);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header onChange={this.change.bind(this)} />
        <Footer onChange={this.handleItemChange.bind(this)} />
        {this.siderBarVisible && <SideBar />}
        {this.siderBarTwoVisible && <SideBarTwo />}
        <YtMap
          center={[118.987697, 25.768119]}
          ref="Map"
          map-style="amap://styles/grey"
          zoom={10.4}
          onMapClick={this.onMapClick}
        >
          {this.street ? (
            <VillagesPolygon
              features={featuresMap.get(this.street ?? VILLAGE_NAME)}
              onVillageClick={this.onVillageClick}
            />
          ) : (
            <StreetsPolygon onStreetClick={this.onStreetClick} />
          )}
          {this.mapLocations.map((location) => (
            <Marker
              position={[location.longitude, location.latitude]}
              offset={[-75, -50]}
              onClick={this.renderCard.bind(this, location)}
            >
              <div>
                <div class={styles.marker}>
                  <img src={text} />
                  <p>{location.vallage}</p>
                </div>
                <div>
                  <img src={icon} class={styles.icon}></img>
                </div>
              </div>
            </Marker>
          ))}
        </YtMap>
        <div class={[styles.card, this.cardVisible && styles.cardVisible]}>
          <img class={styles.close} src={close} onClick={this.close}></img>
          <Card projects={this.projects} village={this.location} jdList={[]} />
        </div>
      </div>
    );
  }
};
