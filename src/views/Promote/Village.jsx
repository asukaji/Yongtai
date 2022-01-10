import { Text } from '@amap/amap-vue';

import { fetchTownList } from '@/api';
import _ from 'lodash';

export default {
  name: 'Village',

  inject: ['map'],

  data() {
    return {
      areas: undefined
    };
  },

  computed: {
    area() {
      const { activeArea } = this.map;
      const { areas } = this;

      if (!activeArea) {
        return undefined;
      }

      const [name, value] = activeArea;
      const nextArea = _.find(areas, ({ title }) => title === name);

      return nextArea ? _.assign({}, nextArea, { value }) : undefined;
    }
  },

  async mounted() {
    this.areas = await fetchTownList();
  },

  methods: {
    renderText() {
      return this.area ? (
        <Text
          position={this.area.position}
          text={this.area.value}
          offset={[-20, 0]}
          domStyle={{ color: '#333', backgroundColor: '#fff' }}
        />
      ) : null;
    }
  },

  render() {
    return <div>{this.renderText()}</div>;
  }
};
