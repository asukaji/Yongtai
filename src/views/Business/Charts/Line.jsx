import { Card } from 'element-ui';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent
]);

export default {
  name: 'Lines',

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

    option() {
      return {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          bottom: 20,
          left: 40,
          right: 20
        },
        legend: {
          left: '30%',
          data: this.legend,
          show: true
        },
        visualMap: [
          {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],
        yAxis: {
          type: 'value'
        },
        xAxis: this.xAxis,
        series: this.data
      };
    }
  },

  render() {
    return <div style={{marginTop: '16px', textAlign: 'left', fontWeight: 'bold', fontSize: '16px', flex: 1}}>{this.title}
      <Card style={{marginTop: '8px'}}><VChart option={this.option}  style={{height: '200px'}} /></Card>
    </div>;
  }
};
