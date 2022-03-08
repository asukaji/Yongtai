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
          name: '项目数',
          barGap: '40%',
          data: _.map(this.value, 'projectNum')
        },
        {
          type: 'bar',
          name: '挂牌价',
          barGap: '40%',
          data: _.map(this.value, 'startingPrice')
        },
        {
          type: 'bar',
          name: '成交价',
          barGap: '40%',
          data: _.map(this.value, 'finalPrice')
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
          data: ['项目数', '挂牌价', '成交价'],
          textStyle: { color: '#fff', fontSize: 10 }
        },
        yAxis: {
          type: 'value',
          show: false
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
        label: {
          show: true,
          position: 'top',
          color: '#fff',
          fontSize: 8
        },
        series: this.series,
        color: ['#E33134', '#31E6A9', '#2724B7']
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '128px' }} />;
  }
};
