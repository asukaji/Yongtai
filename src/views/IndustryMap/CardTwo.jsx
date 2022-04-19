import styles from './CardTwo.module.less';

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },

  data() {
    return {};
  },

  render() {
    return (
      <div>
        <div class={styles.card}>
          <div class={styles.title}>{this.name}</div>
          <hr class={styles.line} />
          <pre class={styles.content}>{this.content}</pre>
        </div>
      </div>
    );
  }
};
