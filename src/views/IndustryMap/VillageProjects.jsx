import { Marker, Text } from '@amap/amap-vue';

import { fetchProjectByVillage } from '@/api';
import _ from 'lodash';


import texts from '../../assets/Effect/bg-ditutext.png';
import icons from '../../assets/Effect/location.png';


export default {
  name: 'VillageProjects',

  props: {
    change: {
      type: Boolean,
      required: true
    }
  },

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
    },

    change: {
      immediate: true,
      
      async handler(change) {
        if(change === true) {
          this.markers = [];
        }
      }
      
    }
  },

  methods: {
    handleClick(item) {
      this.$emit('click', item);
      console.log('?????',this.markers);
    },

    renderMarkers() {
      return _.map(this.markers, ({ position, name }) => (
        <Marker position={position} icon={icons} key={name} />
      ));
    },

    renderText() {
      return _.map(
        this.markers,
        ({ position, name, areaType, money, dept, proType, nameCode }) => (
          <Text
            onClick={() =>
              this.handleClick.call(
                this,
                { areaType, name, money, dept, proType, nameCode },
                this.markers
              )
            }
            position={position}
            text={name}
            offset={[8 - _.size(name) * 6, -40]}
            domStyle={{
              color: '#fff',
              fontWeight: 'bolder',
              fontSize: '10px',
              padding: '15px',
              backgroundImage: `url(${texts})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}
          />
        )
      );
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
