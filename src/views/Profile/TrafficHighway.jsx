import { Mask } from '@/components/Map';

import { ZOOM } from '@/constants';

export default {
  name: 'TrafficHighway',

  inject: ['map'],

  mounted() {
    this.map.$refs.Map.setFeatures('road');
    this.map.$refs.Map.setZoom(ZOOM);
  },

  render() {
    return (
      <div>
        <Mask />
      </div>
    );
  }
};
