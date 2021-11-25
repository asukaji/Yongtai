import Gauge from './Charts/Gauge';
import { Table, TableColumn } from 'element-ui';

import { fetchAppraisal } from '@/api';

import { groupsMap } from '@/constants';
import _ from 'lodash';

export default {
  name: 'EvaluationProfile',

  data() {
    return {
      state: {
        list: undefined,
        investment: undefined,
        project: undefined
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
        _.assign(this.state, await fetchAppraisal(groupsMap[groups]));
      }
    }
  },

  render() {
    const { list, investment, project } = this.state;

    return (
      <div>
        <div style={{display: 'flex'}}>
          <Gauge
            title='项目任务完成情况'
            max={+project?.planTotal}
            data={[
              {
                value: project?.finishTotal,
                name: '任务项目',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]}
          >
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <label>完成项目</label>
              <pre style={{color: '#0078FF', fontSize: '24px', margin: '8px 0'}}>{project?.finishTotal}<span style={{color: '#303133', fontSize: '12px'}}>项</span></pre>
              <label>占比</label>
              <pre style={{ margin: '8px 0'}}>{project?.ratio}</pre>
            </div>
          </Gauge>
          <Gauge
            title='投资额完成情况'
            max={+investment?.planTotal}
            color="#FF7937"
            data={[
              {
                value: investment?.finishTotal,
                name: '任务投资额',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}
          >

            <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
              <label>完成投资额</label>
              <pre style={{color: '#FF7937', fontSize: '24px', margin: '8px 0'}}>{investment?.finishTotal}<span style={{color: '#303133', fontSize: '12px'}}>亿元</span></pre>
              <label>占总投资额</label>
              <pre style={{ margin: '8px 0'}}>{investment?.ratio}</pre>
            </div>
          </Gauge>
        </div>
        <Table
          data={list?.records}
          border
          show-summary
          height={512}
          style={{marginTop: '20px'}}
        >
          <TableColumn
            type="index"
            label="排名"
          />
          <TableColumn
            prop="teamId_dictText"
            label="单位"
          />
          <TableColumn label="项目">
            <TableColumn
              prop="projectPlanNum"
              label="任务数"
            />
            <TableColumn
              prop="projectFinishNum"
              label="完成数"
            />
          </TableColumn>
          <TableColumn
            label="投资额"
          >
            <TableColumn
              prop="invPlanNum"
              label="任务数"
            />
            <TableColumn
              prop="invFinishNum"
              label="完成数"
            />
          </TableColumn>
        </Table>
      </div>
    );
  }
};
