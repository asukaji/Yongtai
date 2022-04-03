import YtMap from '@/components/YtMap';
import { Marker } from '@amap/amap-vue';
import styles from './index.module.less';
import {
  fetchCoordProfile,
  fetchVillages,
  fetchProjectsByVillages,
  fetchProject
} from '@/api';

import text from '../../assets/Effect/bg-ditutext.png';
import icon from '../../assets/Effect/location.png';
import close from '../../assets/Effect/close.png';


import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import SideBarTwo from './SideBarTwo';
import Card from './Card';

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
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header onChange={this.change.bind(this)} />
        <Footer onChange={this.handleItemChange.bind(this)} />
        {this.siderBarVisible && <SideBar />}
        {this.siderBarTwoVisible && <SideBarTwo />}
        <YtMap map-style="amap://styles/grey" zoom={10}>
          {this.mapLocations.map((location) => (
            <Marker
              position={[location.longitude, location.latitude]}
              offset={[-160, -45]}
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
          <Card projects={this.projects} village={this.location} />
        </div>
      </div>
    );
  }
};
