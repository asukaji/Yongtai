
import styles from './CardFour.module.less';

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
      console.log('vcvcvcvvccv',this.jindulist);
    }
  },

  methods: {
    onClick(item) {
      this.$emit('change', item);
      console.log('nnnnnnn');
    }
  },

  render() {
    return (
      <div>
        {this.jindulist.map((data) => {
          return (
            <div class={styles.card}>
              <div align="left" class={styles.textTitle}>
                完成投资：{data.target1}
              </div>
              <div align="left" class={styles.textTitle}>
                示范试点到位资金（万元）：{data.target2}
              </div>
              <div align="left" class={styles.textTitle}>
                投资额完成率%：{data.target3}
              </div>
              <div align="left" class={styles.textTitle}>
                示范试点到位资金占年计划%：{data.target4}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
