import YtMap from '@/components/YtMap';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { StreetsPolygon } from '@/components/Map';
import { ParagraphModal, FooterTabs, Search } from '@/components/Custom';
import Header from '../Header';
import styles from './index.module.less';

import { fetchProjectList, fetchProjectDetail } from '@/api';
import { validPosition } from '@/utils';
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
        ? _.filter(
            this.projects?.list,
            ({ type, position }) => type === 1 && validPosition(position)
            // eslint-disable-next-line
          )
        : [];
    },

    readyProjects() {
      return this.state.showReady
        ? _.filter(
            this.projects?.list,
            ({ type, position }) => type === 2 && validPosition(position)
            // eslint-disable-next-line
          )
        : [];
    },

    workingProjects() {
      return this.state.showWorking
        ? _.filter(
            this.projects?.list,
            ({ type, position }) => type === 3 && validPosition(position)
            // eslint-disable-next-line
          )
        : [];
    },

    completedProjects() {
      return this.state.showCompleted
        ? _.filter(
            this.projects?.list,
            ({ type, position }) => type === 4 && validPosition(position)
            // eslint-disable-next-line
          )
        : [];
    },

    filterProjects() {
      return [
        ...this.planingProjects,
        ...this.readyProjects,
        ...this.workingProjects,
        ...this.completedProjects
      ];
    }
  },

  async mounted() {
    this.projects = await fetchProjectList();
  },

  methods: {
    onSwitchState(stateName) {
      this.onMapClick();

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
        fetchProjectDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.onMapClick();
    },

    onSearchClick([id, title, position]) {
      if (_.some(position, _.isNil) || !title) {
        this.onMapClick();
        return;
      }
      this.onMarkerClick(id, title, position);
    },

    iconType(type) {
      switch (type) {
        case 1:
          return markerCircle;
        case 2:
          return markerTriangle;
        case 3:
          return markerStar;
        case 4:
          return markerDiamond;
        default:
          return null;
      }
    },

    renderProjects() {
      return _.map(this.filterProjects, ({ position, title, id, type }) => (
        <Marker
          position={position}
          icon={this.iconType(type)}
          onClick={this.onMarkerClick.bind(null, id, title, position)}
        />
      ));
    },

    colorType(type) {
      switch (type) {
        case 2:
          return '#0078ff';
        case 3:
          return '#ff7937';
        case 4:
          return '#28d2b0';
        default:
          return '#fb3f62';
      }
    },

    renderText() {
      return _.map(this.filterProjects, ({ position, title, id, type }) => (
        <Text
          position={position}
          text={title}
          offset={[20, 2]}
          domStyle={{
            color: this.colorType(type),
            width: '60px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontWeight: 'bolder',
            fontSize: '15px'
          }}
          onClick={this.onMarkerClick.bind(null, id, title, position)}
        />
      ));
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
        <Header />
        <YtMap onMapClick={this.onMapClick}>
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
          <StreetsPolygon onStreetClick={this.onMapClick} />

          <Search options={this.filterProjects} onClick={this.onSearchClick} />
          <FooterTabs>{this.renderFooter()}</FooterTabs>
        </YtMap>

        <ParagraphModal ref="modal" />
      </div>
    );
  }
};
