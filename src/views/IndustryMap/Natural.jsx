import { Marker, Text } from '@amap/amap-vue';

import { fetchNatures } from '@/api';
import _ from 'lodash';

import { VILLAGE_NAME } from './index';

export default {
  name: 'Natural',

  data() {
    return {
      markers: []
    };
  },

  computed: {
    street() {
      return this.$route.params.street ?? VILLAGE_NAME;
    }
  },

  watch: {
    street: {
      immediate: true,

      async handler(street) {
        if (!street) {
          return;
        }

        this.markers = Object.freeze(
          await fetchNatures(this.street, 'natural')
        );
      }
    }
  },

  async mounted() {
    this.markers = Object.freeze(await fetchNatures(this.street, 'natural'));
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
