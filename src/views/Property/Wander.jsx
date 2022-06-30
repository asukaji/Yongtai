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

    values: {
      type: Array,
      required: true
    },

    max: VueTypes.number.def(100)
  },

  computed: {
    legend() {
      return _.map(this.value, 'name');
    },

    option() {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 20,
          bottom: 60
        },
        xAxis: {
          // rotate: 90,
          type: 'category',
          axisLabel: {
            formatter: function (value) {
              return value.split('').join('\n');
            },
            textStyle: {
              color: '#fff'
            }
          },
          data: this.values.map((item) => {
            return item.townName;
          })
        },
        yAxis: [
          {
            type: 'value',
            show: false
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            data: this.values.map((item) => {
              return item.num;
            }),
            barWidth: '50%',
            type: 'bar',
            itemStyle: {
              normal: {
                color: 'rgba(46, 210, 150, 1)'
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            }
          }
        ]
      };
    }
  },

  methods: {
    initChart(item) {
      const itemList = this.values.find(
        (data) => data.townName === item.name
      );
      this.$emit('change', itemList);
    }
  },

  render() {
    return (
      <VChart
        option={this.option}
        // style={{ height: '80%', flex: 1 }}
        onclick={this.initChart.bind(this)}
      />
    );
  }
};
