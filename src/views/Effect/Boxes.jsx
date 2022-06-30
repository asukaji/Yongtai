import styles from './Boxes.module.less';
import money from '../../assets/Effect/money.png';
import tool from '../../assets/Effect/tool.png';

export default {
  props: {
    values: {
      type: Object,
      required: true
    },
    datas: {
      type: Object,
      required: true
    },
    names: {
      type: String,
      required: true
    }
  },

  data() {
    return {};
  },

  render() {
    return (
      <div class={styles.box}>
        <div>
          <img
            src={tool}
            class={styles.icon}
          ></img>
          <div class={styles.title}>{this.names}</div>
          <div class={styles.texts}>
            <p class={styles.text}>项目数 {this.values.mlProjects.length}</p>
            <p class={styles.text}>村子个数 {this.values.villages.length}</p>
            <p class={styles.text}>
              金额 {this.values.money}
              {this.values.unit}
            </p>
            <p class={styles.text}>年份 {this.values.buildDate}</p>
          </div>
        </div>
      </div>
    );
  }
};
