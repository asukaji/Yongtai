import { Polygon } from '@amap/amap-vue';
import { Fragment } from 'vue-fragment';
import { Text } from '@amap/amap-vue';

import { fetchTownList } from '@/api';
import VueTypes from 'vue-types';
import _ from 'lodash';

import { features } from '@/assets/Geo/Streets.json';

export default {
  name: 'StreetsPolygon',

  props: {
    fillColor: VueTypes.string.def(),
    mark: VueTypes.bool.def(true)
  },

  data() {
    return {
      area: undefined
    };
  },

  computed: {
    sortedCoordinates() {
      const coordinates = _.map(
        features,
        ({ geometry: { coordinates } }) => coordinates
      );

      return _.sortBy(coordinates, ['1', '0']);
    }
  },

  async mounted() {
    if (this.mark) {
      this.area = await fetchTownList();
    }
  },

  methods: {
    renderText() {
      return _.map(this.area, ({ position, title }) => (
        <Text
          position={position}
          text={title}
          offset={[-36, -16]}
          domStyle={{ color: this.mark ? 'rgba(0, 34, 250, 0.6)' : '#0022fa' }}
        />
      ));
    }
  },

  render() {
    return (
      <Fragment>
        {_.map(this.sortedCoordinates, (coordinates) => (
          <Polygon
            path={coordinates}
            strokeColor="#0078FF"
            strokeWeight={1}
            fillColor={this.fillColor ?? 'transparent'}
            fillOpacity={0.3}
            onClick={this.$emit.bind(this, 'streetClick')}
          />
        ))}
        {this.renderText()}
      </Fragment>
    );
  }
};
