import YtMap from '@/components/YtMap';
import { Marker } from '@amap/amap-vue';
import styles from './index.module.less';
import {
  fetchCoordProfile,
  fetchVillages,
  fetchProjectsByVillages,
  fetchProject,
  summaryProject,
  projectClock
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
import SignList from './SignList';
import { EFFECT, ZOOM, CENTER } from '@/constants';


import { features as wt } from '@/assets/Geo/village-WT.json';
import { features as dy } from '@/assets/Geo/village-DY.json';
import { features as gl } from '@/assets/Geo/village-GL.json';//2
import { features as sk } from '@/assets/Geo/village-SK.json';
import { features as ta } from '@/assets/Geo/village-TA.json';

import { features as by } from '@/assets/Geo/town-baiYun.json';
import { features as pg } from '@/assets/Geo/town-panGu.json';
import { features as hx } from '@/assets/Geo/town-hongXing.json';
import { features as xb } from '@/assets/Geo/town-xiaBa.json';
import { features as cq } from '@/assets/Geo/town-changQing.json';
import { features as fk } from '@/assets/Geo/town-fuKou.json';
import { features as gy } from '@/assets/Geo/town-gaiYang.json';
import { features as cx } from '@/assets/Geo/town-chiXi.json';
import { features as ll } from '@/assets/Geo/town-linLu.json';
import { features as fq } from '@/assets/Geo/town-fuQuan.json';
import { features as zc } from '@/assets/Geo/town-zhangCheng.json';
import { features as cf } from '@/assets/Geo/town-chengFeng.json';
import { features as ql } from '@/assets/Geo/town-qingLiang.json';
import { features as dany } from '@/assets/Geo/town-danYun.json';
import { features as tq } from '@/assets/Geo/town-tangQian.json'; 
import { features as dongy } from '@/assets/Geo/town-dongYang.json';



import { features as streets } from '@/assets/Geo/format.json';


export const VILLAGE_NAME = '梧桐镇';

const featuresMap = new Map([
  [VILLAGE_NAME, wt],
  ['大洋镇', dy],
  ['葛岭镇', gl],
  ['嵩口镇', sk],
  ['同安镇', ta],
  ['白云乡', by],
  ['盘谷乡', pg],
  ['红星乡', hx],
  ['霞拔乡', xb],
  ['长庆镇', cq],
  ['洑口乡', fk],
  ['盖洋乡', gy],
  ['赤锡乡', cx],
  ['岭路乡', ll],
  ['富泉乡', fq],
  ['樟城镇', zc],
  ['城峰镇', cf],
  ['清凉镇', ql],
  ['丹云乡', dany],
  ['塘前乡', tq],
  ['东洋乡', dongy]
]);


export default {
  name: 'Effect',

  data() {
    return {
      activeArea: undefined,
      type: undefined,
      location: '',
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
      projectName: '',
      siderBarVisible: true,
      siderBarTwoVisible: false,
      siderBarThreeVisible: false,
      point: [],
      pageOpen: false,
      cardInfo: {},
      step: false,
      record: [],
      records: [],
      date: undefined
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

    handleActiveChange() {
      this.mapLocations = [];
      this.cardVisible = false;
      this.cardOneVisible = false;
      this.cardTwoVisible = false;
      this.backVisible = false;
      this.$refs.Map.setCenter([119.06697, 25.768119]);
      this.$refs.Map.setZoom(10.2);
    },

    handleTypeChange() {
      this.mapLocations = [];
      this.cardVisible = false;
      this.cardOneVisible = false;
      this.cardTwoVisible = false;
      this.backVisible = false;
      this.$refs.Map.setCenter([119.06697, 25.768119]);
      this.$refs.Map.setZoom(10.2);
    },

    // 点击文件夹事件
    async handlePageChange({ code, type, projectClass, treeCard, datetime }) {
      this.cardInfo = await summaryProject(code, type, projectClass, datetime);

      if (this.mapLocations.length !== 0) {
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
        } else {
          this.mapLocations = await fetchCoordProfile(
            code,
            type,
            projectClass,
            datetime
          );
          this.point.push(
            this.mapLocations[0].longitude + 0.105,
            this.mapLocations[0].latitude
          );
          // this.$refs.Map.setCenter(this.point);
          this.point.splice(0);
          console.log('11111');
        }
        if (treeCard) {
          //关闭汇总
          this.mapLocations = [];
          this.siderBarVisible = true; //jingji
          this.siderBarThreeVisible = false; // huizong
          this.cardVisible = false;
          this.cardOneVisible = false;
          this.cardTwoVisible = false;
          this.backVisible = false;
          this.point.splice(0);
          this.cardTwoVisible = false;
          this.backVisible = false;
          this.$refs.Map.setCenter([119.06697, 25.768119]);
          this.$refs.Map.setZoom(10.2);
        } else {
          this.siderBarVisible = false;
          this.siderBarThreeVisible = true;
          this.cardVisible = false;
          this.cardOneVisible = false;
          this.cardTwoVisible = false;
          this.backVisible = false;
          this.point.push(
            this.mapLocations[0].longitude + 0.105,
            this.mapLocations[0].latitude
          );
          this.$refs.Map.setCenter(this.point);
          this.point.splice(0);
        }
      } else {
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
        } else {
          this.mapLocations = await fetchCoordProfile(
            code,
            type,
            projectClass,
            datetime
          );
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

    //点击图表事件
    async handleItemChange({ code, type, projectClass, treeCard, datetime }) {
      this.cardInfo = await summaryProject(code, type, projectClass, datetime);

      if (this.mapLocations.length !== 0) {
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
        } else {
          this.mapLocations = await fetchCoordProfile(
            code,
            type,
            projectClass,
            datetime
          );
          this.point.push(
            this.mapLocations[0].longitude + 0.105,
            this.mapLocations[0].latitude
          );
          this.$refs.Map.setCenter(this.point);
          this.point.splice(0);
        }
        if (treeCard) {
          //关闭汇总
          this.mapLocations = [];
          this.siderBarVisible = true; //jingji
          this.siderBarThreeVisible = false; // huizong
        } else {
          this.siderBarVisible = false;
          this.siderBarThreeVisible = true;
        }
        this.point.splice(0);
        this.cardVisible = false;
        this.cardOneVisible = false;
        this.cardTwoVisible = false;
        this.backVisible = false;
        // this.$refs.Map.setCenter([119.06697, 25.768119]);
        // this.$refs.Map.setZoom(10.2);
      } else {
        if (projectClass === 'beautyVallage') {
          this.mapLocations = await fetchVillages(code, type);
        } else {
          this.mapLocations = await fetchCoordProfile(
            code,
            type,
            projectClass,
            datetime
          );
        }
        // console.log('mmmmmmmmm',this.summary);
        //刚进入也没有，没有点击卡片执行的顺序

        // if (treeCard) {
        //   this.siderBarVisible = true; //jingji
        //   this.siderBarThreeVisible = false; // huizong
        // } else {
        //   this.siderBarVisible = false;
        //   this.siderBarThreeVisible = true;
        // }
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
          location.vallage,
          'area',
          this.projectClass
        );
      }
      this.location = location.vallage;
      this.cardVisible = true;
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
    },

    handleItemSend(item) {
      this.projectId = item.projectId;
      this.projectName = item.projectName;
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
        this.$refs.Map.setCenter([119.068, 25.768119]);
        this.$refs.Map.setZoom(10.2);
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
      this.$refs.Map.setCenter([119.06697, 25.768119]);
      this.$refs.Map.setZoom(10.2);
      const lastPath = _.last(this.$route.path.split('/'));
      this.$router.replace(`/${EFFECT}/${lastPath}`);
    },

    backBottom() {
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
    },

    async handelCardOpen(item) {
      this.step = item;
      const project = await projectClock(this.projectId);
      this.record = project.records;
      this.records = this.record.map(
        ({
          createTime,
          userId_dictText,
          area,
          remark,
          troubles,
          nextPlan,
          finished
        }) => {
          return Object.assign(
            {},
            {
              createTime: createTime,
              userId_dictText: userId_dictText,
              area: area,
              remark: remark,
              troubles: troubles,
              nextPlan: nextPlan,
              finished: finished
            }
          );
        }
      );
    },

    handleCardClose(item) {
      this.step = item;
    },

    async listClick(item) {
      this.projects = await fetchProject(
        item.projectId,
        'project',
        this.projectClass
      );
      this.cardVisible = true;
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
      this.location = item.vallage;
    },

    async villageClick(item) {
      this.projects = await fetchProject(item, 'area', this.projectClass);
      this.cardVisible = true;
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.backVisible = false;
      this.location = item;
    },

    handelDate(item) {
      this.date = item;
      console.log('dateeeeee', item);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header onChange={this.change.bind(this)} />
        <Footer
          onChange={this.handleItemChange.bind(this)}
          onClick={this.handlePageChange.bind(this)}
          onActive={this.handleActiveChange.bind(this)}
          onType={this.handleTypeChange.bind(this)}
          onDate={this.handelDate.bind(this)}
        />
        {this.siderBarVisible && this.date && <SideBar dates={this.date}/>}
        {this.siderBarTwoVisible && <SideBarTwo />}
        {this.siderBarThreeVisible && (
          <SideBarThree
            cardInfo={this.cardInfo}
            onList={this.listClick.bind(this)}
            onVillage={this.villageClick.bind(this)}
          />
        )}
        <YtMap
          center={[119.06697, 25.768119]}
          offset={[500, 500]}
          ref="Map"
          map-style="amap://styles/grey"
          zoom={10.2}
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
            onChange={this.handelCardOpen.bind(this)}
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
        {this.step && (
          <SignList
            onChange={this.handleCardClose}
            records={this.records}
            name={this.projectName}
            record={this.record}
          />
        )}
      </div>
    );
  }
};
