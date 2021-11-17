import { withAmap } from '@amap/amap-vue';

export default {
  name: 'MapConfig',

  mixins: [withAmap],

  mounted() {
    this.$map.setLimitBounds(this.$map.getBounds());
    console.log(this.$map.setFeatures);
  },

  render() {
    return null;
  }
};
