import TabButtons from './TabButtons';

import { BUSINESS_TASK_UNIT,
  BUSINESS_TASK_TOWN, BUSINESS_SCHEDULE_STREET } from '@/constants';

const Tabs = [
  [BUSINESS_TASK_UNIT, '专业招商小分队'],
  [BUSINESS_TASK_TOWN, '乡镇招商小分队'],
  [BUSINESS_SCHEDULE_STREET, '县直单位']
];

export default {
  name: 'Task',

  render() {
    return (
      <div>
        <TabButtons tabs={Tabs} />
        <router-view></router-view>
      </div>
    );
  }
};
