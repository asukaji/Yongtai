import { ImageLayer } from '@amap/amap-vue';

import layerProvincial from '@/assets/MapPlugin/layer-provincial.png';

export default {
  name: 'FlowLayer',

  render() {
    return (
      <div>
        <ImageLayer
          url={layerProvincial}
          bounds={[
            [118.41751098632811, 25.71331155053841],
            [119.18930053710938, 25.922231585619894]
          ]}
        />
      </div>
    );
  }
};
