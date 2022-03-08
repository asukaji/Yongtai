import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([CanvasRenderer, LineChart, GridComponent, LegendComponent]);

export default {
  name: 'Lines',

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
          type: 'line',
          smooth: true,
          name: '成交价',
          areaStyle: {
            opacity: 0.1
          },
          data: _.map(this.value, 'finalPrice')
        },
        {
          type: 'line',
          smooth: true,
          name: '项目数',
          yAxisIndex: 1,
          areaStyle: {
            opacity: 0.1
          },
          data: _.map(this.value, 'projectNum')
        }
      ];
    },

    option() {
      return {
        grid: {
          bottom: 20,
          left: 12,
          right: 12
        },
        legend: {
          data: ['项目数', '成交价'],
          textStyle: { color: '#fff', fontSize: 10 }
        },
        xAxis: {
          type: 'category',
          data: this.category,
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: 'value',
            show: false
          },
          {
            type: 'value',
            show: false
          }
        ],
        series: this.series,
        color: ['#0054EE', '#09FFEB']
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '128px' }} />;
  }
};
