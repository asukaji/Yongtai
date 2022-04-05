import styles from './Vallage1.module.less';
import Chart from '../Chart';

export default {
  data() {
    return {
      props: {
        list: {
          type: Array,
          required: true
        }
      },

      option: {
        backgroundColor: 'rgba(9, 24, 48, 0)',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(9, 24, 48, 0.5)',
          borderColor: 'rgba(75, 253, 238, 0.4)',
          textStyle: {
            color: '#CFE3FC'
          },
          borderWidth: 1
        },
        grid: {
          top: '10%',
          right: '0%',
          left: '%',
          bottom: '20%'
        },
        xAxis: [
          {
            type: 'category',
            data: ['绩效总评', '指标考核', '公众评议'],
            axisLine: {
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            axisLabel: {
              margin: 7,
              color: '#e2e9ff',
              textStyle: {
                fontSize: 12
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            axisLabel: {
              show: false,
              formatter: '{value}',
              color: '#e2e9ff'
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#FFFFFF'
              }
            },
            splitLine: {
              lineStyle: {
                color: 'rgba(255,255,255,0.12)'
              }
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: [86.39, 81.5, 94.65],
            barWidth: '30%',
            // itemStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(0,244,255,1)' // 0% 处的颜色
            //         },
            //         {
            //           offset: 1,
            //           color: 'rgba(0,77,167,1)' // 100% 处的颜色
            //         }
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(0,160,221,1)',
            //     shadowBlur: 4
            //   }
            // },
            label: {
              normal: {
                show: true,
                lineHeight: 10,
                formatter: '{c}',
                position: 'top',
                textStyle: {
                  color: '#00D6F9',
                  fontSize: 12
                }
              }
            }
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>东洋乡绩效考评构成</div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
