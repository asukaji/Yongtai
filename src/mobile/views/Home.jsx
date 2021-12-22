import YtMap from '@/components/YtMap';
import { CheckForm } from '@/components/mobile';
import { Marker, Text } from '@amap/amap-vue';
import styles from './Home.module.less';

import { mapState } from 'vuex';

import IconBack from '@/assets/Icon/icon-back.png';
import marker from '@/assets/MapPlugin/marker-center.png';

export default {
  name: 'Home',

  computed: {
    ...mapState('mobile', ['projects', 'projectId', 'projectPosition']),

    projectName() {
      return this.projects.find(({ id }) => id === this.projectId)?.projectName;
    }
  },

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
            <Marker position={this.projectPosition} icon={marker} />
            <Text
              position={this.projectPosition}
              text={this.projectName}
              offset={[20, -2]}
              domStyle={{
                fontSize: '15px'
              }}
            />
            <CheckForm />
          </YtMap>
        </div>
      </keep-alive>
    );
  }
};
