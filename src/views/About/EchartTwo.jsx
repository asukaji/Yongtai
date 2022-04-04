import styles from './Echart.module.less';
import Chart from './Chart2';


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
        backgroundColor: 'rgba(255, 255, 255, 0)',
        color: ['#c1c049', '#3eb177', '#0666e8'],
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(20,50,125,.8)',
          axisPointer: {
            type: 'shadow' // 可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '0',
          right: '0',
          bottom: '10%',
          top: '10%',
          containLabel: true
        },
        legend: {
          left: 'center',
          top: 50,
          icon: 'rect',
          textStyle: {
            color: '#81b0d6'
          },
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 30 //左右间隔
        },
        xAxis: {
          type: 'category',
          data: ['2016', '2017', '2018', '2019', '2020'],
          axisLine: {
            show: true,
            lineStyle: {
              color: '#071a4f',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#81b0d6'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#81b0d6'
            }
          },
          axisPointer: {
            snap: true
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#071a4f',
              type: 'dash'
            }
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: '12%',
            itemStyle: {
              normal: {
                barBorderRadius: 30 //圆角度
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#ffffff'
              }
            },
            data: [651.4, 806, 1047.3, 1275.2, 1030.3]
          },
          {
            type: 'bar',
            barWidth: '12%',
            itemStyle: {
              normal: {
                barBorderRadius: 30
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#ffffff'
              }
            },
            data: [52.1, 69.51, 97, 457, 436.53]
          },
          {
            type: 'bar',
            barWidth: '12%',
            itemStyle: {
              normal: {
                barBorderRadius: 30
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ffff'
              }
            },
            data: [22.1, 29.1, 43.9, 57.3, 57.6]
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
            景区接待人数
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
