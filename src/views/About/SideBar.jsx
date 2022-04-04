import styles from './SideBar.module.less';

import flag from '@/assets/About/flag.png';
import bg from '@/assets/About/bg.png';
import cases from '@/assets/About/case.png';

import Echart from './Echart';
import EchartTwo from './EchartTwo';
import EchartThree from './EchartThree';




export default {
  data() {
    return {
      
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.top}>
          <div>
            <div>
              <img src={flag} class={styles.flag}></img>
            </div>
            <div>
              <img src={bg} class={styles.bg}></img>
            </div>
            <div>
              <img src={cases} class={styles.cases}></img>
            </div>
            <div class={styles.text}>福建省重点乡镇</div>
          </div>
          <div>
            <div>
              <img src={flag} class={styles.flag}></img>
            </div>
            <div>
              <img src={bg} class={styles.bg}></img>
            </div>
            <div>
              <img src={cases} class={styles.cases}></img>
            </div>
            <div class={styles.text}>4A级旅游乡镇</div>
          </div>
        </div>
        <div class={styles.echart}>
          <Echart />
        </div>
        <div class={styles.echart}>
          <EchartTwo />
        </div>
        <div class={styles.echart}>
          <EchartThree />
        </div>
      </div>
    );
  }
};
