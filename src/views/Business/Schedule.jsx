import Pie from './Charts/Pie';
import TabButtons from './TabButtons';

import { BUSINESS_SCHEDULE_UNIT, BUSINESS_SCHEDULE_TOWN, BUSINESS_SCHEDULE_STREET } from '@/constants';

const Tabs = [
  [BUSINESS_SCHEDULE_UNIT, '专业招商小分队'],
  [BUSINESS_SCHEDULE_TOWN, '乡镇招商小分队'],
  [BUSINESS_SCHEDULE_STREET, '县直单位']
];

export default {
  name: 'Schedule',

  render() {
    return (
      <div>
        <div style={{display: 'flex', marginBottom: '20px'}}>
          <Pie
            title='本季度各招商单位投资额完成情况'
            category={['2021/五', '2021/六', '2021/七', '2021/八']}
            data={[
              { value: 335, name: '专业招商小分队' },
              { value: 310, name: '乡镇招商小分队' },
              { value: 234, name: '县直单位' }
            ]}
          />
        </div>

        <TabButtons tabs={Tabs} />
        <router-view></router-view>
      </div>
    );
  }
};
