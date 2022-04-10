
import styles from './Card.module.less';

export default {
  props: {
    projects: {
      type: Array,
      required: true
    },
    village: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
    };
  },

  methods: {
    getSchudlde(item) {
      console.log('sasasasasa', item);
      this.$emit('send',item);
    },
  },

  render() {
    return (
      <div>
        {this.projects.map((item) => {
          return (
            <div
              class={styles.card}
              onClick={this.getSchudlde.bind(this, item)}
            >
              <div class={styles.title}>{item.projectName}</div>
              <div class={styles.second}>
                <div class={styles.data}>
                  <div class={styles.textTitle}>投资总额(万元)</div>
                  <div class={styles.text}>{item.investment}</div>
                </div>
                <div class={styles.data}>
                  <div class={styles.textTitle}>建设日期</div>
                  <div class={styles.text}>{item.datetime}</div>
                </div>
              </div>
              <hr class={styles.line} />
              <div class={styles.textTitle}>
              地区：永泰县/{this.village.vallage}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
