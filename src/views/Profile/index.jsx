import styles from './index.module.less';

import bg1 from '@/assets/Bg/profile-bg1.png';
import bg2 from '@/assets/Bg/profile-bg2.png';
import bg3 from '@/assets/Bg/profile-bg3.png';
import bg4 from '@/assets/Bg/profile-bg4.png';
import bg5 from '@/assets/Bg/profile-bg5.png';
import bg6 from '@/assets/Bg/profile-bg6.png';
import bg7 from '@/assets/Bg/profile-bg7.png';
import bg8 from '@/assets/Bg/profile-bg8.png';

const CARDS = [
  { title: '生态文明', name: 'Ecological Civilization', path:'', image: bg1},
  { title: '产业基础', name: 'Industrial Foundation', path:'', image: bg2},
  { title: '城市建设', name: 'Urban Construction', path:'', image: bg3},
  { title: '民生事业', name: 'Livelihood Cause', path:'', image: bg4},
  { title: '交通情况', name: 'Traffic Conditions', path:'', image: bg5},
  { title: '地热情况', name: 'Geothermal Conditions', path:'geothermal', image: bg6},
  { title: '酒店情况', name: 'Hotel Conditions', path:'', image: bg7},
  { title: '水域水流', name: 'Water Flow', path:'', image: bg8}
];

export default {
  name: 'Profile',

  methods: {
    renderChildren() {
      return CARDS.map(({ title, name, path, image }) => (
        <router-link to={{ name: path }}>
          <div class={styles.card} style={{ backgroundImage: `url(${image})` }}>
            <div><h3>{title}</h3>
              <div>{name}</div>
            </div>
            
          </div>
        </router-link>
      ));
    }
  },

  render() {
    return (
      <div class={styles.container}>
        <h1>奋力谱写现代化绿色发展先行区建设新篇章</h1>
        <pre>Green development</pre>
        <div>
          {this.renderChildren()}
        </div>
      </div>
    );
  }
};
