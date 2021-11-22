import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, Float } from '@/components/Custom';
import styles from './index.module.less';

import { fetchHotelList, fetchHotelDetail } from '@/api';
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
    this.area = await fetchHotelList();
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
        fetchHotelDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerHotel}
          onClick={this.onMarkerClick.bind(
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
            color: '#0078FF',
            fontWeight: 'bolder',
            fontSize: '15px'
          }}
          onClick={this.onMarkerClick.bind(
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
          <h2>酒店情况</h2>
          <pre>Hotel Conditions</pre>
          <p>
            2021年永泰县共有酒店27家（不含旅馆、民宿），客房2775间，其中拥有100间客房以上的酒店9家。酒店主要分布在城区，共13家，占全县酒店的48%。按档次分布来看：高档型（对标四星、五星）以上有7家，占比26%，舒适型（对标三星）有3家，占比11%，其余均为经济型，占比63%。目前在建酒店2个。2020年酒店接待人数约15万人次，2021年上半年酒店接待人数约21万人次。我县重点酒店有：福建冠景旅游开发实业有限公司酒店分公司、福州香米拉酒店投资有限公司、福州御温泉君澜度假酒店有限公司等。我县凭借丰富的自然文化资源、交通区位优势以及优惠的酒店价格，吸引大量省市政府会议在我县酒店培训，如：福建省政协农业农村委员工作座谈会、福建省农村统计培训班、福建省安全生产综合监管业务培训班、福建省全民健身运动会“建工杯”桥牌总决赛等。
          </p>
        </ParagraphModal>
      </div>
    );
  }
};
