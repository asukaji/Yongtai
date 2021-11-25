import { Table, TableColumn} from 'element-ui';
import Gauge from './Charts/Gauge';

import { fetchCompletion } from '@/api';

import { groupsMap } from '@/constants';
import _ from 'lodash';

const dataSource = [
  { name: '重大项目招商小分队(招商办)', num1: 14, num2: 1, num3: 34, num4: 12.5, num5: 3, num6: 6},
  {},
];

export default {
  name: 'TaskUnit',

  data() {
    return {
      state: {
        list: undefined,
        other: undefined,
        outCity: undefined,
        tai: undefined
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
        _.assign(this.state, await fetchCompletion(groupsMap[groups]));
      }
    }
  },

  render() {
    const { list, other, outCity, tai } = this.state;
    return (
      <div>
        <div style={{display: 'flex'}}>
          <Gauge
            title='市外服务业'
            max={+outCity?.planTotal}
            small
            data={[
              {
                value: 14,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
              <label>完成数</label>
              <pre style={{color: '#0078FF', fontSize: '24px', margin: '8px 0'}}>{outCity?.finishTotal}<span style={{color: '#303133', fontSize: '12px'}}>项</span></pre>
              <label>占比</label>
              <pre style={{ margin: '8px 0'}}>{outCity?.ratio}</pre>
            </div>
          </Gauge>
          <Gauge
            title='其他产业'
            max={+other?.planTotal}
            color="#FF7937"
            small
            data={[
              {
                value: 34,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
              <label>完成数</label>
              <pre style={{color: '#FF7937', fontSize: '24px', margin: '8px 0'}}>{other?.finishTotal}<span style={{color: '#303133', fontSize: '12px'}}>项</span></pre>
              <label>占比</label>
              <pre style={{ margin: '8px 0'}}>{other?.ratio}</pre>
            </div>
          </Gauge>
          <Gauge
            title='台资合同'
            max={+tai?.planTotal}
            color="#28D2B0"
            small
            data={[
              {
                value: 3,
                name: '任务数',
                title: {
                  offsetCenter: [0, -10]
                },
                detail: {
                  valueAnimation: true,
                  offsetCenter: [0, 10]
                }
              }
            ]} style={{marginLeft: '10px'}}>

            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}}>
              <label>完成数</label>
              <pre style={{color: '#28D2B0', fontSize: '24px', margin: '8px 0'}}>{tai?.finishTotal}<span style={{color: '#303133', fontSize: '12px'}}>项</span></pre>
              <label>占比</label>
              <pre style={{ margin: '8px 0'}}>{tai?.ratio}</pre>
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
            label="序号"
          />
          <TableColumn
            prop="teamId_dictText"
            label="责任单位"
          />
          <TableColumn label="市外服务业">
            <TableColumn
              prop="outFinish"
              label="任务数"
            />
            <TableColumn
              prop="outPlan"
              label="完成数"
            />
          </TableColumn>
          <TableColumn label="其他产业">
            <TableColumn
              prop="otherPlan"
              label="任务数"
            />
            <TableColumn
              prop="otherFinish"
              label="完成数"
            />
          </TableColumn>
          <TableColumn label="台资合同">
            <TableColumn
              prop="taiPlan"
              label="任务数"
            />
            <TableColumn
              prop="taiFinish"
              label="完成数"
            />
          </TableColumn>
        </Table>
      </div>
      
    );
  }
};
