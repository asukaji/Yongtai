import YtMap from '@/components/YtMap';
import { VillagesPolygon, StreetsPolygonNoName } from '@/components/Map';
import { Marker, Text, TrafficLayer } from '@amap/amap-vue';
import Header from './Header';
import Side from './Side';
import Footer from './Footer';
import VillageProjects from './VillageProjects';
import styles from './index.module.less';
import { projectClock } from '@/api';

import Card from './Card';
import CardTwo from './CardTwo';
import CardThree from './CardThree';
import CardFour from './CardFour';
import SideBar from './SideBar';
import SignList from './SignList';

import text from '../../assets/Effect/bg-ditutext.png';
import icon from '../../assets/Effect/location.png';
import close from '../../assets/Effect/close.png';
import back from '../../assets/Effect/back.png';

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
      zoom: 10.4,
      centers: [118.987697, 25.768119],
      items: {},
      markers: {},
      mapLocations: [],
      cardVisible: false,
      cardTwoVisible: false,
      cardThreeVisible: false,
      change: false,
      point: [],
      name: '',
      content: '',
      names: '',
      contents: '',
      survey: {},
      sideVisible: true,
      sideBarVisible: false,
      projectId: '',
      projectClass: '',
      projectName: '',
      step: false,
      record: [],
      records: [],
      footSideVisible: true,
      cardOneVisible: false,
      cardFourVisible: false
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

      const { street = VILLAGE_NAME, village } = this.$route.params;
      if (name === village) {
        return;
      }
      const lastPath = _.last(this.$route.path.split('/'));

      this.$router.replace(`/${INDUSTRY_MAP}/${street}/${name}/${lastPath}`);
      this.cardVisible = false;
      this.cardTwoVisible = false;
      this.cardThreeVisible = false;
      if (this.footSideVisible === false) {
        this.sideVisible = false;
        this.sideBarVisible = false;
      } else {
        this.sideVisible = true;
        this.sideBarVisible = false;
      }
    },

    onStreetClick({ name, point }) {
      if (point) {
        this.$refs.Map.setCenter(point);
        this.$refs.Map.setZoom(12.4);
      }

      const lastPath = _.last(this.$route.path.split('/'));
      this.mapLocations.splice(0);
      this.cardVisible = false;
      this.cardTwoVisible = false;
      this.cardThreeVisible = false;
      this.sideVisible = true;
      this.sideBarVisible = false;

      this.$router.replace(`/${INDUSTRY_MAP}/${name}/${lastPath}`);
    },

    onMapClick() {
      this.$refs.Map.setCenter([118.987697, 25.768119]);
      this.$refs.Map.setZoom(10.4);
      const lastPath = _.last(this.$route.path.split('/'));
      this.$router.replace(`/${INDUSTRY_MAP}/${lastPath}`);
    },

    handleItemChange(item) {
      if (this.projectId === item.nameCode) {
        this.mapLocations = [];
        this.projectId = '';
      } else {
        this.items = item;
        this.projectId = item.nameCode;
        this.projectName = item.name;
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
      this.cardOneVisible = true;
      this.cardTwoVisible = false;
      this.cardThreeVisible = false;
    },

    close() {
      this.cardVisible = false;
      this.cardTwoVisible = false;
      this.cardThreeVisible = false;
    },

    handleResource(item) {
      this.name = item.name;
      this.content = item.content;
      this.cardVisible = false;
      this.cardOneVisible = false;
      this.cardTwoVisible = true;
    },

    handleFeature(item) {
      this.names = item.name;
      this.contents = item.content;
      this.cardThreeVisible = true;
    },

    handleMoveFeature(item) {
      this.footSideVisible = item;
      this.sideVisible = item;
      if (item === false) {
        this.zoom = 10.9;
        this.centers = [118.787697, 25.868119];
      } else {
        this.zoom = 10.4;
        this.centers = [118.987697, 25.768119];
      }
      this.mapLocations = [];
      this.change = true;
    },

    handleSurveyFeature(item) {
      this.survey = item;
      this.sideVisible = false;
      this.sideBarVisible = true;
    },

    handelBack() {
      if (this.footSideVisible === false) {
        this.sideVisible = false;
        this.sideBarVisible = false;
      } else {
        this.sideVisible = true;
        this.sideBarVisible = false;
      }
    },

    async handelCardOpen(item) {
      this.step = item[0];
      this.projectName = item[1].name;
      const project = await projectClock(item[1].nameCode);
      console.log('project', project);
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

    handleSendFeature(item) {
      console.log('??????', item);
    },

    handelOpen() {
      this.cardOneVisible = false;
      this.cardFourVisible = true;
    },

    handelKey(item) {
      this.projectClass = item;
    },

    backBottom() {
      this.cardOneVisible = true;
      this.cardFourVisible = false;
    },

    handelTabs(item) {
      this.cardVisible = item;
      this.cardOneVisible = item;
      this.cardTwoVisible = item;
      this.cardThreeVisible = item;
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap
          ref="Map"
          zoom={this.zoom}
          center={this.centers}
          mapStyle="amap://styles/grey"
          // onMapClick={this.onMapClick}
          onChange={this.handleResource.bind(this)}
        >
          {this.street ? (
            <div onClick={this.onMapClick} class={styles.backs}>
              返回乡镇地图
            </div>
          ) : null}
          <Header
            onChange={this.handleMoveFeature.bind(this)}
            onClick={this.handleSurveyFeature.bind(this)}
            onTabs={this.handelTabs.bind(this)}
            // onSend={this.handleSendFeature.bind(this)}
          />
          {this.sideVisible && <Side />}

          {this.footSideVisible && (
            <Footer
              onChange={this.handleItemChange.bind(this)}
              onActivekey={this.handelKey.bind(this)}
            />
          )}

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

          <router-view
            onChange={this.handleResource.bind(this)}
            onMove={this.handleFeature.bind(this)}
          />
        </YtMap>

        <div class={[styles.card, this.cardVisible && styles.cardVisible]}>
          <img class={styles.close} src={close} onClick={this.close}></img>
          {this.cardOneVisible && (
            <Card
              projects={this.items}
              mark={this.markers}
              onChange={this.handelCardOpen.bind(this)}
              onOpen={this.handelOpen.bind(this)}
            />
          )}
          {this.cardFourVisible && (
            <div>
              <div>
                <CardFour
                  projectId={this.projectId}
                  projectClass={this.projectClass}
                ></CardFour>
              </div>
              <div>
                <img
                  src={back}
                  class={styles.back}
                  onClick={this.backBottom}
                ></img>
              </div>
            </div>
          )}
        </div>

        <div
          class={[styles.cardTwo, this.cardTwoVisible && styles.cardTwoVisible]}
        >
          <img class={styles.close} src={close} onClick={this.close}></img>
          <CardTwo name={this.name} content={this.content} />
        </div>

        <div
          class={[
            styles.cardTwo,
            this.cardThreeVisible && styles.cardThreeVisible
          ]}
        >
          <img class={styles.close} src={close} onClick={this.close}></img>
          <CardThree name={this.names} content={this.contents} />
        </div>
        <div class={styles.sideBar}>
          {this.sideBarVisible && (
            <SideBar
              survey={this.survey}
              onClick={this.handelBack.bind(this)}
            />
          )}
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
