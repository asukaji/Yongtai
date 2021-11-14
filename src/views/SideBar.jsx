import styles from './SideBar.module.less';

import _ from 'lodash';

import { homeRoutes } from '@/constants';
import Profile from '@/assets/Icon/profile.png';
import Economy from '@/assets/Icon/economy.png';
import Business from '@/assets/Icon/business.png';
import Project from '@/assets/Icon/project.png';
import Tour from '@/assets/Icon/tour.png';
import Promote from '@/assets/Icon/promote.png';
import Control from '@/assets/Icon/control.png';
import Video from '@/assets/Icon/video.png';

const ICONS = [
  Profile,
  Economy,
  Business,
  Project,
  Tour,
  Promote,
  Control,
  Video
];

export default {
  name: 'SideBar',

  render() {
    return (
      <div class={styles.sidebar}>
        {_.map(homeRoutes, ([route, title], index) => <router-link to={route}>
          <div>
            <img src={ICONS[index]} />
            {title}
          </div>
        </router-link>)}
      </div>
    );
  }
};
