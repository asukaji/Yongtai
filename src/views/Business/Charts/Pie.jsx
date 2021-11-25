import { Card } from 'element-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
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
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: 'Pie',

  props: {
    data: VueTypes.array.def([]),

    title: VueTypes.string.def()
  },

  computed: {
    legend() {
      return _.map(this.data, ({ name, unit }) => `${name}${unit ? `：${unit}` : ''}`);
    },

    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          bottom: 20
        },
        legend: {
          orient: 'vertical',
          right: '0',
          data: this.legend
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            radius: ['35%', '45%'],
            center: ['25%', '50%'],
            data: this.data
          },
          {
            name: 'Traffic Sources',
            type: 'pie',
            label: {
              show: false,
              position: 'center'
            },
            labelLine: {
              show: false
            },
            radius: ['50%', '60%'],
            center: ['25%', '50%'],
            data: this.data
          }
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
