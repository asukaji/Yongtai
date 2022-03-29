import { Polygon } from '@amap/amap-vue';
import { Fragment } from 'vue-fragment';
import { Text } from '@amap/amap-vue';

import VueTypes from 'vue-types';
import _ from 'lodash';

import { features } from '@/assets/Geo/format.json';

const color = ['#28D2B0', '#FF7937', '#AE3AF0', '#0078FF'];

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

      return coordinates;
    },

    points() {
      return _.map(features, ({ properties: { point, name } }) => ({
        point,
        name
      }));
    }
  },

  methods: {
    renderText() {
      return _.map(this.points, ({ point, name }, index) => (
        <Text
          position={point}
          text={name}
          offset={[-36, -16]}
          domStyle={{ color: color[index % 4] }}
        />
      ));
    }
  },

  render() {
    return (
      <Fragment>
        {_.map(this.sortedCoordinates, (coordinates, index) => (
          <Polygon
            path={coordinates}
            strokeColor="#0078FF"
            strokeWeight={1}
            fillColor={color[index % 4]}
            fillOpacity={0.15}
            onClick={this.$emit.bind(this, 'streetClick', this.points[index])}
          />
        ))}
        {this.mark && this.renderText()}
      </Fragment>
    );
  }
};
