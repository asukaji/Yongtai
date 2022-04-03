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
        tooltip: {},
        grid: {
          top: '30%',
          left: '1%',
          right: '1%',
          bottom: '10%',
          containLabel: true
        },
        legend: {
          left: '50%',
          top: '1%',
          itemGap: 4,
          itemWidth: 6,
          itemHeight: 6,
          data: ['已完成(亿元)', '季度投资任务(亿元)'],
          textStyle: {
            color: '#f9f9f9',
            borderColor: '#fff',
            fontSize: 9
          }
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            axisLine: {
              //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#f9f9f9'
              }
            },
            axisLabel: {
              //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#d1e6eb',
                fontSize: 11
              }
            },
            axisTick: {
              show: false
            },
            data: ['乡镇招商', '县直单位', '专业招商']
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 7,
            splitLine: {
              show: false,
              lineStyle: {
                color: '#0a3256'
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
            name: '已完成(亿元)',
            type: 'line',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: 'rgba(0,154,120,1)' // 线条颜色
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              normal: {
                color: '#fffff'
              }
            },
            tooltip: {
              show: false
            },
            data: [298.3, 30.9, 191.3]
          },
          {
            name: '季度投资任务(亿元)',
            type: 'bar',
            barWidth: 15,
            tooltip: {
              show: false
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#00ffff'
              }
            },
            itemStyle: {
              normal: {
                // barBorderRadius: 5,
                // color: new echarts.graphic.LinearGradient(
                //     0, 0, 0, 1,
                //     [{
                //             offset: 0,
                //             color: '#14c8d4'
                //         },
                //         {
                //             offset: 1,
                //             color: '#43eec6'
                //         }
                //     ]
                // )
                color: function (params) {
                  var colorList = [
                    '#0ec1ff',
                    '#10cdff',
                    '#12daff',
                    '#15ebff',
                    '#17f8ff',
                    '#1cfffb',
                    '#1dfff1'
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            data: [405.0, 96.0, 370.0]
          }
        ]
      }
    };
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          本季度各招商单位投资额完成情况
        </div>
        <div>
          <Chart option={this.option} />
        </div>
      </div>
    );
  }
};
