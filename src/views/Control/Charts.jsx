import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

import { mapGetters } from 'vuex';

use([
  CanvasRenderer,
  BarChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default {
  name: 'Charts',

  computed: {
    ...mapGetters('control', [
      'projectPieOptions',
      'projectOptions',
      'landPieOptions',
      'landOptions'
    ])
  },

  render() {
    return <div style={{
      width: '300px'
    }}>
      {<VChart option={this.projectOptions}  style={{height: '200px', marginTop: '12px'}} />}
      {<VChart option={this.projectPieOptions}  style={{height: '100px', marginTop: '12px'}} />}
      {<VChart option={this.landOptions}  style={{height: '200px', marginTop: '12px'}} />}
      {<VChart option={this.landPieOptions}  style={{height: '100px', marginTop: '12px'}} />}
    </div>;
  }
};