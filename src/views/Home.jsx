// import YtMap from '@/components/YtMap';
// import { StreetsPolygon } from '@/components/Map';
import SideBar from './SideBar';
import Header from './Header';
import styles from './Home.module.less';

import Title from '@/assets/Bg/home-title.png';
import HeaderBg from '@/assets/Bg/home-header-bg.png';
import Names from '@/assets/Bg/home-streets-name.png';

export default {
  name: 'Home',

  methods: {
    open(path) {
      this.$router.push(path);
    }
  },

  render() {
    return (
      <div class={styles.home}>
        <Header />
        <img src={Title} />
        <img src={HeaderBg} />
        <img src={Names} class={styles.streetsName} />
        {/* <YtMap showLabel={false}>
          <StreetsPolygon />
        </YtMap> */}
        <SideBar />
      </div>
    );
  }
};
