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
    return (
      <div class={styles.container}>
        {_.map(this.values, ({ title, option, type, cards, pre }) => (
          <div class={styles.chart} key={title}>
            {title && (
              <h3>
                {title}
                {pre && <pre>{pre}</pre>}
              </h3>
            )}
            {type === 'card' ? (
              <div class={styles.cards}>
                {_.map(cards, ({ name, value }) => (
                  <div>
                    <p>{name}</p>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            ) : (
              <VChart
                option={option}
                style={{ height: '120px', marginTop: '12px' }}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
};
