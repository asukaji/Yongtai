import { ImageLayer } from '@amap/amap-vue';

import layerPromote from '@/assets/MapPlugin/layer-promote.png';

export default {
  name: 'PromoteLayer',

  render() {

    return <ImageLayer
      url={layerPromote}
      bounds={[
        [
          118.54454040527345,
          25.768358769107607
        ],
        [
          119.06776428222656,
          25.845629179944932
        ]
      ]}
    />;
  }
};
