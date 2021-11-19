import { ImageLayer } from '@amap/amap-vue';

import layerTour from '@/assets/MapPlugin/layer-tour.png';

export default {
  name: 'TourLayer',

  render() {

    return <ImageLayer
      url={layerTour}
      bounds={[
        [
          118.37631225585938,
          25.65514412535458
        ],
        [
          119.20044437499,
          26.083921329998336
        ]
      ]}
    />;
  }
};
