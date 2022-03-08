import YtMap from '@/components/YtMap';
import Header from '../Header';
import { StreetsPolygon } from '@/components/Map';
import { Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, SelectModal, Float } from '@/components/Custom';
import styles from './index.module.less';

import { fetchTownList, fetchTownDetail } from '@/api';
import _ from 'lodash';

export default {
  name: 'Video',

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
        fetchTownDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderText() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Text
          position={position}
          text={title}
          offset={[-20, 0]}
          domStyle={{ color: '#0078FF' }}
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
        <Header />
        <YtMap ref="Map" onMapClick={this.onMapClick}>
          <StreetsPolygon mark={false} onStreetClick={this.onMapClick} />

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

          <Float
            type="camera"
            left
            onClick={() => this.$refs.selectModal?.open()}
          />
        </YtMap>

        <SelectModal ref="selectModal" options={this.area} />
        <ParagraphModal ref="modal"></ParagraphModal>
      </div>
    );
  }
};
