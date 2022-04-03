import styles from './Header.module.less';

import IconBack from '@/assets/Icon/icon-back.png';

const routeTitleMap = new Map([
  ['profileIndex', '县情县况'],
  ['profile.ecological', '生态文明'],
  ['profile.industrial', '产业基础'],
  ['profile.urban', '城市建设'],
  ['profile.livelihood', '民生事业'],
  ['profile.traffic', '交通情况'],
  ['profile.traffic.service', '交通情况'],
  ['profile.traffic.railway', '交通情况'],
  ['profile.traffic.highway', '交通情况'],
  ['profile.traffic.national', '交通情况'],
  ['profile.traffic.provincial', '交通情况'],
  ['profile.geothermal', '地热情况'],
  ['profile.hotel', '酒店情况'],
  ['profile.water', '水域水流'],
  ['profile.water.electric', '水域水流'],
  ['profile.water.main', '水域水流'],
  ['profile.water.branch', '水域水流'],
  ['project.profile', '重点项目'],
  ['tour', '旅游'],
  ['promote', '乡村振兴'],
  ['promote.index', '乡村振兴'],
  ['promote.village', '美丽乡村建设'],
  ['video', '视频连线'],
  ['control', '重点督查'],
  ['economy', '经济运行'],
  ['economy.profile', '经济运行'],
  ['business.evaluation', '招商管理'],
  ['business.schedule', '招商管理'],
  ['business.project', '招商管理'],
  ['business.task', '招商管理'],
  ['business.evaluation.profile', '招商管理'],
  ['business.evaluation.unit', '招商管理'],
  ['business.evaluation.unit.street', '招商管理'],
  ['business.evaluation.unit.town', '招商管理'],
  ['business.schedule.unit', '招商管理'],
  ['business.schedule.town', '招商管理'],
  ['business.schedule.street', '招商管理'],
  ['business.task.unit', '招商管理'],
  ['business.task.town', '招商管理'],
  ['business.task.street', '招商管理'],
  ['Home', process.env.VUE_APP_TITLE],
  ['Login', process.env.VUE_APP_TITLE],
  ['property', '农村产权交易'],
  ['PropertyFrame', '农交中心']
]);

export default {
  name: 'Header',

  computed: {
    title() {
      return (
        routeTitleMap.get(this.$route.name) ??
        this.$route.params?.name ??
        this.$route.name
      );
    }
  },

  render() {
    return (
      <div class={styles.header}>
        {this.$route.name === 'Home' || this.$route.name === 'Login' ? null : (
          <div class="img" onClick={() => this.$router.go(-1)}>
            <img src={IconBack} />
          </div>
        )}
        {this.title}
        {this.$slots.default}
      </div>
    );
  }
};
