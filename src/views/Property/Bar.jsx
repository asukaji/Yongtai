import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { LegendComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([CanvasRenderer, BarChart, LegendComponent, GridComponent]);

export default {
  name: 'Bar',

  props: {
    value: VueTypes.array.def([])
  },

  computed: {
    category() {
      return _.map(this.value, 'year');
    },

    series() {
      return [
        {
          type: 'bar',
          name: '成交数',
          barGap: '20%',
          itemStyle: {
            //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
            normal: {
              //柱形图圆角，初始化效果
              barBorderRadius: [15, 15, 0, 0]
            }
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
              fontSize: 13
            }
          },
          data: _.map(this.value, 'projectNum'),
          barWidth: 30
        },
        // {
        //   type: 'bar',
        //   name: '挂牌价',
        //   barGap: '40%',
        //   data: _.map(this.value, 'startingPrice')
        // },
        {
          type: 'line',
          name: '成交额(万元)',
          barGap: '20%',
          yAxisIndex: 1,
          smooth: true,
          label: {
            show: true,
            position: 'left',
            textStyle: {
              color: 'rgb(133,195,93)',
              fontSize: 12
            }
          },
          data: _.map(this.value, 'finalPrice')
        }
      ];
    },

    option() {
      return {
        grid: {
          left: 10,
          right: 20,
          top: 50,
          bottom: 20
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: ['成交数', '成交额(万元)'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: this.category,
            axisPointer: {
              type: 'shadow'
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '成交数',
            show: false,
            interval: 50
          },
          {
            type: 'value',
            name: '成交额(万元)',
            show: false,
            interval: 3
          }
        ],
        series: this.series
        // [
        //   {
        //     name: '成交宗数',
        //     type: 'bar',
        //     data: [
        //       2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
        //       3.3
        //     ]
        //   },
        //   {
        //     name: '成交总金额',
        //     type: 'line',
        //     yAxisIndex: 1,
        //     data: [
        //       2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2
        //     ]
        //   }
        // ]
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '200px' }} />;
  }
};
