import styles from './Footer.module.less';

import icon1 from '@/assets/About/icon1.png';
import icon2 from '@/assets/About/icon2.png';
import icon3 from '@/assets/About/icon3.png';
import icon4 from '@/assets/About/icon4.png';


export default {
  methods: {},

  render() {
    return (
      <div>
        <div class={styles.background}>
          <div class={styles.icons}>
            <div class={styles.card}>
              <div>
                <img src={icon3} class={styles.icon}></img>
              </div>
              <div class={styles.unit}>-亿条</div>
              <div class={styles.name}>人口数据</div>
            </div>
            <div class={styles.card}>
              <div>
                <img src={icon2} class={styles.icon}></img>
              </div>
              <div class={styles.unit}>-亿条</div>
              <div class={styles.name}>重点项目</div>
            </div>
          </div>
          <div class={styles.icons}>
            <div class={styles.card}>
              <div>
                <img src={icon4} class={styles.icon}></img>
              </div>
              <div class={styles.unit}>-亿条</div>
              <div class={styles.name}>经济数据</div>
            </div>
            <div class={styles.card}>
              <div>
                <img src={icon1} class={styles.icon}></img>
              </div>
              <div class={styles.unit}>-亿条</div>
              <div class={styles.name}>村镇数据</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
