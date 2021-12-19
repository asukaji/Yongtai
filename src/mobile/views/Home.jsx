import YtMap from '@/components/YtMap';
import { CheckForm } from '@/components/mobile';
import styles from './Home.module.less';

import IconBack from '@/assets/Icon/icon-back.png';

export default {
  name: 'Home',

  render() {
    return (
      <keep-alive>
        <div class={styles.home}>
          <YtMap ref="Map">
            <div class={styles.back} onClick={() => this.$router.go(-1)}>
              <img src={IconBack} />
            </div>
            <router-link
              to={`/record/${this.$route.params.id}`}
              class={styles.record}
            >
              打卡记录
            </router-link>
            <CheckForm />
          </YtMap>
        </div>
      </keep-alive>
    );
  }
};
