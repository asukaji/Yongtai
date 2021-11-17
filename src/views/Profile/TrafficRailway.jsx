import { RailwayLayer, Mask } from '@/components/Map';

import { ZOOM } from '@/constants';

export default {
  name: 'TrafficRailway',

  inject: ['map'],

  mounted() {
    this.map.$refs.Map.setFeatures();
    this.map.$refs.Map.setZoom(ZOOM);
  },

  render() {
    return (
      <div>
        <Mask />
        <RailwayLayer />
      </div>
    );
  }
};
