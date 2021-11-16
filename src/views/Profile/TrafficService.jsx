import { Fragment } from 'vue-fragment';
import { Marker, Polyline } from '@amap/amap-vue';

import _ from 'lodash';

import { TRAFFIC_POINTS, YONGTAI } from '@/constants';
import pointStart from '@/assets/MapPlugin/point-city.png';

export default {
  name: 'TrafficService',

  methods: {
    renderMarkers() {
      return [];
    },

    renderPolyline() {
      return [];
    }
  },

  render() {
    return (
      <Fragment>
        {this.renderPolyline()}
        {this.renderMarkers()}
        <Marker
          position={YONGTAI}
          icon={pointStart}
          label={{ content: '永泰县', direction: 'top' }}
        />
      </Fragment>
    );
  }
};
