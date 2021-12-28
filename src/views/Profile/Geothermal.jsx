import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, Float } from '@/components/Custom';
import { Static } from '@/components/Custom';
import styles from './index.module.less';

import { fetchGeothermalList, fetchGeothermalDetail } from '@/api';
import _ from 'lodash';

import { geothermal } from '@/constants';
import markerGeothermal from '@/assets/MapPlugin/marker-geothermal.png';

export default {
  name: 'Geothermal',

  data() {
    return {
      area: undefined,
      state: {
        infoVisible: false,
        infoWindowContent: undefined
      }
    };
  },

  async mounted() {
    this.area = await fetchGeothermalList();
  },

  methods: {
    onMarkerClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description },
        infoVisible: true
      });
    },

    onMarkerNextClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description }
      });

      this.onInfoWindowClick();
    },

    onMapClick() {
      _.assign(this.state, {
        infoWindowContent: undefined,
        infoVisible: false
      });
    },

    onInfoWindowClick() {
      this.$refs.modal?.open(
        fetchGeothermalDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerGeothermal}
          onClick={this.onMarkerNextClick.bind(
            null,
            id,
            title,
            position,
            area,
            description
          )}
        />
      ));
    },

    renderText() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Text
          position={position}
          text={title}
          offset={[-3, 20]}
          domStyle={{
            color: '#FB3F62',
            fontWeight: 'bolder',
            fontSize: '15px'
          }}
          onClick={this.onMarkerNextClick.bind(
            null,
            id,
            title,
            position,
            area,
            description
          )}
        />
      ));
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap onMapClick={this.onMapClick}>
          <StreetsPolygon onStreetClick={this.onMapClick} />

          {this.renderProjects()}
          {this.renderText()}

          <InfoWindow
            visible={this.state.visible}
            position={this.state.infoWindowContent?.position}
            isCustom
            autoMove
          >
            <div
              class="info-window"
              style={{ visibility: this.state.infoVisible ? '' : 'hidden' }}
              onClick={this.onInfoWindowClick}
            >
              {this.state.infoWindowContent?.title}
            </div>
          </InfoWindow>

          <Float onClick={() => this.$refs.modal?.open()} />
        </YtMap>
        <ParagraphModal ref="modal">
          {/* <h2>地热情况</h2>
          <pre>Geothermal Conditions</pre>
          <p>
            永泰县地热资源位于全国著名的三大温泉区之一东南沿海温泉带内，县域内温泉分布广、储量丰富。经探明，全县8个乡镇有地热资源储藏区12处，每日可采量为22300吨。永泰地热田属基岩裂隙热储特征，热储区岩石破碎、富水性好，深热循环发育，地表水补给充分，成矿条件十分有利，且动态变化稳定，受季节变化影响不明显。永泰县地热资源具有埋藏浅、温度高特点，一般井深80-
            210米，并口温度在32--
            76°C之间，最高可达88°C。永泰县地下热水水质类型大部分为重碳酸、硫酸纳型水，个别水温较低者属重碳酸钙钠型，PH值一般均在7-8.5之间属碱型性水，溶解性总固体一般为240-
            660mg/L,水中富含钾、钠、钙、镁、铁、锶、锂、气、偏硅酸等二十多种对人体有益的元索及化合物，特别是氢含星达1030-1050Bg/L,在全国的众多温泉水中并不多见，具有较好的医疗保健价值。
          </p> */}
          <Static value={geothermal} />
        </ParagraphModal>
      </div>
    );
  }
};
