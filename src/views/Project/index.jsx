import YtMap from '@/components/YtMap';
import { Marker, Text, InfoWindow } from '@amap/amap-vue';
import { StreetsPolygon } from '@/components/Map';
import ProjectsModal from './ProjectsModal';
import {
  ParagraphModal,
  FooterTabs,
  Search,
  Switcher
} from '@/components/Custom';
// import ProjectFilter from './ProjectFilter';
import SignList from './SignList';
import CreateMeeting from './CreateMeeting';
import Header from '../Header';
import { Tabs, TabPane } from 'element-ui';
import styles from './index.module.less';

import { fetchProjectList, fetchProjectDetail } from '@/api';
import { validPosition } from '@/utils';
import _ from 'lodash';

import markerModel from '@/assets/MapPlugin/marker-model.png';
import markerCircle from '@/assets/MapPlugin/marker-circle.png';
import markerDiamond from '@/assets/MapPlugin/marker-diamond.png';
import markerStar from '@/assets/MapPlugin/marker-star.png';
import markerTriangle from '@/assets/MapPlugin/marker-triangle.png';
import iconCalendar from '@/assets/Icon/icon-calendar.png';
import iconCamera from '@/assets/Icon/icon-camera.png';
import IconBack from '@/assets/Icon/icon-back.png';

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
        infoWindowContent: undefined,
        filter: ['province', 'city', 'other'],
        activeProject: undefined,
        tab: 'default',
        step: 0
      }
    };
  },

  computed: {
    planingProjects() {
      return this.state.showPlaning
        ? _.filter(
            this.projects?.list,
            ({ type }) => type === 1
            // eslint-disable-next-line
          )
        : [];
    },

    readyProjects() {
      return this.state.showReady
        ? _.filter(
            this.projects?.list,
            ({ type }) => type === 2
            // eslint-disable-next-line
          )
        : [];
    },

    workingProjects() {
      return this.state.showWorking
        ? _.filter(
            this.projects?.list,
            ({ type }) => type === 3
            // eslint-disable-next-line
          )
        : [];
    },

    completedProjects() {
      return this.state.showCompleted
        ? _.filter(
            this.projects?.list,
            ({ type }) => type === 4
            // eslint-disable-next-line
          )
        : [];
    },

    filterDefaultProjects() {
      return _.filter(
        _.concat(
          [],
          this.showProvince ? this.provinceProjects : [],
          this.showCity ? this.cityProjects : [],
          this.showOther ? this.otherProjects : []
        ),
        ({ position }) => validPosition(position)
      );
    },

    filterProjects() {
      if (this.isDefault) {
        return this.filterDefaultProjects;
      }
      return _.filter(
        [
          ...this.planingProjects,
          ...this.readyProjects,
          ...this.workingProjects,
          ...this.completedProjects
        ],
        ({ position }) => validPosition(position)
      );
    },

    showProvince() {
      return _.includes(this.state.filter, 'province');
    },

    showCity() {
      return _.includes(this.state.filter, 'city');
    },

    showOther() {
      return _.includes(this.state.filter, 'other');
    },

    provinceProjects() {
      return _.filter(this.projects?.list, ({ imp }) => _.includes(imp, '2'));
    },

    cityProjects() {
      return _.filter(this.projects?.list, ({ imp }) => _.includes(imp, '1'));
    },

    otherProjects() {
      return _.filter(this.projects?.list, ({ imp }) => _.includes(imp, '3'));
    },

    filterTexts() {
      return this.isDefault
        ? this.filterDefaultProjects
        : [...this.provinceProjects, ...this.cityProjects];
    },

    isDefault() {
      return this.state.tab === 'default';
    }
  },

  async mounted() {
    this.projects = await fetchProjectList();
  },

  methods: {
    onSwitchState(stateName, value) {
      this.onMapClick();
      this.$refs.ProjectsModal.close();

      const originValue = this.state[stateName];

      if (_.isString(value)) {
        _.assign(this.state, {
          [stateName]: _.includes(originValue, value)
            ? _.filter(originValue, (v) => v !== value)
            : _.concat(originValue, value)
        });
      } else {
        _.assign(this.state, { [stateName]: !originValue });
      }
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

    onMapClick(e) {
      _.assign(this.state, {
        infoWindowContent: undefined,
        infoVisible: false
      });

      if (_.isUndefined(e)) {
        return;
      }

      this.$refs.ProjectsModal.close();
    },

    onInfoWindowClick() {
      this.$refs.modal?.open(
        fetchProjectDetail.bind(null, this.state.infoWindowContent?.id),
        this.state.infoWindowContent?.title
      );

      this.state.activeProject = this.state.infoWindowContent;

      this.onMapClick();
    },

    onSearchClick([id, title, position]) {
      if (_.some(position, _.isNil) || !title) {
        this.onMapClick();
        return;
      }
      this.onMarkerClick(id, title, position);
    },

    onStateClick(hasProjects, stateName, event) {
      event?.preventDefault();
      event?.stopPropagation();

      if (
        (!this.state[_.camelCase(`show_${stateName}`)] &&
          !this[_.camelCase(`show_${stateName}`)]) ||
        !hasProjects
      ) {
        return;
      }

      this.$refs.search.close();
      this.$refs.ProjectsModal.open(this[`${stateName}Projects`]);
    },

    onFilterChange(e) {
      this.state.filter = e;
    },

    onModalClose() {
      this.state.step = 0;
    },

    setStep(step) {
      this.state.step = step;
    },

    setContacts(contacts) {
      _.assign(this.state.activeProject, { contacts });
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
      const projects = new Set();

      return _.map(
        this.filterProjects,
        ({ position, title, id, type, model }) => {
          if (projects.has(id)) {
            return null;
          } else {
            projects.add(id);

            return (this.isDefault && model) === '1' ? (
              <Marker
                key={`${id}.${this.isDefault}.${model}`}
                position={position}
                onClick={this.onMarkerNextClick.bind(null, id, title, position)}
              >
                <div
                  class={[
                    styles.markerModel,
                    'shake',
                    'shake-constant',
                    'shake-little',
                    'shake-opacity',
                    'shake-rotate'
                  ]}
                >
                  <img src={markerModel} />
                </div>
              </Marker>
            ) : (
              <Marker
                key={`${id}.${this.isDefault}.${model}`}
                position={position}
                icon={this.iconType(type)}
                onClick={this.onMarkerNextClick.bind(null, id, title, position)}
              />
            );
          }
        }
      );
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
      const projects = new Set();

      return _.map(this.filterTexts, ({ position, title, id, type, model }) => {
        if (projects.has(id)) {
          return null;
        } else {
          projects.add(id);

          return (
            <Text
              position={position}
              text={title}
              offset={model && this.isDefault ? [-45, 20] : [20, -2]}
              domStyle={{
                color:
                  model && this.isDefault ? '#FB3F62' : this.colorType(type),
                width: '120px',
                // overflow: 'hidden',
                // whiteSpace: 'nowrap',
                // textOverflow: 'ellipsis',
                fontWeight: 'bolder',
                fontSize: '15px'
              }}
              onClick={this.onMarkerNextClick.bind(null, id, title, position)}
            />
          );
        }
      });
    },

    renderDefaultFooter() {
      const {
        showProvince,
        showCity,
        showOther,
        provinceProjects,
        cityProjects,
        otherProjects
      } = this;

      return (
        <div class={styles.footer}>
          <div onClick={this.onSwitchState.bind(null, 'filter', 'province')}>
            <div class={[styles.legend, showProvince && styles.planing]}>
              省重点项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!_.size(provinceProjects),
                  'province'
                )}
              >
                {_.size(provinceProjects)}项
              </pre>
            </div>
            <Switcher value={showProvince} />
          </div>
          <div onClick={this.onSwitchState.bind(null, 'filter', 'city')}>
            <div class={[styles.legend, showCity && styles.ready]}>
              市重点项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!_.size(cityProjects),
                  'city'
                )}
              >
                {_.size(cityProjects)}项
              </pre>
            </div>
            <Switcher value={showCity} />
          </div>
          <div onClick={this.onSwitchState.bind(null, 'filter', 'other')}>
            <div class={[styles.legend, showOther && styles.working]}>
              倍增计划项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!_.size(otherProjects),
                  'other'
                )}
              >
                {_.size(otherProjects)}项
              </pre>
            </div>
            <Switcher value={showOther} />
          </div>
        </div>
      );
    },

    renderFooter() {
      const { showPlaning, showReady, showWorking, showCompleted } = this.state;

      return (
        <div class={styles.footer}>
          <div onClick={this.onSwitchState.bind(null, 'showPlaning')}>
            <div class={[styles.legend, showPlaning && styles.planing]}>
              <img src={markerCircle} />
              征迁项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!this.projects?.planing,
                  'planing'
                )}
              >
                {this.projects?.planing ?? 0}项
              </pre>
            </div>
            <Switcher value={showPlaning} />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showReady')}>
            <div class={[styles.legend, showReady && styles.ready]}>
              <img src={markerTriangle} />
              开工提速项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!this.projects?.ready,
                  'ready'
                )}
              >
                {this.projects?.ready ?? 0}项
              </pre>
            </div>
            <Switcher value={showReady} />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showWorking')}>
            <div class={[styles.legend, showWorking && styles.working]}>
              <img src={markerStar} />
              在建提速项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!this.projects?.working,
                  'working'
                )}
              >
                {this.projects?.working ?? 0}项
              </pre>
            </div>
            <Switcher value={showWorking} />
          </div>

          <div onClick={this.onSwitchState.bind(null, 'showCompleted')}>
            <div class={[styles.legend, showCompleted && styles.completed]}>
              <img src={markerDiamond} />
              竣工投产项目
              <pre
                onClick={this.onStateClick.bind(
                  null,
                  !!this.projects?.completed,
                  'completed'
                )}
              >
                {this.projects?.completed ?? 0}项
              </pre>
            </div>
            <Switcher value={showCompleted} />
          </div>
        </div>
      );
    }
  },

  render() {
    const { activeProject, step } = this.state;

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

          <Search
            ref="search"
            options={this.filterProjects}
            onClick={this.onSearchClick}
          />
          {/* <ProjectFilter onChange={this.onFilterChange} /> */}
          <ProjectsModal ref="ProjectsModal" onClick={this.onSearchClick} />

          <FooterTabs>
            <Tabs vModel={this.state.tab} type="card" class={styles.tabs}>
              <TabPane label="默认" name="default">
                {this.renderDefaultFooter()}
              </TabPane>
              <TabPane label="按项目阶段" name="timeline">
                {this.renderFooter()}
              </TabPane>
            </Tabs>
          </FooterTabs>
        </YtMap>

        <ParagraphModal
          ref="modal"
          onClose={this.onModalClose}
          onMounted={this.setContacts}
        >
          <div slot="title">
            {step > 0 ? (
              <div
                style={{
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onClick={this.setStep.bind(null, Math.floor(step - 1))}
              >
                <img src={IconBack} height="14" />
              </div>
            ) : (
              <div>
                <img
                  src={iconCalendar}
                  height="50"
                  onClick={this.setStep.bind(null, 1)}
                />
                <img
                  src={iconCamera}
                  height="50"
                  onClick={this.setStep.bind(null, 1.1)}
                />
              </div>
            )}
          </div>

          {step === 1 || step === 2 ? (
            <SignList
              id={activeProject?.id}
              step={step}
              onChangeStep={this.setStep.bind(null, step + 1)}
            />
          ) : null}
          {step === 1.1 ? (
            <CreateMeeting
              id={activeProject?.id}
              name={activeProject?.title}
              contacts={activeProject?.contacts}
            />
          ) : null}
        </ParagraphModal>
      </div>
    );
  }
};
