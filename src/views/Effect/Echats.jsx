import styles from './Echats.module.less';
import VChart from 'vue-echarts';

export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    projectClass: {
      type: String,
      required: true
    }
  },

  data() {
    return {};
  },

  computed: {
    name() {
      return this.list.map((item) => {
        return item.name;
      });
    },

    vallageNum() {
      return this.list.map((item) => {
        return item.vallageNum;
      });
    },

    projectNum() {
      return this.list.map((item) => {
        return item.projectNum;
      });
    },

    money() {
      return this.list.map((item) => {
        return item.money;
      });
    },

    finishMoney() {
      return this.list.map((item) => {
        return item.finishMoney;
      });
    },

    option() {
      return {
        backgroundColor: 'rgba(0, 8, 50, 0)',
        grid: {
          top: '20%',
          bottom: '25%',
          left: '3%',
          right: '1%'
        },
        color: ['rgb(67, 211, 244)', 'rgb(126,191,104)'],
        legend: {
          type: 'scroll',
          top: '-3%',
          right: '20',
          itemGap: 40,
          data: ['项目个数', '村庄个数', '总投资额', '完成投资额'],
          textStyle: {
            fontSize: 8,
            color: '#fff'
          }
        },

        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },

        xAxis: {
          data: this.name,
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
            rotate: '45',
            interval: 0,
            textStyle: {
              color: 'rgb(255, 255, 255)',
              fontSize: 10
            }
          }
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
          },
          // {
          //   type: 'value',
          //   name: '',
          //   nameTextStyle: {
          //     color: '#fff',
          //     fontSize: 14
          //   },
          //   position: 'right',
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#fff'
          //     }
          //   },
          //   axisLabel: {
          //     show: false,
          //     formatter: '{value}',
          //     textStyle: {
          //       color: 'rgb(138, 163, 176)',
          //       fontSize: 16
          //     }
          //   }
          // },
          // {
          //   type: 'value',
          //   name: '',
          //   nameTextStyle: {
          //     color: '#fff',
          //     fontSize: 14
          //   },
          //   position: 'right',
          //   splitLine: {
          //     show: false
          //   },
          //   axisTick: {
          //     show: false
          //   },
          //   axisLine: {
          //     show: false,
          //     lineStyle: {
          //       color: '#fff'
          //     }
          //   },
          //   axisLabel: {
          //     show: false,
          //     formatter: '{value}',
          //     textStyle: {
          //       color: 'rgb(138, 163, 176)',
          //       fontSize: 16
          //     }
          //   }
          // }
        ],
        series: [
          {
            name: '项目个数',
            type: 'bar',
            barWidth: 15,
            data: this.projectNum,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#0ff',
                fontSize: 12
              }
            }
          },
          {
            name: '村庄个数',
            type: 'line',
            yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个y轴的时候有用
            smooth: true,
            symbol: 'emptyCircle', //标记的图形为实心圆
            itemStyle: {
              normal: {
                color: 'rgb(126,191,104)'
              }
            },
            data: this.vallageNum,
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          },
          // {
          //   name: '总投资额',
          //   type: 'line',
          //   yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个y轴的时候有用
          //   smooth: true,
          //   symbol: 'emptyCircle', //标记的图形为实心圆
          //   itemStyle: {
          //     normal: {
          //       color: 'rgb(133,191,212)'
          //     }
          //   },
          //   data: this.money,
          //   label: {
          //     show: true,
          //     position: 'top',
          //     textStyle: {
          //       color: '#fff',
          //       fontSize: 12
          //     }
          //   }
          // },
          // {
          //   name: '完成投资额',
          //   type: 'line',
          //   yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个y轴的时候有用
          //   smooth: true,
          //   symbol: 'emptyCircle', //标记的图形为实心圆
          //   itemStyle: {
          //     normal: {
          //       color: 'rgb(126,0,104)'
          //     }
          //   },
          //   data: this.finishMoney,
          //   label: {
          //     show: true,
          //     position: 'top',
          //     textStyle: {
          //       color: '#fff',
          //       fontSize: 12
          //     }
          //   }
          // }
        ]
      };
    }
  },

  methods: {
    initChart(item) {
      const itemList = this.list.find((data) => data.name === item.name);
      this.$emit('click', itemList);
    }
  },

  render() {
    return (
      <div class={styles.background}>
        <VChart option={this.option} onclick={this.initChart.bind(this)} />
      </div>
    );
  }
};
