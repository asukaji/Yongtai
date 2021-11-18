import { Polygon } from '@amap/amap-vue';
import { Fragment } from 'vue-fragment';

import VueTypes from 'vue-types';
import _ from 'lodash';

import { features } from '@/assets/Geo/Streets.json';

export default {
  name: 'StreetsPolygon',

  props: {
    fillColor: VueTypes.string.def()
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
      </Fragment>
    );
  }
};
