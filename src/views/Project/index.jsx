import YtMap from '@/components/YtMap';
import Header from '../Header';
import styles from './index.module.less';

export default {
  name: 'Project',

  provide() {
    return {
      map: this
    };
  },

  render() {
    return (
      <div class={styles.home}>
        <Header />
        <YtMap ref="Map">
          <router-view></router-view>
        </YtMap>
      </div>
    );
  }
};
