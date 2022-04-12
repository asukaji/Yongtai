import styles from './Card.module.less';

export default {
  props: {
    projects: {
      type: Object,
      required: true
    },
    mark: {
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
        {/* {this.mark.map((item) => {
          return ( */}
        <div class={styles.card}>
          <div class={styles.title}></div>
          <div class={styles.second}>
            <div class={styles.data}>
              <div class={styles.textTitle1}>
                {this.projects.name}
                {this.mark.name}
              </div>
            </div>
          </div>
          <hr class={styles.line} />
          <div align="left" class={styles.textTitle2}>
            区域类型：{this.projects.areaType}
            {this.mark.areaType}
          </div>
          <div align="left" class={styles.textTitle2}>
            责任单位：{this.projects.dept}
            {this.mark.dept}
          </div>
          <div align="left" class={styles.textTitle2}>
            项目类型：{this.projects.proType}
            {this.mark.proType}
          </div>
          <div align="left" class={styles.textTitle2}>
            总投资额(万元)：{this.projects.money}
            {this.mark.money}
          </div>
        </div>
        {/* );})} */}
      </div>
    );
  }
};
