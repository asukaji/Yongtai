import styles from './SideBar.module.less';

export default {
  props: {
    survey: {
      type: Object,
      required: true
    }
  },

  data() {
    return {};
  },

  methods: {
    onClick() {
      this.$emit('click');
    }
  },

  render() {
    return (
      <div class={styles.card}>
        <div align="left" class={styles.back} onClick={this.onClick.bind(this)}>
          返回
        </div>
        <div class={styles.title}>{this.survey.title}</div>
        <hr class={styles.line} />
        <pre class={styles.text}>{this.survey.content}</pre>
        <div class={styles.imgs}>
          {this.survey.fileList.map((item) => {
            return <img class={styles.img} src={item.filePath} vViewer/>;
          })}
        </div>
      </div>
    );
  }
};
