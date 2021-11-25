import { Card } from 'element-ui';
import styles from './Profile.module.less';

import { fetchIndustry } from '@/api';

import { ECONOMY_DETAIL } from '@/constants';
import bgCard from '@/assets/Bg/bg-card.png';

export default {
  name: 'EconomyProfile',

  data() {
    return {
      state: {
        cards: []
      }
    };
  },

  async mounted() {
    this.state.cards = await fetchIndustry();
  },

  render() {
    return (
      <div class={styles.cards}>
        {this.state.cards.map(({ name, rate, cumulative, unit, id }) => (
          <router-link to={{ name: ECONOMY_DETAIL, params: { name, id }}}>
            <Card key={id} style={{ backgroundImage: `url(${bgCard})` }} >
              <h3>{name}</h3>
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
