import { withAmap } from '@amap/amap-vue';

import _ from 'lodash';

export default {
  name: 'MapConfig',

  mixins: [withAmap],

  mounted() {
    // this.$map.setLimitBounds(this.$map.getBounds());
    this.$map.setFeatures(['bg', 'road']);
    this.$map.on('zoomend', _.debounce(() => {
      this.$nextTick(() => {
        this.$forceUpdate();
      });
    }, 2048));
  },

  methods: {
    setZoom(zoom) {
      this.$map.setZoom(zoom);
    },

    setFeatures(...features) {
      this.$map.setFeatures(['bg', ...features]);
    }
  },

  render() {
    return null;
  }
};
