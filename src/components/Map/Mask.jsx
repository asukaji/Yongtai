import { Polygon } from '@amap/amap-vue';

import _ from 'lodash';

import { coordinates } from '@/assets/Geo/Yongtai.json';

const outer = [[[-360,90],[360,-90],[360,90]]];

export default {
  name: 'Mask',

  render() {

    return <Polygon
      path={_.concat(outer, [coordinates])}
      strokeColor="#0078FF"
      strokeWeight={1}
      fillColor="#fff"
      fillOpacity={0.6}
    />;
  }
};
