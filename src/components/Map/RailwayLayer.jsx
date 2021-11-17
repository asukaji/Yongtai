import { ImageLayer } from '@amap/amap-vue';

import RailwayPromote from '@/assets/MapPlugin/layer-railway.png';

export default {
  name: 'RailwayPromote',

  render() {
    return (
      <ImageLayer
        url={RailwayPromote}
        bounds={[
          [118.54454040527345, 25.768358769107607],
          [119.06776428222656, 25.845629179944932]
        ]}
      />
    );
  }
};
