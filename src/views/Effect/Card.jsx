
import styles from './Card.module.less';

import { cardProject } from '@/api';

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
      jindulist: [],
      divVisible: false
    };
  },

  methods: {
    async getSchudlde(item) {
      this.jindulist = await cardProject(item.projectId, 'project_sxz');
      this.divVisible = true;
    },

    divVisibleClose(){
      this.divVisible = false;
    }
  },

  render() {
    return (
      <div>
        {this.projects.map((item) => {
          return (
            <div>
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

              <div
                class={[
                  styles.titleName,
                  this.divVisible && styles.titleNameOn
                ]}
                onClick={this.divVisibleClose}
              >
                形象进度
                {this.jindulist.map((data) => {
                  return (
                    <div>
                      <div align="left" class={styles.textTitle}>
                        形象进度：{data.schedule}{' '}
                      </div>
                      <div align="left" class={styles.textTitle}>
                        更新日期：{data.datetime}{' '}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
};
