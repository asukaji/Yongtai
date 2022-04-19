import YtMap from '@/components/YtMap';
import { Marker } from '@amap/amap-vue';
import styles from './index.module.less';
import {
  fetchCoordProfile,
  fetchVillages,
  fetchProjectsByVillages,
  fetchProject,
  summaryProject
} from '@/api';

import _ from 'lodash';

import text from '../../assets/Effect/bg-ditutext.png';
import icon from '../../assets/Effect/location.png';
import close from '../../assets/Effect/close.png';
import back from '../../assets/Effect/back.png';

import { VillagesPolygon, StreetsPolygon } from '@/components/Map';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar';
import SideBarTwo from './SideBarTwo';
import SideBarThree from './SideBarThree';
import Card from './Card';
import CardTwo from './CardTwo';
import { EFFECT, ZOOM, CENTER } from '@/constants';


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
      cardOneVisible: false,
      cardTwoVisible: false,
      backVisible: false,
      code: '',
      typed: '',
      projectClass: '',
      projectId: '',
      siderBarVisible: true,
      siderBarTwoVisible: false,
      siderBarThreeVisible: false,
      point: [],
      pageOpen: false,
      cardInfo: {}
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
    beforeLeave(name) {
      this.$router.replace({ name });
    },

    //点击文件夹事件
    async handleItemChange({ code, type, projectClass, treeCard}) {

      this.cardInfo = await summaryProject(code, type, projectClass);

      console.log('card', this.cardInfo);

      if (this.mapLocations.length !== 0) {
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
          // this.summary = await summaryProject(code, type, projectClass);
        } else {
          this.mapLocations = await fetchCoordProfile(code, type, projectClass);
          // this.summary = await summaryProject(code, type, projectClass);
        }
        if (treeCard) {//关闭汇总
          this.mapLocations = [];
          this.siderBarVisible = true; //jingji
          this.siderBarThreeVisible = false; // huizong
        } else {
          this.siderBarVisible = false;
          this.siderBarThreeVisible = true;

        }
        console.log('zuobiaoValue1:',this.mapLocations.length);
        this.point.splice(0);
       
        this.cardVisible = false, 
        this.cardOneVisible = false;
        this.cardTwoVisible = false;
        this.backVisible = false;
        this.$refs.Map.setCenter([118.987697, 25.768119]);
        this.$refs.Map.setZoom(10.4);
      } else {
        
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
        } else {
          this.mapLocations = await fetchCoordProfile(code, type, projectClass);

        }
        // console.log('mmmmmmmmm',this.summary);
        //刚进入也没有，没有点击卡片执行的顺序 

        if (treeCard) {
          this.siderBarVisible = true; //jingji
          this.siderBarThreeVisible = false; // huizong
        } else {
          this.siderBarVisible = false;
          this.siderBarThreeVisible = true;
        }
        this.code = code;
        this.typed = type;
        this.projectClass = projectClass;
        this.point.push(
          this.mapLocations[0].longitude + 0.105,
          this.mapLocations[0].latitude
        );
        this.$refs.Map.setCenter(this.point);
        this.point.splice(0);
      }
    },

    //点击地图点位事件
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
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
    },

    handleItemSend(item) {
      this.projectId = item.projectId;
      this.cardOneVisible = false;
      this.cardTwoVisible = true;
      this.backVisible = true;
    },

    close() {
      this.cardVisible = false;
      this.backVisible = false;
    },
    change(name) {
      if (name === 'gzcx') {
        this.siderBarVisible = true;
        this.siderBarTwoVisible = false;
        this.siderBarThreeVisible = false; 
        this.mapLocations = [];
        this.onMapClick();
        this.$refs.Map.setCenter([118.9878, 25.768119]);
        this.$refs.Map.setZoom(10.4);
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
      this.$router.replace(`/${EFFECT}/${street}/${name}/${lastPath}`);
      this.mapLocations = [];
    },

    onStreetClick({ name, point }) {
      this.$refs.Map.setCenter(point);
      this.$refs.Map.setZoom(12);
      const lastPath = _.last(this.$route.path.split('/'));
      this.$router.replace(`/${EFFECT}/${name}/${lastPath}`);
      this.cardVisible = false;
      this.cardOneVisible = false;
      this.cardTwoVisible = false;
      this.backVisible = false;
      this.mapLocations = [];
    },

    onMapClick() {
      this.$refs.Map.setCenter(CENTER);
      this.$refs.Map.setZoom(ZOOM);
      const lastPath = _.last(this.$route.path.split('/'));
      this.$router.replace(`/${EFFECT}/${lastPath}`);
    },

    backBottom() {
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header onChange={this.change.bind(this)} />
        <Footer onChange={this.handleItemChange.bind(this)}/>
        {this.siderBarVisible && <SideBar />}
        {this.siderBarTwoVisible && <SideBarTwo />}
        {this.siderBarThreeVisible && <SideBarThree cardInfo={this.cardInfo}/>}
        <YtMap
          center={[118.987697, 25.768119]}
          offset={[500, 500]}
          ref="Map"
          map-style="amap://styles/grey"
          zoom={10.4}
          // onMapClick={this.onMapClick}
        >
          {this.street ? (
            <div onClick={this.onMapClick} class={styles.backs}>
              返回乡镇地图
            </div>
          ) : null}
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
          <Card
            projects={this.projects}
            village={this.location}
            onSend={this.handleItemSend.bind(this)}
            class={[
              styles.cardOne,
              this.cardOneVisible && styles.cardOneVisible
            ]}
          />
          <CardTwo
            projectClass={this.projectClass}
            projectId={this.projectId}
            class={[
              styles.cardTwo,
              this.cardTwoVisible && styles.cardTwoVisible
            ]}
          />
        </div>
        <div
          class={[styles.bottomback, this.backVisible && styles.backVisible]}
        >
          <img src={back} class={styles.back} onClick={this.backBottom}></img>
        </div>
      </div>
    );
  }
};
