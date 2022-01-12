import { Marker } from '@amap/amap-vue';
import styles from './village.module.less';

import { fetchTownList, fetchVillages, fetchProjectsByVillages } from '@/api';
import _ from 'lodash';

import position from '@/assets/Icon/icon-village-position.png';
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

      const [name, value, nameCode] = activeArea;
      const nextArea = _.find(areas, ({ title }) => title === name);

      return _.assign({ value, nameCode }, nextArea);
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

    renderText() {
      return _.map(this.villages, ({ vallage, latitude, longitude }) => (
        <Marker
          position={[longitude, latitude]}
          onClick={this.onClick.bind(null, vallage)}
        >
          <div class={styles.marker}>
            <img src={text} />
            <p>{vallage}</p>
            <img src={position} />
          </div>
        </Marker>
      ));
    }
  },

  render() {
    return <div>{this.renderText()}</div>;
  }
};
