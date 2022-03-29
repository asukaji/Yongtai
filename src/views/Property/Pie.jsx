import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart } from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';

use([CanvasRenderer, PieChart, TitleComponent, LegendComponent, GridComponent]);

const colors = [
  '#FACC14',
  '#2FC25B',
  '#13C2C2',
  '#F04864',
  '#1890FF',
  '#2724B7'
];

export default {
  name: 'Pie',

  props: {
    value: VueTypes.object.def()
  },

  computed: {
    innerData() {
      const { per0, per1, per2, per3, per4 } = this.value;

      return [
        { value: per0, name: '10000<' },
        { value: per1, name: '20000<' },
        { value: per2, name: '30000<' },
        { value: per3, name: '40000<' },
        { value: per4, name: '50000<' }
        // { value: per5, name: '60000<' }
      ];
    },

    option() {
      return {
        title: {
          show: true,
          text: '成交金额占比',
          textStyle: {
            color: '#fff',
            fontSize: 14
          }
        },
        grid: {
          bottom: 0,
          right: 0
        },
        legend: {
          orient: 'vertical',
          left: 20,
          top: 36,
          data: ['10000<', '20000<', '30000<', '40000<', '50000<', '60000<'],
          width: 50,
          itemWidth: 18,
          itemHeight: 8,
          itemGap: 8,
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        series: [
          {
            type: 'pie',
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            radius: ['40%', '80%'],
            center: ['70%', '60%'],
            itemStyle: {
              color: ({ dataIndex }) => colors[dataIndex]
            },
            data: this.innerData
          }
        ]
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '128px' }} />;
  }
};
