import styles from './Boxes.module.less';
import money from '../../assets/Effect/money.png';
import tool from '../../assets/Effect/tool.png';

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
      <div class={styles.box} >
        <img src={this.datas.id === 'A01' ? money : tool } class={styles.icon}></img>
        <div class={styles.title}>{this.datas.name}</div>
        <div class={styles.texts}>
          <p class={styles.text}>增长率 {this.datas.rate} %</p>
          <p class={styles.text}>累计 {this.datas.cumulative} 亿元</p>
        </div>
      </div>
    );
  }
};
