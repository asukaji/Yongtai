import YtMap from '@/components/YtMap';
import SideBar from './SideBar';
import { StreetsPolygon } from '@/components/Map';
import Header from './Header';
import styles from './Home.module.less';

export default {
  name: 'Home',

  render() {
    return (
      <div class={styles.home}>
        <Header />
        <YtMap>
          <StreetsPolygon />
        </YtMap>
        <SideBar />
      </div>
    );
  }
};
