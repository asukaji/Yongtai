import Gauge from './Charts/Gauge';
import { Table, TableColumn} from 'element-ui';

import { fetchAppraisal } from '@/api';

import { groupsMap } from '@/constants';

const dataSource = [
  { name: '信亚先进光电器件及模组技术研发中心', projectNum1:20, projectNum2: 10.5, userNum1: 70, userNum2: 38.53},
  {},
];

export default {
  name: 'EvaluationProfile',

  data() {
    return {
      state: {
        list: [],
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    };
  },

  computed: {
    groups() {
      return this.$route.name;
    }
  },

  watch: {
    groups: {
      immediate: true,
      async handler(groups) {
        await fetchAppraisal(groupsMap[groups]);
      }
    }
  },

  render() {
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Gauge
            title='项目任务完成情况'
            max={200}
            data={[
              {
                value: 92,
                name: '任务项目',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} />
          <Gauge
            title='投资额完成情况'
            max={1000}
            color="#FF7937"
            data={[
              {
                value: 390,
                name: '任务投资额',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}/>
        </div>
        <Table
          data={dataSource}
          border
          show-summary
          style={{marginTop: '20px'}}
        >
          <TableColumn
            type="index"
            label="排名"
          />
          <TableColumn
            prop="name"
            label="单位"
          />
          <TableColumn label="项目">
            <TableColumn
              prop="projectNum1"
              label="任务数"
            />
            <TableColumn
              prop="projectNum2"
              label="完成数"
            />
          </TableColumn>
          <TableColumn
            label="投资额"
          >
            <TableColumn
              prop="userNum1"
              label="任务数"
            />
            <TableColumn
              prop="userNum2"
              label="完成数"
            />
          </TableColumn>
        </Table>
      </div>
    );
  }
};
