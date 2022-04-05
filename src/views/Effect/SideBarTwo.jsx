import styles from './SideBarTwo.module.less';

import square from '../../assets/Effect/square.png';
import line from '../../assets/Effect/line.png';

import Vallage1 from './Vallage/Vallage1';
import Vallage2 from './Vallage/Vallage2';
import Vallage3 from './Vallage/Vallage3';
import Vallage4 from './Vallage/Vallage4';
import Vallage5 from './Vallage/Vallage5';
import Vallage6 from './Vallage/Vallage6';
import Vallage7 from './Vallage/Vallage7';
import Vallage8 from './Vallage/Vallage8';
import Vallage9 from './Vallage/Vallage9';
import Vallage10 from './Vallage/Vallage10';
import Vallage11 from './Vallage/Vallage11';
import Vallage12 from './Vallage/Vallage12';
import Vallage13 from './Vallage/Vallage13';
import Vallage14 from './Vallage/Vallage14';
import Vallage15 from './Vallage/Vallage15';
import Vallage16 from './Vallage/Vallage16';
import Vallage17 from './Vallage/Vallage17';
import Vallage18 from './Vallage/Vallage18';
import Vallage19 from './Vallage/Vallage19';
import Vallage20 from './Vallage/Vallage20';
import Vallage21 from './Vallage/Vallage21';



export default {
  data() {
    return {
    };
  },

  created() {
  
  },

  methods: {
    
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.bottom}>
          <div class={styles.title}>
            <img src={square} class={styles.titleImg}></img>
            <div class={styles.titleText}>
              <div class={styles.text}>乡镇绩效考评得分(2019)</div>
              <router-link class={styles.more}>更多</router-link>
            </div>
          </div>
          <div class={styles.scroll}>
            <img src={line} class={styles.line}></img>
            <div class={styles.bottomboxes}>
              <Vallage1 />
              <Vallage2 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage3 />
              <Vallage4 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage5 />
              <Vallage6 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage7 />
              <Vallage8 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage9 />
              <Vallage10 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage11 />
              <Vallage12 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage13 />
              <Vallage14 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage15 />
              <Vallage16 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage17 />
              <Vallage18 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage19 />
              <Vallage20 />
            </div>
            <div class={styles.bottomboxes}>
              <Vallage21 />
            </div>
          </div>
        </div>
      </div>
    );
  }
};
