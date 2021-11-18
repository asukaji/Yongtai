import iconFile from '@/assets/Icon/icon-file.png';
import iconCamera from '@/assets/Icon/icon-camera.png';
import styles from './Float.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'Float',

  props: {
    type: VueTypes.string.def('file'),
    bottom: VueTypes.string.def()
  },

  render() {
    return (
      <div
        class={styles.float}
        style={{
          background: this.type !== 'file' && 'transparent',
          bottom: this.bottom
        }}
        onClick={this.$emit.bind(this, 'click')}
      >
        {this.type === 'file' ? (
          <img src={iconFile} />
        ) : (
          <img src={iconCamera} style={{ width: '80px' }} />
        )}

        {this.type === 'file' && '概况'}
      </div>
    );
  }
};
