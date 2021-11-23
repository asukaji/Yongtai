import { ImageLayer } from '@amap/amap-vue';

import layerNational from '@/assets/MapPlugin/layer-national.png';

export default {
  name: 'FlowLayer',

  render() {
    return (
      <div>
        <ImageLayer
          url={layerNational}
          bounds={[
            [118.73336791992188, 25.693513062561056],
            [119.08905029296874, 26.05308170164881]
          ]}
          zooms={[10, 14]}
          zIndex={2}
        />
      </div>
    );
  }
};
