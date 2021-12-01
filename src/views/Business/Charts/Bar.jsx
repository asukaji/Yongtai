import { Card } from 'element-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: 'Bar',

  props: {
    data: VueTypes.array.def([]),

    category: VueTypes.array.def([]),

    title: VueTypes.string.def(),

    innerTitle: VueTypes.bool.def(false),

    inverse: VueTypes.bool.def(false)
  },

  computed: {
    xAxis() {
      return [
        {
          type: 'category',
          data: this.category,
          axisLine: this.inverse ? {
            lineStyle: {
              color: '#fff'
            }
          } : undefined
        }
      ];
    },

    legend() {
      return _.map(this.data, 'name');
    },

    lines() {
      return _.filter(this.data, ['type', 'line']);
    },

    bars() {
      return _.filter(this.data, ['type', 'bar']);
    },

    option() {
      return {
        title: {
          show: this.innerTitle,
          text: this.title,
          textStyle: this.inverse ? {
            color: '#fff'
          } : undefined
        },
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          bottom: 20,
          left: 40,
          right: 40
        },
        legend: {
          left: '30%',
          data: this.legend,
          textStyle: this.inverse ? {color: '#fff'
          } : undefined
        },
        yAxis: [{
          type: 'value',
          axisLabel:  this.inverse ? {
            color: '#fff'
          } : {
            color: '#333'
          },
        },{
          type: 'value',
          axisLabel:  this.inverse ? {
            color: '#fff'
          } : {
            color: '#333'
          },
        }],
        xAxis: this.xAxis,
        series: [
          ...this.lines,
          ...this.bars
        ],
        color: ['#0078FF', '#FF7937', '#70F1B6']
      };
    }
  },

  render() {
    return <div style={{marginTop: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', flex: 1}}>{!this.innerTitle && this.title}
      <Card style={{marginTop: '8px'}}><VChart option={this.option}  style={{height: '200px'}} /></Card>
    </div>;
  }
};
