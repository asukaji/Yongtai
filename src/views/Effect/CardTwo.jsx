
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
      console.log('ssssssssss',this.jindulist.length);
    }
  },

  methods: {
    onClick(item) {
      this.$emit('change', item);
    }
  },

  render() {
    return (
      <div>
        <span style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
          形象进度
        </span>
        <div
          class={styles.cards}
          align="left"
          onClick={this.onClick.bind(this, true)}
        >
          <img src={card} class={styles.cardIcon}></img>
          <span style={{ color: '#fff', fontSize: '10px' }}>项目进度跟踪</span>
        </div>
        {this.jindulist.length ? (
          this.jindulist.map((data) => {
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
          })
        ) : (
          <div>
            <hr style={{ marginLeft: '15px', marginRight: '15px',border: '0.5px solid #fff'}}></hr>
            <span style={{ color: '#fff' }}>没有更多了...</span>
          </div>
        )}
      </div>
    );
  }
};
