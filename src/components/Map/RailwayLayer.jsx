import { ImageLayer } from '@amap/amap-vue';

import RailwayPromote from '@/assets/MapPlugin/layer-railway.png';

export default {
  name: 'RailwayPromote',

  render() {
    return (
      <ImageLayer
        url={RailwayPromote}
        bounds={[
          [118.49990844726562,
            25.72320],
          [119.10500,
            26.01012]
        ]}
      />
    );
  }
};
