import { Card } from 'element-ui';
import styles from './Profile.module.less';

import bgCard from '@/assets/Bg/bg-card.png';

const cards = [
  { name: 'GDP', rate: 8.6, cumulative: 224.62 },
  { name: '建筑业', rate: 8.9, cumulative: 91.33 },
  { name: '规上工业', rate: 7.7, cumulative: '-' },
  { name: '固定资产投资', rate: 5.5, cumulative: 112.06 },
  { name: '社零售总额', rate: 14.9, cumulative: 30.91 },
  { name: '公共预算总收入', rate: 11.1, cumulative: 17.88 },
  { name: '公共预算收入', rate: 12.9, cumulative: 11.03 },
  { name: '工业固投', rate: -1, cumulative: 13.34 },
  { name: '进出口总值', rate: '-', cumulative: '-' },
  { name: '实际外资', rate: 112.3, cumulative: 0.977 },
  { name: '第一产业', rate: 4.7, cumulative: 35.26 },
  { name: '第三产业', rate: 10.1, cumulative: 80.39 }
];

export default {
  name: 'EconomyProfile',

  render() {
    return (
      <div class={styles.cards}>
        {cards.map(({ name, rate, cumulative }, index) => (
          <Card key={index} style={{ backgroundImage: `url(${bgCard})` }}>
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
                <span class={styles.label}>累计(亿元)</span>
                <pre>
                  {cumulative}
                  <span>亿元</span>
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }
};
