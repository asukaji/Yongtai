import styles from './Card.module.less';

export default {
  props: {
    projects: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  render() {
    return (
      <div>
        {/* {this.projects.map(() => { */}
        {/* return ( */}
        <div class={styles.card}>
          <div class={styles.title}></div>
          <div class={styles.second}>
            <div class={styles.data}>
              <div class={styles.textTitle1}>{this.projects.name}</div>
            </div>
          </div>
          <hr class={styles.line} />
          <div align="left" class={styles.textTitle2}>区域类型：{this.projects.areaType}</div>
          <div align="left" class={styles.textTitle2}>责任单位：{this.projects.dept}</div>
          <div align="left" class={styles.textTitle2}>项目类型：{this.projects.proType}</div>
          <div align="left" class={styles.textTitle2}>总投资额(万元)：{this.projects.money}</div>
        </div>
      </div>
    );
  }
};
