import styles from './Paragraph.module.less';

export default {
  name: 'Paragraph',

  render() {
    return <div class={styles.paragraph}>{this.$slots.default}</div>;
  }
};
