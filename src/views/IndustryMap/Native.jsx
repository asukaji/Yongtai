import { Marker, Text } from '@amap/amap-vue';

import { fetchNatures } from '@/api';
import _ from 'lodash';

import { VILLAGE_NAME } from './index';
import { INDUSTRY_MAP } from '@/constants';

export default {
  name: 'Native',

  inject: ['map'],

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

        this.markers = Object.freeze(await fetchNatures(this.street, 'native'));
      }
    }
  },

  async mounted() {
    this.markers = Object.freeze(await fetchNatures(this.street, 'native'));
  },

  methods: {
    onClick(item) {
      this.$emit('move', item);
      // if (point) {
      //   this.map.$refs.Map.setCenter(point);
      //   this.map.$refs.Map.setZoom(12);
      // }

      // this.$router.replace(`/${INDUSTRY_MAP}/${name}/profile`);
    },

    renderMarkers() {
      return _.map(this.markers, (item) => (
        <Marker
          position={item.position}
          icon={item.icon}
          key={item.id}
          // onClick={this.onClick.bind(this, { name: village, point: position })}
          onClick={this.onClick.bind(this, item)}
        />
      ));
    },

    renderText() {
      return _.map(this.markers, (item) => (
        <Text
          position={item.position}
          text={item.name}
          offset={[8 - _.size(name) * 6, -24]}
          onClick={this.onClick.bind(this, item)}
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
