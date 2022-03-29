import { VillagesPolygon } from '@/components/Map';

import { CENTER } from '@/constants';

export default {
  name: 'Street',

  inject: ['map'],

  computed: {
    point() {
      return this.$route.query.point ?? CENTER;
    }
  },

  mounted() {
    this.map.$refs.Map.setZoom(12);
    this.map.$refs.Map?.setCenter(this.point);
  },

  render() {
    return (
      <div>
        <VillagesPolygon />
      </div>
    );
  }
};
