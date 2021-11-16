import { Amap } from '@amap/amap-vue';
import { Config } from './Map';
import styles from './Map.module.less';

import { CENTER, ZOOM } from '@/constants';

export default {
  name: 'YtMap',

  render() {
    const { zoom = ZOOM, ...mapProps } = this.$attrs;

    return (
      <Amap
        ref="aMap"
        center={CENTER}
        zoom={zoom}
        class={styles.map}
        attrs={{...mapProps}}
        onClick={this.$emit.bind(this, 'mapClick')}
      >
        <Config />
        {this.$slots.default}
      </Amap>
    );
  }
};
