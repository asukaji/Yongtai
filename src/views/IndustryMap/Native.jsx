import { Marker, Text } from '@amap/amap-vue';

import { fetchNatures } from '@/api';
import _ from 'lodash';

export default {
  name: 'Native',

  data() {
    return {
      markers: []
    };
  },

  computed: {
    street() {
      return this.$route.params.street;
    }
  },

  async mounted() {
    this.markers = Object.freeze(await fetchNatures(this.street, 'native'));
  },

  methods: {
    renderMarkers() {
      return _.map(this.markers, ({ position, icon }) => (
        <Marker position={position} icon={icon} />
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
