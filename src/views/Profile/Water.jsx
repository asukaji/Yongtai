import YtMap from '@/components/YtMap';
import { FooterTabs } from '@/components/Custom';
import styles from './index.module.less';

// import iconFlowBranch from '@/assets/Icon/icon-flow-branch.png';
// import iconFlowBranchActive from '@/assets/Icon/icon-flow-branch-active.png';
import iconElectric from '@/assets/Icon/icon-electric.png';
import iconElectricActive from '@/assets/Icon/icon-electric-active.png';
import iconFlowMain from '@/assets/Icon/icon-flow-main.png';
import iconFlowMainActive from '@/assets/Icon/icon-flow-main-active.png';

const TABS = [
  // {
  //   name: 'branch',
  //   title: '200km以上支流',
  //   icon: iconFlowBranch,
  //   activeIcon: iconFlowBranchActive
  // },
  {
    name: 'electric',
    title: '发电站',
    icon: iconElectric,
    activeIcon: iconElectricActive
  },
  {
    name: 'main',
    title: '一级支流',
    icon: iconFlowMain,
    activeIcon: iconFlowMainActive
  }
];

export default {
  name: 'Water',

  render() {
    return (
      <div class={styles.home}>
        <YtMap>
          <router-view></router-view>
          <FooterTabs tabs={TABS} />
        </YtMap>
      </div>
    );
  }
};
