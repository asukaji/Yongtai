import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, BarChart, ScatterChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  ScatterChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PolarComponent,
]);

export default {
  name: "HelloWorld",

  components: {
    VChart,
  },

  props: {
    option: {
      type: Object,
      required: true,
    },
  },

  provide: {
    [THEME_KEY]: "dark"
  },

  render() {
    return (
      <v-chart
        style={{ height: '140px' }}
        option={this.option}
      />
    );
  },
};
