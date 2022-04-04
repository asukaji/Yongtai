import styles from './Zhaoshang.module.less';
import Chart from './Chart';


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
        tooltip: {
          showContent: true,
          trigger: 'axis',
          backgroundColor: 'rgba(8,36,68,.7)',
          color: '#fff',
          textStyle: {
            color: '#fff'
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0)',
        grid: {
          top: '10%',
          left: '30%',
          bottom: '10%',
          right: '20%'
        },
        yAxis: {
          axisLabel: {
            interval: 0,
            // rotate: '45',旋转
            // formatter: function (value) {
            //   if (value.length > 3) {
            //     return `${value.slice(0, 2)}...`;
            //   }
            //   return value;
            // },
            textStyle: {
              color: '#ffffff', //坐标轴字颜色
              fontSize: 12
            },
            margin: 8
          },
          axisTick: {
            show: false //隐藏X轴刻度
          },
          splitLine: {
            //网格线
            show: false
          },
          data: ['专业招商', '乡镇招商', '县直单位'],
          type: 'category'
        },
        xAxis: {
          axisLine: {
            show: false, //隐藏X轴轴线
            lineStyle: {
              color: '#11417a'
            }
          },
          axisTick: {
            show: false //隐藏X轴刻度
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            //网格线
            show: false
          }
        },

        series: [
          {
            // name: '%',
            data: [66.2, 148.11, 95.11],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: '#0c3252'
            },
            barMaxWidth: 'auto',
            // "barWidth": 7,
            barWidth: 12,
            itemStyle: {
              barBorderRadius: [0, 7, 7, 0], // 圆角（左上、右上、右下、左下）
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                type: 'linear',
                global: false,
                colorStops: [
                  {
                    offset: 0,
                    color: '#0b9eff'
                  },
                  {
                    offset: 1,
                    color: '#63caff'
                  }
                ]
              }
            },
            label: {
              show: true,
              position: 'right',
              distance: 8,
              color: '#fff',
              fontSize: 13
            }
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          招商项目各分队完成情况(%)
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
