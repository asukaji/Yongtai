import Card from './Card';
import styles from './index.module.less';

export default {
  name: 'Property',

  render() {
    return (
      <div class={styles.container}>
        <div class={styles.header}></div>
        <div class={styles.content}>
          <div>
            <Card />
            <Card />
            <Card />
          </div>
          <div>
            <Card />
            <Card />
          </div>
          <div>
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    );
  }
};
