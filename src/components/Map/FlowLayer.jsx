import { ImageLayer, Text } from '@amap/amap-vue';
import Mask from './Mask';

import layerFlow from '@/assets/MapPlugin/layer-flow.png';
import { CENTER } from '@/constants';

export default {
  name: 'FlowLayer',

  render() {
    return (
      <div>
        <Text
          position={CENTER}
          text="大樟溪流域"
          offset={[-200, -100]}
          domStyle={{
            color: 'rgba(0, 120, 255, 0.3)',
            fontSize: '64px',
            letterSpacing: '20px'
          }}
        />
        <Mask />
        <ImageLayer
          url={layerFlow}
          bounds={[
            [118.37484643554688, 25.62028620774471],
            [119.22009926757814, 26.111021607777472]
          ]}
          zooms={[10, 14]}
          zIndex={2}
        />
      </div>
    );
  }
};
