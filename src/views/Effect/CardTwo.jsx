
import styles from './CardTwo.module.less';

import { cardProject } from '@/api';

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

  render() {
    return (
      <div>
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
