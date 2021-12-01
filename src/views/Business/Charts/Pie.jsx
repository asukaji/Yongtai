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

const colors = {
  inner: ['#0FDAFF', '#70F1B6', '#FFC778'],
  outer: ['#0078FF', '#28D2B0', '#FF7937'],
};

export default {
  name: 'Pie',

  props: {
    data: VueTypes.array.def([]),

    title: VueTypes.string.def(),

    total: VueTypes.array.def([0, 0]),
  },

  computed: {
    legend() {
      return _.map(this.data, ({ name, inner}) => `${name}.${inner}`);
    },

    innerData() {
      return _.map(_.filter(this.data, ['inner', 1]), ({name, value}) => ({ value, name: `${name}.1`}));
    },

    outerData() {
      return _.map(_.filter(this.data, ['inner', 0]), ({name, value}) => ({value, name: `${name}.0`}));
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
          orient: 'horizontal',
          right: 20,
          data: this.legend,
          icon: 'circle',
          width: 400,
          formatter: (name) => {
            const [originName, inner] = name.split('.');
            const data = _.find(this.data, {name: originName, inner: +inner});
            
            return `${+inner ? '' : originName}\n${+inner ? '已完成' : '本季度投资任务'}：${data?.value} 亿元\n`;
          },
          textStyle: {
            lineHeight: 20
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
                a: { fontSize: '18px', fontWeight: 'bold', lineHeight: 28}
              }
            },
            labelLine: {
              show: false
            },
            radius: ['55%', '65%'],
            center: ['16%', '50%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              color: ({dataIndex}) => colors.inner[dataIndex]
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
            center: ['16%', '50%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
              color: ({dataIndex}) => colors.outer[dataIndex]
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
