import { Polygon } from '@amap/amap-vue';

import _ from 'lodash';

import { coordinates } from '@/assets/Geo/Yongtai.json';

const outer = [
  [
    [-360, 90],
    [360, -90],
    [360, 90]
  ]
];

export default {
  name: 'MapMask',

  render() {
    return (
      <Polygon
        path={_.concat(outer, [coordinates])}
        strokeColor="transparent"
        strokeWeight={1}
        fillColor="#fff"
        fillOpacity={0.6}
        onClick={this.$emit.bind(this, 'maskClick')}
      />
    );
  }
};
