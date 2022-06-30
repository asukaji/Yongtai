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
          name: '评估面积',
          barGap: '40%',
          data: _.map(this.value, 'acreage')
        },
        {
          type: 'bar',
          name: '林木成交价',
          barGap: '40%',
          yAxisIndex: 1,
          data: _.map(this.value, 'projectNum')
        }
      ];
    },

    option() {
      return {
        grid: {
          left: 10,
          right: 20,
          top: 20,
          bottom: 25
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
          data: ['Evaporation', 'Temperature'],
          textStyle: {
            color: '#fff'
          }
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
            name: 'Precipitation',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            show: false,
            name: 'Temperature',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} °C'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3
            ]
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            data: [
              2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2
            ]
          }
        ]
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '180px' }} />;
  }
};
