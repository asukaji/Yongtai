import styles from './SmallBoxes.module.less';
import shop from '../../assets/Effect/shop.png';

export default {
  props: {
    datas: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  render() {
    return (
      <div class={styles.box}>
        <img src={shop} class={styles.icon}></img>
        <div class={styles.title}>{this.datas.name}</div>
        <div class={styles.texts}>
          <p class={styles.text}>增长率 {this.datas.rate} %</p>
          <p class={styles.text}>累计 {this.datas.cumulative} 亿元</p>
        </div>
      </div>
    );
  }
};
