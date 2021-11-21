import Lines from './Charts/Line';
import Pie from './Charts/Pie';
import TabButtons from './TabButtons';

import { BUSINESS_TASK_UNIT,
  BUSINESS_TASK_TOWN } from '@/constants';

const Tabs = [
  [BUSINESS_TASK_UNIT, '专业招商小分队'],
  [BUSINESS_TASK_TOWN, '乡镇招商小分队']
];

export default {
  name: 'Task',

  render() {
    return (
      <div>
        <div style={{display: 'flex', marginBottom: '20px'}}>
          <Lines
            title="每周项目完成情况"
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
            title='本季度各招商单位落地项目与投资额'
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
