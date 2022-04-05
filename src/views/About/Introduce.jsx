import styles from './Introduce.module.less';

import title from '@/assets/About/title.png';

import Chart from './Chart1';

export default {
  data() {
    return {
      option: {
        backgroundColor: 'rgba(0, 8, 50, 0)',
        grid: {
          top: '20%',
          bottom: '20%',
          left: '5%',
          right: '5%'
        },
        color: ['rgb(67, 211, 244)', 'rgb(126,191,104)'],
        legend: {
          type: 'scroll',
          top: '-2%',
          right: '20',
          itemGap: 40,
          data: ['事件量', '事件量占比'],
          textStyle: {
            fontSize: 9,
            color: '#fff'
          }
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
          //   formatter: function(parms) {
          //       // console.log(parms)
          //       var str = parms[0].seriesName + ":" +
          //           +parms[0].value + " km2"
          //       var str1 = parms[1].seriesName + ":" +
          //           +parms[1].value + " 辆"
          //       return '<div>' + parms[0].name + '</div>' + str + "<br/>" + str1;
          //   }
        },
        xAxis: {
          data: [
            '诚峰镇',
            '长庆镇',
            '盖洋乡',
            '嵩口镇',
            '同安镇',
            '富泉镇',
            '葛岭镇',
            '塘前乡',
            '丹云乡',
            '白云乡',
            '红星乡'
          ],
          axisLine: {
            show: true, //隐藏X轴轴线
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false //隐藏X轴刻度
          },
          axisLabel: {
            show: true,
            interval: 0,
            textStyle: {
              color: 'rgb(138, 163, 176)',
              fontSize: 12
            }
          },
          // axisLine: {
          //   lineStyle: {
          //     //X轴线颜色
          //     color: 'rgb(11, 51, 67)'
          //   }
          // }
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            nameTextStyle: {
              color: '#fff',
              fontSize: 14
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: 'rgb(11, 51, 67)'
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              show: false,
              textStyle: {
                color: 'rgb(138, 163, 176)',
                fontSize: 16
              }
            }
          },
          {
            type: 'value',
            name: '',
            nameTextStyle: {
              color: '#fff',
              fontSize: 14
            },
            position: 'right',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff'
              }
            },
            axisLabel: {
              show: false,
              formatter: '{value}',
              textStyle: {
                color: 'rgb(138, 163, 176)',
                fontSize: 16
              }
            }
          }
        ],
        series: [
          {
            name: '事件量',
            type: 'bar',
            barWidth: 15,
            // itemStyle: {
            //   normal: {
            //     color: function (params) {
            //       return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            //         {
            //           offset: 0,
            //           color: 'rgba(67, 211, 244,1)'
            //         },
            //         {
            //           offset: 1,
            //           color: 'rgba(67, 211, 244,0)'
            //         }
            //       ]);
            //     },
            //     barBorderRadius: 10
            //   }
            // },
            data: [18, 11, 12, 22, 11, 10, 11, 12, 22, 11, 8, 7]
          },
          {
            name: '事件量占比',
            type: 'line',
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
            smooth: true,
            symbol: 'none', //标记的图形为实心圆
            itemStyle: {
              normal: {
                color: 'rgb(126,191,104)'
              }
            },
            data: [18, 20, 23, 25, 16, 17, 15, 13, 23, 12, 13, 12]
          }
        ]
      }
    };
  },

  render() {
    return (
      <div>
        <div class={styles.background}>
          <div class={styles.titleName}>
            <img src={title} class={styles.title}></img>
            <span class={styles.name}>乡村振兴</span>
          </div>
          <div>
            <Chart class={styles.chart} option={this.option}/>
          </div>
        </div>
      </div>
    );
  }
};