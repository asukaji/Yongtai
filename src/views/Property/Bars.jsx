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
          itemStyle: {
            normal: {
              color: 'rgba(248, 188, 64, 1)',
              borderWidth: 1,
              borderColor: 'rgba(248, 100, 30, 1)'
            }
          },
          label: {
            show: true,
            position: [13,-30],
            textStyle: {
              color: '#fff',
              fontSize: 13
            }
          },
          barGap: '40%',
          data: _.map(this.value, 'projectNum'),
          barWidth: 40
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
          itemStyle: {
            normal: {
              color: 'rgba(0, 255, 255, 1)'
            }
          },
          label: {
            show: true,
            position: 'left',
            textStyle: {
              color: '#0ff',
              fontSize: 12
            }
          },
          yAxisIndex: 1,
          barGap: '40%',
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
            show: false,
            name: '成交数',
            // min: 0,
            interval: 50
          },
          {
            type: 'value',
            show: false,
            name: '成交额(万元)',
            interval: 5
          }
        ],
        series: this.series
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '200px' }} />;
  }
};
