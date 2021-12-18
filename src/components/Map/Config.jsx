import { withAmap } from '@amap/amap-vue';

import { mapMutations } from 'vuex';
import _ from 'lodash';

export default {
  name: 'MapConfig',

  mixins: [withAmap],

  mounted() {
    // this.$map.setLimitBounds(this.$map.getBounds());
    this.$map.setFeatures(['bg', 'road']);
    this.$map.on(
      'zoomend',
      _.debounce(() => {
        this.$nextTick(() => {
          this.$forceUpdate();
        });
      }, 2048)
    );

    try {
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 102400, //超过10秒后停止定位，默认：5s
        showButton: false, //显示定位按钮，默认：true
        zoomToAccuracy: true //定位成功后是否自动调整地图视野到定位点
      });

      this.geocoder = new AMap.Geocoder({
        city: '010', //城市设为北京，默认：“全国”
        radius: 1000 //范围，默认：500
      });

      this.$map.addControl(geolocation);

      geolocation.getCurrentPosition(this.onGetCurrentPosition);
    } catch (e) {
      // console.log(e);
    }
  },

  methods: {
    ...mapMutations('mobile', ['setStates']),

    setZoom(zoom) {
      this.$map.setZoom(zoom);
    },

    setFeatures(...features) {
      this.$map.setFeatures(['bg', ...features]);
    },

    setCenter(center) {
      this.$map.setCenter(center);
    },

    onGetCurrentPosition(status, result) {
      if (status === 'complete') {
        const position = [result.position.lng, result.position.lat];

        this.setZoom(14);
        this.setCenter(position);
        this.onRegeoCode(position);

        this.setStates({ position });
      } else {
        throw new Error(status);
      }
    },

    onRegeoCode(position) {
      this.geocoder.getAddress(position, (status, result) => {
        if (status === 'complete') {
          this.setStates({ location: result.regeocode?.formattedAddress });
        } else {
          throw new Error(status);
        }
      });
    }
  },

  render() {
    return null;
  }
};
