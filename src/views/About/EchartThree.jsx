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
        legend: {
          type: 'scroll',
          top: '2%',
          itemGap: 40,
          data: ['公园数量(个)', '绿化面积(万平方米)'],
          textStyle: {
            fontSize: 9,
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(0, 255, 233,0)'
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(255, 255, 255,1)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0, 255, 233,0)'
                  }
                ],
                global: false
              }
            }
          }
        },
        grid: {
          top: '30%',
          left: '5%',
          right: '5%',
          bottom: '15%'
          // containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              show: true
            },
            splitArea: {
              // show: true,
              color: '#f00',
              lineStyle: {
                color: '#f00'
              }
            },
            axisLabel: {
              color: '#fff'
            },
            splitLine: {
              show: false
            },
            boundaryGap: false,
            data: ['2016', '2017', '2018', '2019', '2020']
          }
        ],

        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgba(255,255,255,0.1)'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 20,
              textStyle: {
                color: '#d1e6eb'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '公园数量(个)',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#6c50f3',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#6c50f3'
              }
            },
            itemStyle: {
              color: '#6c50f3',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            // areaStyle: {
            //   normal: {
            //     // eslint-disable-next-line no-undef
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(108,80,243,0.3)'
            //         },
            //         {
            //           offset: 1,
            //           color: 'rgba(108,80,243,0)'
            //         }
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(108,80,243, 0.9)',
            //     shadowBlur: 20
            //   }
            // },
            data: [12, 16, 17, 18, 19]
          },
          {
            name: '绿化面积(万平方米)',
            type: 'line',
            // smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#00ca95',
                shadowColor: 'rgba(0, 0, 0, .3)',
                shadowBlur: 0,
                shadowOffsetY: 5,
                shadowOffsetX: 5
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ca95'
              }
            },

            itemStyle: {
              color: '#00ca95',
              borderColor: '#fff',
              borderWidth: 3,
              shadowColor: 'rgba(0, 0, 0, .3)',
              shadowBlur: 0,
              shadowOffsetY: 2,
              shadowOffsetX: 2
            },
            tooltip: {
              show: false
            },
            // areaStyle: {
            //   normal: {
            //     color: new echarts.graphic.LinearGradient(
            //       0,
            //       0,
            //       0,
            //       1,
            //       [
            //         {
            //           offset: 0,
            //           color: 'rgba(0,202,149,0.3)'
            //         },
            //         {
            //           offset: 1,
            //           color: 'rgba(0,202,149,0)'
            //         }
            //       ],
            //       false
            //     ),
            //     shadowColor: 'rgba(0,202,149, 0.9)',
            //     shadowBlur: 20
            //   }
            // },
            data: [155.81, 163.81, 175.81, 180.31, 185.61]
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          城市建设
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
