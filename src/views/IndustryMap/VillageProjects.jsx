import { Marker, Text } from '@amap/amap-vue';

import { fetchProjectByVillage } from '@/api';
import _ from 'lodash';

export default {
  name: 'VillageProjects',

  data() {
    return {
      markers: []
    };
  },

  computed: {
    village() {
      return this.$route.params.village;
    }
  },

  watch: {
    village: {
      immediate: true,

      async handler(village) {
        if (!village) {
          this.markers = [];
          return;
        }

        this.markers = Object.freeze(await fetchProjectByVillage(village));
      }
    }
  },

  methods: {
    renderMarkers() {
      return _.map(this.markers, ({ position, icon, name }) => (
        <Marker position={position} icon={icon} key={name} />
      ));
    },

    renderText() {
      return _.map(this.markers, ({ position, name }) => (
        <Text
          position={position}
          text={name}
          offset={[8 - _.size(name) * 6, -24]}
          domStyle={{
            color: '#fff',
            fontWeight: 'bolder',
            fontSize: '12px'
          }}
        />
      ));
    }
  },

  render() {
    return (
      <div>
        {this.renderMarkers()}
        {this.renderText()}
      </div>
    );
  }
};
