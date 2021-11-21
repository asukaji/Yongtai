import { withAmap } from '@amap/amap-vue';

export default {
  name: 'MapConfig',

  mixins: [withAmap],

  mounted() {
    this.$map.setLimitBounds(this.$map.getBounds());
    this.$map.setFeatures(['bg', 'road']);
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
