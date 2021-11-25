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

    title: VueTypes.string.def(),

    total: VueTypes.array.def([0, 0]),
  },

  computed: {
    legend() {
      return _.map(this.data, ({ name, unit }) => `${name}${unit ? `：${unit}` : ''}`);
    },

    innerData() {
      return _.filter(this.data, ['inner', 1]);
    },

    outerData() {
      return _.filter(this.data, ['inner', 0]);
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
          data: this.legend,
          formatter: (name) => {
            const data = _.filter(this.data, ['name', name]);
            return `${name}\n\n本季度投资任务：${data?.[0]?.value} 亿元\n已完成：${data?.[1]?.value} 亿元`;
          }
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            label: {
              position: 'center',
              formatter: `总投资额(亿元)\n{a|${this.total[0]}}\n已完成投资额(亿元)\n{a|${this.total[1]}}`,
              rich: {
                a: { fontSize: '20px' }
              }
            },
            labelLine: {
              show: false
            },
            radius: ['55%', '65%'],
            center: ['25%', '50%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: this.innerData
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
            radius: ['70%', '80%'],
            center: ['25%', '50%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            data: this.outerData
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
