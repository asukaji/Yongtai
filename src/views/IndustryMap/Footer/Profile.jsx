import VChart from 'vue-echarts';
import styles from '../index.module.less';

import VueTypes from 'vue-types';

export default {
  name: 'Pofile',

  props: {
    value: VueTypes.object.def({})
  },

  computed: {
    option() {
      return {
        legend: {
          orient: 'vertical',
          top: 20,
          left: 0,
          data: ['省专项', '省非专项', '美丽乡村', '市项目'],
          width: 130,
          textStyle: {
            lineHeight: 14,
            color: '#FFFFFF',
            fontSize: 10
          }
        },
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false,
              normal: {
                show: true,
                formatter: '{c}',
                margin: 0
              }
            },
            data: [
              { value: this.value.project_szx, name: '省专项' },
              { value: this.value.project_sfz, name: '省非专项' },
              { value: this.value.project_mlxc, name: '美丽乡村' },
              { value: this.value.project_city, name: '市项目' }
            ],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside',
                  formatter: '{b} : {c} ({d}%)'
                }
              }
            },
            radius: ['50%', '60%'],
            center: ['70%', '40%'],
            labelLine: {
              show: false
            }
          }
        ],
        color: ['#0DA37D', '#CFA4A0', '#0859A5', '#DBDB8A']
      };
    }
  },

  render() {
    return (
      <div class={styles.footerItem}>
        <h4>乡村振兴项目构成</h4>
        <VChart option={this.option} />
      </div>
    );
  }
};
