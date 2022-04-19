import { Amap } from '@amap/amap-vue';
import { Config } from './Map';
import styles from './Map.module.less';

import { CENTER, ZOOM } from '@/constants';

export default {
  name: 'YtMap',

  methods: {
    setZoom(zoom) {
      this.$refs.Config.setZoom(zoom);
    },

    setFeatures(...features) {
      this.$refs.Config.setFeatures(...features);
    },

    setCenter(center) {
      try {
        this.$refs.Config.setCenter(center);
        // this.$refs.Config.setFeatures('road', 'building', 'point');
      } catch (e) {
        setTimeout(() => this.setCenter(center), 1024);
      }
    },
  },

  render() {
    const { zoom = ZOOM, ...mapProps } = this.$attrs;

    return (
      <Amap
        ref="aMap"
        center={CENTER}
        zoom={zoom}
        attrs={{ ...mapProps }}
        class={styles.map}
        onClick={this.$emit.bind(this, 'mapClick')}
      >
        <Config ref="Config" />
        {this.$slots.default}
      </Amap>
    );
  }
};
