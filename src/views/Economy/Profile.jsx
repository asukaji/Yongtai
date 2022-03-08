import { Card } from 'element-ui';
import styles from './Profile.module.less';

import { fetchIndustry, fetchLatestDate } from '@/api';

import { ECONOMY_DETAIL } from '@/constants';
import bgCard1 from '@/assets/Bg/bg-card1.png';
import bgCard2 from '@/assets/Bg/bg-card2.png';
import bgCard3 from '@/assets/Bg/bg-card3.png';
import bgCard4 from '@/assets/Bg/bg-card4.png';
import bgCard5 from '@/assets/Bg/bg-card5.png';
import bgCard6 from '@/assets/Bg/bg-card6.png';
import bgCard7 from '@/assets/Bg/bg-card7.png';
import bgCard8 from '@/assets/Bg/bg-card8.png';
import bgCard9 from '@/assets/Bg/bg-card9.png';
import bgCard10 from '@/assets/Bg/bg-card10.png';
import bgCard11 from '@/assets/Bg/bg-card11.png';

const backgrounds = [
  bgCard1,
  bgCard2,
  bgCard3,
  bgCard4,
  bgCard5,
  bgCard6,
  bgCard6,
  bgCard7,
  bgCard8,
  bgCard9,
  bgCard10,
  bgCard11
];

const nameMap = new Map([
  ['规模以上工业完成情况', '规上工业'],
  ['全社会消费品零售总额 ', '社零']
]);

export default {
  name: 'EconomyProfile',

  data() {
    return {
      state: {
        date: undefined,
        cards: []
      }
    };
  },

  async mounted() {
    this.state.date = await fetchLatestDate();
    this.state.cards = await fetchIndustry(2, this.state.date);
  },

  render() {
    return (
      <div class={styles.cards}>
        {this.state.cards.map(({ name, rate, cumulative, unit, id }, index) => (
          <router-link to={{ name: ECONOMY_DETAIL, params: { name, id } }}>
            <Card
              key={id}
              style={{ backgroundImage: `url(${backgrounds[index]})` }}
            >
              <h3>{nameMap.get(name) ?? name}</h3>
              <div class={styles.data}>
                <div>
                  <span>Growth rate</span>
                  <span class={styles.label}>增长率</span>
                  <pre>
                    {rate}
                    <span>%</span>
                  </pre>
                </div>
                <div>
                  <span>Cumulative</span>
                  <span class={styles.label}>累计({unit})</span>
                  <pre>
                    {cumulative}
                    <span>{unit}</span>
                  </pre>
                </div>
              </div>
            </Card>
          </router-link>
        ))}
      </div>
    );
  }
};
