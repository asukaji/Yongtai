import { Polygon } from '@amap/amap-vue';
import { Text } from '@amap/amap-vue';

import VueTypes from 'vue-types';
import _ from 'lodash';

import { features } from '@/assets/Geo/village.json';
// import { features } from '@/assets/Geo/format.json';

export default {
  name: 'VillagesPolygon',

  props: {
    features: VueTypes.array.def(features),
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
        this.features,
        ({ geometry: { coordinates } }) => coordinates
      );

      return coordinates;
    },

    points() {
      return _.map(this.features, ({ properties: { point, name } }) => ({
        point,
        name
      }));
    }
  },

  methods: {
    renderText() {
      return _.map(this.points, (point) => (
        <Text
          position={point.point}
          text={point.name}
          offset={[-36, -16]}
          domStyle={{ color: '#fff' }}
          onClick={this.onClick.bind(this, point)}
        />
      ));
    },

    onClick(point) {
      this.$emit('villageClick', point);
    }
  },

  render() {
    return (
      <div>
        {_.map(this.sortedCoordinates, (coordinates, index) => (
          <Polygon
            path={coordinates}
            strokeColor="#0078FF"
            strokeWeight={1}
            fillColor="#0078FF"
            fillOpacity={0.15}
            onClick={this.onClick.bind(this, this.points[index])}
          />
        ))}
        {this.mark && this.renderText()}
      </div>
    );
  }
};
