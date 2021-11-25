import Pie from './Charts/Pie';
import TabButtons from './TabButtons';

import { fetchChronological } from '@/api';
import _ from 'lodash';

import { BUSINESS_SCHEDULE_UNIT, BUSINESS_SCHEDULE_TOWN, BUSINESS_SCHEDULE_STREET } from '@/constants';

const Tabs = [
  [BUSINESS_SCHEDULE_UNIT, '专业招商小分队'],
  [BUSINESS_SCHEDULE_TOWN, '乡镇招商小分队'],
  [BUSINESS_SCHEDULE_STREET, '县直单位']
];

export default {
  name: 'Schedule',

  data() {
    return {
      state: {
        quarterData: undefined
      }
    };
  },

  computed: {
    quarterData() {
      return _.map(this.state.quarterData?.groups, ({finish, groups, plan}) => ([
        {name: groups, value: finish.replace('亿元', ''), inner: 1 },
        {name: groups, value: plan.replace('亿元', ''), inner: 0 }
      ])).flat();
    }
  },

  async mounted() {
    _.assign(this.state, await fetchChronological());
  },

  render() {
    const { quarterData } = this.state;

    return (
      <div>
        <div style={{display: 'flex', marginBottom: '20px'}}>
          <Pie
            title='本季度各招商单位投资额完成情况'
            total={[quarterData?.totalFinish, quarterData?.totalPlan]}
            data={this.quarterData}
          />
        </div>

        <TabButtons tabs={Tabs} />
        <router-view></router-view>
      </div>
    );
  }
};
