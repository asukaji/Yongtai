import { Marker, Text, Polyline } from '@amap/amap-vue';

import _ from 'lodash';

import { TRAFFIC_POINTS, YONGTAI } from '@/constants';
import pointStart from '@/assets/MapPlugin/point-start.png';

export default {
  name: 'TrafficService',

  inject: ['map'],

  mounted() {
    // this.map.$refs.Map.setFeatures();
    this.map.$refs.Map.setZoom(9.6);
  },

  methods: {
    renderMarkers() {
      return _.map(TRAFFIC_POINTS, ({ icon, position }) => (
        <Marker position={position} icon={icon} offset={[-10, -10]} />
      ));
    },

    renderPolyline() {
      return _.map(TRAFFIC_POINTS, ({ position, name, color }) => (
        <Polyline
          path={[position, YONGTAI]}
          text={name}
          strokeColor={color}
          strokeStyle="dashed"
        />
      ));
    },

    renderText() {
      return _.map(TRAFFIC_POINTS, ({ position, name, color, distance }) =>
        [
          <Text
            position={position}
            text={name}
            offset={[-20, 10]}
            domStyle={{ color }}
          />,
          <Text
            position={[
              (position[0] + YONGTAI[0]) / 2,
              (position[1] + YONGTAI[1]) / 2
            ]}
            text={distance}
            offset={[-20, -20]}
            domStyle={{ color }}
          />
        ].flat()
      );
    }
  },

  render() {
    return (
      <div>
        {this.renderPolyline()}
        {this.renderMarkers()}
        {this.renderText()}
        <Marker
          position={YONGTAI}
          icon={pointStart}
          label={{ content: '永泰县', direction: 'top' }}
        />
      </div>
    );
  }
};
