import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal } from '@/components/Custom';
import Header from '../Header';
import styles from './index.module.less';

import { fetchPromoteList, fetchPromoteDetail } from '@/api';
import _ from 'lodash';

import markerRace from '@/assets/MapPlugin/marker-race.png';

export default {
  name: 'Promote',

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
    this.area = await fetchPromoteList();
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
        fetchPromoteDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return _.map(this.area, ({ position, title, id, area, description }) => (
        <Marker
          position={position}
          icon={markerRace}
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
          offset={[-10, 2]}
          domStyle={{ color: '#FB3F62' }}
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
        <Header />
        <YtMap onMapClick={this.onMapClick}>
          <StreetsPolygon onStreetClick={this.onMapClick} />
          {/* <PromoteLayer /> */}

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
              <h3>{this.state.infoWindowContent?.title}</h3>
              <p>{this.state.infoWindowContent?.description}</p>
              {this.state.infoWindowContent?.area}
            </div>
          </InfoWindow>
        </YtMap>

        <ParagraphModal ref="modal" />
      </div>
    );
  }
};
