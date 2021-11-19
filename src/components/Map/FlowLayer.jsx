import { ImageLayer } from '@amap/amap-vue';
import Mask from './Mask';

import layerFlow from '@/assets/MapPlugin/layer-flow.png';

export default {
  name: 'FlowLayer',

  render() {
    return (
      <div>
        <ImageLayer
          url={layerFlow}
          bounds={[
            [118.37484643554688, 25.62028620774471],
            [119.22009926757814, 26.111021607777472]
          ]}
        />
        <Mask />
      </div>
    );
  }
};
