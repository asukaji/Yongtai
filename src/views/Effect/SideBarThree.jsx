import styles from './SideBarThree.module.less';

import square from '../../assets/Effect/square.png';
import line from '../../assets/Effect/line.png';

export default {
  props: {
    cardInfo: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  created() {},

  methods: {},

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.bottom}>
          <div class={styles.title}>
            <img src={square} class={styles.titleImg}></img>
            <div class={styles.titleText}>
              <div class={styles.text}>汇总统计</div>
              {/* <router-link class={styles.more}>更多</router-link> */}
            </div>
          </div>
          <div class={styles.scroll}>
            <img src={line} class={styles.line}></img>
            <div align="left" class={styles.contents}>{this.cardInfo.itemName}</div>
            <div align="left" class={styles.titles}>项目列表 ({this.cardInfo.projects.length}个)</div>
            <div class={styles.contentlist}>
              {this.cardInfo.projects.map((item) => {
                return <li align="left" class={styles.content}>{item}</li>;
              })}
            </div>
            <div align="left" class={styles.titles}>总投额</div>
            <div class={styles.contentlists}>
              <li align="left" class={styles.content}>
                {this.cardInfo.money}
                {this.cardInfo.unit}
              </li>
            </div>
            <div align="left" class={styles.titles}>建设年限</div>
            <div class={styles.contentlists}>
              <li align="left" class={styles.content}>{this.cardInfo.buildDate}</li>
            </div>
            <div align="left" class={styles.titles}>项目涉及村 ({this.cardInfo.villages.length}个)</div>
            <div class={styles.contentlist}>
              {this.cardInfo.villages.map((item) => {
                return <li align="left" class={styles.content}>{item}</li>;
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
