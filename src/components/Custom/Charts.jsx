import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, GaugeChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';
import VueTypes from 'vue-types';
import _ from 'lodash';
import styles from './Charts.module.less';

use([
  CanvasRenderer,
  LineChart,
  BarChart,
  PieChart,
  GaugeChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: 'Charts',

  props: {
    values: VueTypes.array.def([])
  },

  render() {
    return <div class={styles.container}>
      {
        _.map(this.values, ({title, option }) => (
          <div class={styles.chart} key={title}>
            <h3>{title}</h3>
            <VChart option={option}  style={{height: '100px'}} />
          </div>
        ))
      }
      
    </div>;
  }
};
