import TabButtons from './TabButtons';

import {
  // BUSINESS_EVALUATION_PROFILE,
  BUSINESS_EVALUATION_UNIT, BUSINESS_EVALUATION_UNIT_TOWN, BUSINESS_EVALUATION_UNIT_STREET } from '@/constants';

const Tabs = [
  // [BUSINESS_EVALUATION_PROFILE, '总体情况'],
  [BUSINESS_EVALUATION_UNIT, '专业招商小分队'],
  [BUSINESS_EVALUATION_UNIT_TOWN, '乡镇招商小分队'],
  [BUSINESS_EVALUATION_UNIT_STREET, '县直单位']
];

export default {
  name: 'Evaluation',

  render() {
    return (
      <div>
        <TabButtons tabs={Tabs} />
        <router-view></router-view>
      </div>
    );
  }
};
