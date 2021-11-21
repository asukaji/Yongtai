import { Card } from 'element-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([
  CanvasRenderer,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

export default {
  name: 'Gauge',

  props: {
    data: VueTypes.array.def([]),

    title: VueTypes.string.def(),

    max: VueTypes.number.def(100),

    color: VueTypes.string.def('#0078FF')
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
            type: 'gauge',
            startAngle: 90,
            endAngle: -270,
            max: this.max,
            itemStyle: {
              color: this.color,
              shadowColor: 'rgba(0,138,255,0.45)',
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2
            },
            pointer: {
              show: false
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false
            },
            axisLine: {
              lineStyle: {
                width: 18
              }
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              distance: 50
            },
            data: this.data,
            title: {
              fontSize: 12
            },
            detail: {
              width: 50,
              height: 50,
              fontSize: 20,
              formatter: '{value}'
            }
          }
        ]
      };
    }
  },

  render() {
    return <div style={{marginTop: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', flex: 1}}>{this.title}
      <Card style={{marginTop: '8px'}}><VChart option={this.option}  style={{height: '150px'}} /></Card>
    </div>;
  }
};
