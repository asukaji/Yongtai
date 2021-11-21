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

    title: VueTypes.string.def()
  },

  computed: {
    xAxis() {
      return [
        {
          type: 'category',
          data: this.category
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
          data: this.legend
        },
        yAxis: {
          type: 'value'
        },
        xAxis: this.xAxis,
        series: [
          ...this.lines,
          ...this.bars
        ]
      };
    }
  },

  render() {
    return <div style={{marginTop: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', flex: 1}}>{this.title}
      <Card style={{marginTop: '8px'}}><VChart option={this.option}  style={{height: '200px'}} /></Card>
    </div>;
  }
};
