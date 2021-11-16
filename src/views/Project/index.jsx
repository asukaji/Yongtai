import YtMap from '@/components/YtMap';
import { Marker, InfoWindow } from '@amap/amap-vue';
import { StreetsPolygon } from '@/components/Map';
import { ParagraphModal, FooterTabs, Search } from '@/components/Custom';
import styles from './index.module.less';

import { fetchProjectList, fetchProjectDetail } from '@/api';
import _ from 'lodash';

import markerCircle from '@/assets/MapPlugin/marker-circle.png';
import markerDiamond from '@/assets/MapPlugin/marker-diamond.png';
import markerStar from '@/assets/MapPlugin/marker-star.png';
import markerTriangle from '@/assets/MapPlugin/marker-triangle.png';

export default {
  name: 'Project',

  data() {
    return {
      projects: undefined,
      state: {
        showPlaning: true,
        showReady: true,
        showWorking: true,
        showCompleted: true,
        infoVisible: false,
        infoWindowContent: undefined
      }
    };
  },

  computed: {
    planingProjects() {
      return this.state.showPlaning
        ? _.filter(this.projects?.list, ['type', 1])
        : [];
    },

    readyProjects() {
      return this.state.showReady
        ? _.filter(this.projects?.list, ['type', 2])
        : [];
    },

    workingProjects() {
      return this.state.showWorking
        ? _.filter(this.projects?.list, ['type', 3])
        : [];
    },

    completedProjects() {
      return this.state.showCompleted
        ? _.filter(this.projects?.list, ['type', 4])
        : [];
    }
  },

  async mounted() {
    this.projects = await fetchProjectList();
  },

  methods: {
    onSwitchState(stateName) {
      _.assign(this.state, { [stateName]: !this.state[stateName] });
    },

    onMarkerClick(id, title, position) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position },
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
        fetchProjectDetail.bind(
          null,
          this.state.infoWindowContent?.id
        ),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    renderProjects() {
      return [
        ..._.map(this.planingProjects, ({ position, title, id }) => (
          <Marker
            position={position}
            label={{
              content: title
            }}
            icon={markerCircle}
            onClick={this.onMarkerClick.bind(null, id, title, position)}
          />
        )),
        ..._.map(this.readyProjects, ({ position, title, id }) => (
          <Marker
            position={position}
            label={{
              content: title
            }}
            icon={markerTriangle}
            onClick={this.onMarkerClick.bind(null, id, title, position)}
          />
        )),
        ..._.map(this.workingProjects, ({ position, title, id }) => (
          <Marker
            position={position}
            label={{
              content: title
            }}
            icon={markerStar}
            onClick={this.onMarkerClick.bind(null, id, title, position)}
          />
        )),
        ..._.map(this.completedProjects, ({ position, title, id }) => (
          <Marker
            position={position}
            label={{
              content: title
            }}
            icon={markerDiamond}
            onClick={this.onMarkerClick.bind(null, id, title, position)}
          />
        ))
      ];
    },

    renderFooter() {
      const { showPlaning, showReady, showWorking, showCompleted } = this.state;

      return (
        <div class={styles.footer}>
          <div onClick={this.onSwitchState.bind(null, 'showPlaning')}>
            <div class={[styles.legend, styles.planing]}>
              <img src={markerCircle} />
              征迁项目
              <pre>{this.projects?.planing ?? 0}项</pre>
            </div>
            <div class={[styles.status, showPlaning && styles.active]} />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showReady')}>
            <div class={[styles.legend, styles.ready]}>
              <img src={markerTriangle} />
              开工提速项目
              <pre>{this.projects?.ready ?? 0}项</pre>
            </div>
            <div class={[styles.status, showReady && styles.active]} />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showWorking')}>
            <div class={[styles.legend, styles.working]}>
              <img src={markerStar} />
              在建提速项目
              <pre>{this.projects?.working ?? 0}项</pre>
            </div>
            <div
              class={[
                styles.status,
                showWorking && styles.active,
                styles.inverse
              ]}
            />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showCompleted')}>
            <div class={[styles.legend, styles.completed]}>
              <img src={markerDiamond} />
              竣工投产项目
              <pre>{this.projects?.completed ?? 0}项</pre>
            </div>
            <div
              class={[
                styles.status,
                showCompleted && styles.active,
                styles.inverse
              ]}
            />
          </div>
        </div>
      );
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap onMapClick={this.onMapClick}>
          <StreetsPolygon onStreetClick={this.onMapClick} />

          {this.renderProjects()}

          <InfoWindow
            visible={this.state.visible}
            position={this.state.infoWindowContent?.position}
            isCustom
            autoMove
          >
            <div class="info-window" style={{ visibility: this.state.infoVisible ? '' :'hidden' }} onClick={this.onInfoWindowClick}>
              {this.state.infoWindowContent?.title}
            </div>
          </InfoWindow>

          <Search />
          <FooterTabs>{this.renderFooter()}</FooterTabs>
        </YtMap>

        <ParagraphModal ref="modal" />
      </div>
    );
  }
};
