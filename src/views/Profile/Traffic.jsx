import YtMap from '@/components/YtMap';
import { StreetsPolygon } from '@/components/Map';
import { FooterTabs, ParagraphModal, Float } from '@/components/Custom';
import Service from './TrafficService';
import Railway from './TrafficRailway';
import Highway from './TrafficHighway';
import National from './TrafficNational';
import Provincial from './TrafficProvincial';
import styles from './index.module.less';

import _ from 'lodash';

import iconService from '@/assets/Icon/icon-service.png';
import iconServiceActive from '@/assets/Icon/icon-service-active.png';
import iconRailway from '@/assets/Icon/icon-railway.png';
import iconRailwayActive from '@/assets/Icon/icon-railway-active.png';
import iconHighway from '@/assets/Icon/icon-highway.png';
import iconHighwayActive from '@/assets/Icon/icon-highway-active.png';
import iconNational from '@/assets/Icon/icon-national.png';
import iconNationalActive from '@/assets/Icon/icon-national-active.png';
import iconProvincial from '@/assets/Icon/icon-provincial.png';
import iconProvincialActive from '@/assets/Icon/icon-provincial-active.png';

const TABS = [
  {
    name: 'service',
    title: '服务区距离',
    icon: iconService,
    activeIcon: iconServiceActive
  },
  {
    name: 'railway',
    title: '铁路',
    icon: iconRailway,
    activeIcon: iconRailwayActive
  },
  {
    name: 'highway',
    title: '高速公路',
    icon: iconHighway,
    activeIcon: iconHighwayActive
  },
  {
    name: 'national',
    title: '国道干线',
    icon: iconNational,
    activeIcon: iconNationalActive
  },
  {
    name: 'provincial',
    title: '省道干线',
    icon: iconProvincial,
    activeIcon: iconProvincialActive
  }
];

export default {
  name: 'Traffic',

  provide() {
    return {
      map: this
    };
  },

  data() {
    return {
      activeName: ['service']
    };
  },

  computed: {
    showService() {
      return _.includes(this.activeName, 'service');
    },
    showRailway() {
      return _.includes(this.activeName, 'railway');
    },
    showHighway() {
      return _.includes(this.activeName, 'highway');
    },
    showNational() {
      return _.includes(this.activeName, 'national');
    },
    showProvincial() {
      return _.includes(this.activeName, 'provincial');
    }
  },

  methods: {
    onClick(name) {
      const activeName = new Set(this.activeName);

      if (activeName.has(name)) {
        activeName.delete(name);
        this.activeName = [...activeName];
      } else {
        activeName.add(name);
        this.activeName = [...activeName];
      }
    },

    renderFooterTabs() {
      return _.map(TABS, ({ name, activeIcon, icon, title }) => (
        <div
          key={name}
          class={[styles.tabItem, this.activeName === name && styles.active]}
          onClick={this.onClick.bind(null, name)}
        >
          <img src={_.includes(this.activeName, name) ? activeIcon : icon} />
          {title}
        </div>
      ));
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <YtMap ref="Map">
          <StreetsPolygon />
          {/* <router-view></router-view> */}

          {this.showService ? <Service /> : null}
          {this.showRailway ? <Railway /> : null}
          {this.showHighway ? <Highway /> : null}
          {this.showNational ? <National /> : null}
          {this.showProvincial ? <Provincial /> : null}

          <Float bottom="100px" onClick={() => this.$refs.modal?.open()} />
          <FooterTabs>{this.renderFooterTabs()}</FooterTabs>
        </YtMap>
        <ParagraphModal ref="modal">
          <h2>交通情况</h2>
          <pre>Traffic Conditions</pre>
          <p>
            “十三五”时期永泰县交通基础设施建设取得显著成绩，对外依托铁路和高速的交通基本形成，永泰进入了“双高”时代，使永泰到南昌仅需3个小时，到厦门1个半小时，到福州、莆田仅需15分钟左右。永泰至闽南、闽西，江西等主要客源地的旅行时间大大减少，永泰的域外交通更为快速便捷。对内强化普通国省干线对重要城镇、产业基地、旅游景区、交通枢纽节点的衔接。路网加密、干线提级、城镇快捷、瓶颈突破，实现综合交通基础设施总体水平提升，便捷舒适的公众出行服务体系和经济高效的现代交通物流体系基本形成。
            截至2020年底，永泰现有高速公路枢纽有甬莞高速的葛岭互通、永泰东互通、永泰西互通、梧桐互通、莆炎高速嵩口互通。共有农村公路1424条，总里程2341公里（其中：县道13条282公里、乡道136条792公里、村道1274条1267公里）；农村公路密度从“十二五”末的每百平方公里71.6公里增至每百平方公里104.46公里，增长了45.89%；通建制村硬化公路达到100%，通自然村硬化公路达到86%。{' '}
          </p>
        </ParagraphModal>
      </div>
    );
  }
};
