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
        backgroundColor: 'rgba(255, 255, 255, 0)',
        grid: {
          left: '11%',
          top: '12%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            show: false
          }
        ],
        yAxis: [
          {
            axisTick: 'none',
            axisLine: 'none',
            offset: '10',
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              }
            },
            data: ['专业招商', '县直单位', '乡镇招商']
          },
          {
            axisTick: 'none',
            axisLine: 'none',
            axisLabel: {
              formatter: function (value) {
                return value + '亿元';
              },
              textStyle: {
                color: '#A2C7F3',
                fontSize: '10'
              }
            },
            data: [204.989, 38.14, 373.36]
          },
          {
            nameGap: '50',
            nameTextStyle: {
              color: '#A2C7F3',
              fontSize: '16'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0,0,0,0)'
              }
            },
            data: []
          }
        ],
        series: [
          {
            name: '',
            type: 'bar',
            yAxisIndex: 0,
            data: [204.989, 38.14, 373.36],
            label: {
              normal: {
                show: true,
                position: 'inside',
                textStyle: {
                  color: '#fff',
                  fontSize: 0
                }
              }
            },
            barWidth: 5,
            // itemStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
            //       {
            //         offset: 0,
            //         color: 'rgba(35,166,255,1)'
            //       },
            //       {
            //         offset: 1,
            //         color: 'rgba(17,90,233,1) '
            //       }
            //     ])
            //   }
            // },
            z: 2
          },
          {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [9.99, 9.99, 9.99],

            tooltip: {
              show: false
            },
            barWidth: 10,
            itemStyle: {
              normal: {
                color: '#0e2147'
              }
            },
            z: 1
          },
          {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            tooltip: {
              show: false
            },
            data: [10, 10, 10],
            barWidth: 14,
            // itemStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            //       {
            //         offset: 0,
            //         color: 'rgba(19,98,235,1)'
            //       },
            //       {
            //         offset: 0.7,
            //         color: 'rgba(19,98,235,1)'
            //       },
            //       {
            //         offset: 1,
            //         color: 'rgba(34,163,254,1) '
            //       }
            //     ])
            //   }
            // },
            z: 0
          },
          {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            tooltip: {
              show: false
            },
            data: [0, 0, 0],
            yAxisIndex: 2,
            symbolSize: 15,
            color: '#A2C7F3',
            itemStyle: {
              normal: {
                color: '#115BE9',
                opacity: 1
              }
            },
            z: 2
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          本季度各招商单位投资额完成金额
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
