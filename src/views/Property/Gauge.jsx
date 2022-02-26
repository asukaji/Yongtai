import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { GaugeChart } from 'echarts/charts';
import { LegendComponent, GridComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([CanvasRenderer, GaugeChart, LegendComponent, GridComponent]);

export default {
  name: 'Gauge',

  props: {
    value: VueTypes.array.def([]),

    max: VueTypes.number.def(100)
  },

  computed: {
    legend() {
      return _.map(this.value, 'name');
    },

    option() {
      return {
        grid: {
          bottom: 20,
          left: 0
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
              show: false
            },
            data: this.value,
            title: {
              show: false
            },
            detail: {
              show: false
            }
          }
        ]
      };
    }
  },

  render() {
    return <VChart option={this.option} style={{ height: '128px', flex: 1 }} />;
  }
};
