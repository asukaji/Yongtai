import YtMap from '@/components/YtMap';
import { TourLayer } from '@/components/Map';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { ParagraphModal, FooterTabs, Search } from '@/components/Custom';
import Header from '../Header';
import styles from './index.module.less';

import { fetchTourList, fetchTourDetail } from '@/api';
import { validPosition } from '@/utils';
import _ from 'lodash';

import markerCircleBlue from '@/assets/MapPlugin/marker-circle-blue.png';
import markerCircleGreen from '@/assets/MapPlugin/marker-circle-green.png';
import markerCircleOrange from '@/assets/MapPlugin/marker-circle-orange.png';
import markerStarRed from '@/assets/MapPlugin/marker-star-red.png';
import markerTriangleBlack from '@/assets/MapPlugin/marker-triangle-black.png';

export default {
  name: 'Tour',

  data() {
    return {
      area: undefined,
      state: {
        showPlaning: true,
        showReady: true,
        showWorking: true,
        showCompleted: true,
        showPending: true,
        infoVisible: false,
        infoWindowContent: undefined
      }
    };
  },

  computed: {
    planingProjects() {
      // prettier-ignore
      return this.state.showPlaning
        ? _.filter(
          this.area,
          ({ type, position }) => type === '1' && validPosition(position)
        )
        : [];
    },

    readyProjects() {
      // prettier-ignore
      return this.state.showReady
        ? _.filter(
          this.area,
          ({ type, position }) => type === '2' && validPosition(position)
          // eslint-disable-next-line
          )
        : [];
    },

    workingProjects() {
      // prettier-ignore
      return this.state.showWorking
        ? _.filter(
          this.area,
          ({ type, position }) => type === '3' && validPosition(position)
          // eslint-disable-next-line
          )
        : [];
    },

    completedProjects() {
      // prettier-ignore
      return this.state.showCompleted
        ? _.filter(
          this.area,
          ({ type, position }) => type === '4' && validPosition(position)
          // eslint-disable-next-line
          )
        : [];
    },

    pendingProjects() {
      // prettier-ignore
      return this.state.showCompleted
        ?
        _.filter(
          this.area,
          ({ type, position }) => type === '5' && validPosition(position)
        )
        : [];
    },

    planings() {
      return _.size(_.filter(this.area, ['type', '1']));
    },

    readys() {
      return _.size(_.filter(this.area, ['type', '2']));
    },

    workings() {
      return _.size(_.filter(this.area, ['type', '3']));
    },

    completeds() {
      return _.size(_.filter(this.area, ['type', '4']));
    },

    pendings() {
      return _.size(_.filter(this.area, ['type', '5']));
    },

    filterProjects() {
      return [
        ...this.planingProjects,
        ...this.readyProjects,
        ...this.workingProjects,
        ...this.completedProjects,
        ...this.pendingProjects
      ];
    }
  },

  async mounted() {
    this.area = await fetchTourList();
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

    onMarkerNextClick(id, title, position) {
      _.assign(this.state, {
        infoWindowContent: { id, title, position }
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
        fetchTourDetail.bind(null, this.state.infoWindowContent?.id),
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
        case '1':
          return markerTriangleBlack;
        case '2':
          return markerCircleBlue;
        case '3':
          return markerCircleGreen;
        case '4':
          return markerStarRed;
        case '5':
          return markerCircleOrange;
        default:
          return null;
      }
    },

    renderProjects() {
      return _.map(this.filterProjects, ({ position, title, id, type }) => (
        <Marker
          position={position}
          icon={this.iconType(type)}
          onClick={this.onMarkerNextClick.bind(null, id, title, position)}
        />
      ));
    },

    colorType(type) {
      switch (type) {
        case '2':
          return '#0078ff';
        case '3':
          return '#28D2B0';
        case '4':
          return '#fb3f62';
        case '5':
          return '#FF7937';
        default:
          return '#4F5256';
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
            fontWeight: 'bolder',
            fontSize: '15px'
          }}
          onClick={this.onMarkerNextClick.bind(null, id, title, position)}
        />
      ));
    },

    renderFooter() {
      const {
        showPlaning,
        showReady,
        showWorking,
        showCompleted,
        showPending
      } = this.state;

      return (
        <div class={styles.footer}>
          {this.planings ? <div onClick={this.onSwitchState.bind(null, 'showPlaning')}>
            <div class={[styles.legend, styles.planing]}>
              <img src={markerTriangleBlack} />
              传统村落
              <pre>{this.planings}项</pre>
            </div>
            <div class={[styles.status, showPlaning && styles.active]} />
          </div> : null}

          {this.readys ? <div onClick={this.onSwitchState.bind(null, 'showReady')}>
            <div class={[styles.legend, styles.ready]}>
              <img src={markerCircleBlue} />
              重点乡镇
              <pre>{this.readys}项</pre>
            </div>
            <div class={[styles.status, showReady && styles.active]} />
          </div> : null}

          {this.workings ? <div onClick={this.onSwitchState.bind(null, 'showWorking')}>
            <div class={[styles.legend, styles.completed]}>
              <img src={markerCircleGreen} />
              风景区
              <pre>{this.workings}项</pre>
            </div>
            <div class={[styles.status, showWorking && styles.active]} />
          </div> : null}

          {this.completeds ? <div onClick={this.onSwitchState.bind(null, 'showCompleted')}>
            <div class={[styles.legend, styles.planing]}>
              <img src={markerStarRed} />
              特色庄寨
              <pre>{this.completeds}项</pre>
            </div>
            <div class={[styles.status, showCompleted && styles.active]} />
          </div> : null}

          {this.pendings ? <div onClick={this.onSwitchState.bind(null, 'showPending')}>
            <div class={[styles.legend, styles.working]}>
              <img src={markerCircleOrange} />
              重点项目
              <pre>{this.pendings}项</pre>
            </div>
            <div class={[styles.status, showPending && styles.active]} />
          </div> : null}
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
          <TourLayer />

          <Search options={this.filterProjects} onClick={this.onSearchClick} />
          <FooterTabs>{this.renderFooter()}</FooterTabs>
        </YtMap>

        <ParagraphModal ref="modal" />
      </div>
    );
  }
};
