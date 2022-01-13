import { Marker } from '@amap/amap-vue';
import styles from './village.module.less';

import { fetchTownList, fetchVillages, fetchProjectsByVillages } from '@/api';
import _ from 'lodash';

import position from '@/assets/Icon/icon-village-position.png';
import positionRed from '@/assets/Icon/icon-village-position-red.png';
import positionGreen from '@/assets/Icon/icon-village-position-green.png';
import text from '@/assets/Icon/icon-village-text.png';

export default {
  name: 'Village',

  inject: ['map'],

  data() {
    return {
      areas: undefined,
      villages: undefined
    };
  },

  computed: {
    area() {
      const { activeArea } = this.map;
      const { areas } = this;

      if (!activeArea) {
        return undefined;
      }

      const [name, value, nameCode, tag] = activeArea;
      const nextArea = _.find(areas, ({ title }) => title === name);

      return _.assign({ value, nameCode, tag }, nextArea);
    }
  },

  watch: {
    async area(value) {
      if (value) {
        this.map.$refs.drawer?.close();
        this.villages = await fetchVillages(value.nameCode, this.map.type);
      }
    }
  },

  async mounted() {
    this.areas = await fetchTownList();
  },

  methods: {
    async onClick(vallage) {
      const projects = _.map(
        await fetchProjectsByVillages(vallage),
        (project) => ({ ...project, bottom: `地区：永泰县/${vallage}` })
      );

      this.map.$refs.drawer?.open(projects);
    },

    renderPosition() {
      switch (this.area.tag) {
        case 'red':
          return <img src={positionRed} class={styles.tag} />;
        case 'green':
          return <img src={positionGreen} class={styles.tag} />;
        case 'blue':
          return <img src={position} class={styles.tag} />;
        default:
          return null;
      }
    },

    renderText() {
      return _.map(this.villages, ({ vallage, latitude, longitude }) => (
        <Marker
          position={[longitude, latitude]}
          offset={[-160, -45]}
          onClick={this.onClick.bind(null, vallage)}
        >
          <div class={styles.marker}>
            <img src={text} />
            <p>{vallage}</p>
            {this.renderPosition()}
          </div>
        </Marker>
      ));
    }
  },

  render() {
    return <div>{this.renderText()}</div>;
  }
};
