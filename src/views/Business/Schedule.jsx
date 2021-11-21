import Lines from './Charts/Line';
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
          <Lines
            title="各季度投资总额完成情况"
            category={[
              "2021-07-16",
              "2021-07-17",
              "2021-07-18",
              "2021-07-19",
              "2021-07-20",
              "2021-07-21",
              "2021-07-22",
              "2021-07-23",
              "2021-07-24"
            ]}
            data={[{
              name: '项目总数',
              unit: '项',
              type: 'line',
              showSymbol: false,
              smooth: true,
              data: [
                116,
                85,
                130,
                245,
                139,
                115,
                107,
                82,
                44,
              ]
            },{
              name: '已完成项目',
              unit: '项',
              type: 'line',
              showSymbol: false,
              smooth: true,
              data: [
                73,
                83,
                125,
                72,
                106,
                84,
                93,
                85,
                106,
              ]
            }]}
          />
          <Pie
            title='本季度各招商单位投资额完成情况'
            category={['2021/五', '2021/六', '2021/七', '2021/八']}
            data={[
              { value: 335, name: '专业招商小分队' },
              { value: 310, name: '乡镇招商小分队' },
              { value: 234, name: '县直单位' }
            ]} style={{marginLeft: '10px'}}/>
        </div>

        <TabButtons tabs={Tabs} />
        <router-view></router-view>
      </div>
    );
  }
};
