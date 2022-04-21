
import styles from './CardTwo.module.less';

import { cardProject } from '@/api';
import card from '../../assets/Effect/card.png';

export default {
  props: {
    projectClass: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      jindulist: []
    };
  },

  watch: {
    async projectId() {
      this.jindulist = await cardProject(this.projectId, this.projectClass);
    }
  },

  methods: {
    onClick(item) {
      console.log('aaaaa',item);
      this.$emit('change', item);
    }
  },

  render() {
    return (
      <div>
        <img src={card} class={styles.cardIcon} onClick={this.onClick.bind(this, true)}></img>
        {this.jindulist.map((data) => {
          return (
            <div class={styles.card}>
              {/* <div class={styles.title}>形象进度</div> */}
              <div align="left" class={styles.textTitle}>
                形象进度：{data.schedule}
              </div>
              <div align="left" class={styles.textTitle}>
                更新日期：{data.datetime}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
