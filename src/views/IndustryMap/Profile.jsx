import { Marker, Text } from '@amap/amap-vue';

import { fetchNatures } from '@/api';
import _ from 'lodash';

import { VILLAGE_NAME } from './index';
import { INDUSTRY_MAP } from '@/constants';

export default {
  name: 'Profile',

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
        if (street === '一镇一品') {
          this.markers = Object.freeze(
            _.concat(
              await fetchNatures('永泰县', 'town')
              // await fetchNatures(this.street, 'natural'),
              // await fetchNatures(this.street, 'native')
            )
          );
          return;
        }

        this.markers = Object.freeze(
          _
            .concat
            // await fetchNatures('永泰县', 'town'),
            // await fetchNatures(this.street, 'native')
            ()
        );
      }
    }
  },

  async mounted() {
    this.markers = Object.freeze(
      _.concat(
        await fetchNatures('永泰县', 'town')
        // await fetchNatures(this.street, 'natural'),
        // await fetchNatures(this.street, 'native')
      )
    );
  },

  methods: {
    onClick({ name, point }) {
      if (point) {
        this.map.$refs.Map.setCenter(point);
        this.map.$refs.Map.setZoom(12);
      }

      this.$router.replace(`/${INDUSTRY_MAP}/${name}/profile`);
    },

    renderMarkers() {
      return _.map(this.markers, ({ position, icon, name, village }, index) => (
        <Marker
          position={position}
          icon={icon}
          key={`${name}.${index}`}
          onClick={this.onClick.bind(this, { name: village, point: position })}
        />
      ));
    },

    renderText() {
      return _.map(this.markers, ({ position, name }) => (
        <Text
          position={position}
          text={name}
          key={name}
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
