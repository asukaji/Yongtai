import YtMap from '@/components/YtMap';
import { Mask } from '@/components/Map';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, Float } from '@/components/Custom';
import styles from './index.module.less';

import { fetchTownList, fetchTownDetail } from '@/api';
import _ from 'lodash';

import markerHotel from '@/assets/MapPlugin/marker-hotel.png';

export default {
  name: 'Hotel',

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
    this.area = await fetchTownList();
  },

  methods: {
    onMarkerClick(id, title, position, area, description) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position, area, description },
        infoVisible: true
      });
    },

    onMapClick() {
      _.assign(this.state, {
        infoWindowContent: undefined,
        infoVisible: false
      });
    },

    onInfoWindowClick() {
      this.$refs.modal?.open(
        fetchTownDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerHotel}
          onClick={this.onMarkerClick.bind(null, id, title, position, area, description)}
        />
      ));
    },

    renderText() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Text
          position={position}
          text={title}
          offset={[-3, 20]}
          domStyle={{ color: '#0078FF' }}
          onClick={this.onMarkerClick.bind(null, id, title, position, area, description)}
        />
      ));
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap onMapClick={this.onMapClick}>
          <Mask onMaskClick={this.onMapClick}/>

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
          <h2>酒店情况</h2>
          <pre>Hotel Conditions</pre>
          <p>暂无数据</p>
        </ParagraphModal>
      </div>
    );
  }
};
