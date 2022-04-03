import styles from './Page.module.less';

export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },

  data() {
    return {};
  },

  methods: {
    handleClick(item) {
      this.$emit('click', item);
    },
  },

  render() {
    return (
      <div class={styles.distribute}>
        {this.list.map((item) => {
          return (
            <div class={styles.background} onClick={() => this.handleClick.call(this, item)}>
              <div class={styles.title}>{item.name}</div>
              <div class={styles.text}>
                {item.vallageNum}个村,{item.projectNum}个项目
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
