import { ImageLayer } from '@amap/amap-vue';

import layerHighway from '@/assets/MapPlugin/layer-highway.png';

export default {
  name: 'FlowLayer',

  render() {
    return (
      <div>
        <ImageLayer
          url={layerHighway}
          bounds={[
            [118.41527124023438, 25.673711282473864],
            [119.14348876953125, 25.927171969164704]
          ]}
          zooms={[10, 14]}
          zIndex={2}
        />
      </div>
    );
  }
};
