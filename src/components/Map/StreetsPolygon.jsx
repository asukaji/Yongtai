import { Polygon } from '@amap/amap-vue';
import { Fragment } from 'vue-fragment';

import _ from 'lodash';

import { features } from '@/assets/Geo/Streets.json';

const FILL_COLORS = ['#FF7937', '#0078FF', '#AE3AF0', '#28D2B0'];

export default {
  name: 'StreetsPolygon',

  computed: {
    sortedCoordinates() {
      const coordinates = _.map(features, ({ geometry: { coordinates } }) => coordinates);

      return _.sortBy(coordinates, ['1', '0']);
    }
  },

  render() {
    return <Fragment>
      {_.map(
        this.sortedCoordinates,
        (coordinates, index) => 
          <Polygon
            path={coordinates}
            strokeColor="#0078FF"
            strokeWeight={1}
            fillColor={FILL_COLORS[index % 4]}
            fillOpacity={0.3}
          />
      )}
    </Fragment>;
  }
};
