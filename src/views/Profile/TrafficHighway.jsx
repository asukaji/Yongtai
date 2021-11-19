import { ZOOM } from '@/constants';
import { Marker, Text } from '@amap/amap-vue';

import { fetchHighwayList } from '@/api';
import _ from 'lodash';
import pointRailwayRed from '@/assets/MapPlugin/point-railway-red.png';

export default {
  name: 'TrafficHighway',

  inject: ['map'],

  data() {
    return {
      area: undefined
    };
  },

  async mounted() {
    this.map.$refs.Map.setZoom(ZOOM);
    this.area = await fetchHighwayList();
  },

  methods: {
    renderProjects() {
      return _.map(this.area, ({ position }) => (
        <Marker position={position} icon={pointRailwayRed} />
      ));
    },

    renderText() {
      return _.map(this.area, ({ position, title }) => (
        <Text
          position={position}
          text={title}
          offset={[-20, 20]}
          domStyle={{ color: '#FB3F62' }}
        />
      ));
    }
  },

  render() {
    return (
      <div>
        {this.renderProjects()}
        {this.renderText()}
      </div>
    );
  }
};
