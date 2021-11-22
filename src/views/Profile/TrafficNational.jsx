import { NationalLayer } from '@/components/Map';
import { Marker } from '@amap/amap-vue';

import { ZOOM } from '@/constants';
import pointStart from '@/assets/MapPlugin/point-start.png';

export default {
  name: 'TrafficRailway',

  inject: ['map'],

  mounted() {
    // this.map.$refs.Map.setFeatures();
    this.map.$refs.Map.setZoom(ZOOM);
  },

  render() {
    return (
      <div>
        <NationalLayer />
        <Marker
          position={[118.934292, 25.848546]}
          icon={pointStart}
          label={{ content: '永泰站', direction: 'top' }}
        />
      </div>
    );
  }
};
