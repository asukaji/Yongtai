import { Table, TableColumn } from 'element-ui';

import { fetchChronological } from '@/api';
import _ from 'lodash';

import { groupsMap } from '@/constants';

export default {
  name: 'ScheduleUnit',

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
        _.assign(this.state, await fetchChronological(groupsMap[groups]));
      }
    }
  },

  render() {
    const { list } = this.state;
    return (
      <div>
        <Table data={list} border height={512} style={{ marginTop: '20px' }}>
          <TableColumn type="index" label="序号" />
          <TableColumn prop="teamId_dictText" label="责任单位" />
          <TableColumn label="1-12月任务数">
            <TableColumn prop="planNum" label="投资额(亿元)" />
          </TableColumn>
          <TableColumn label="已完成数 (截至12月31日)">
            <TableColumn prop="finishNum" label="投资额(亿元)" />
          </TableColumn>
          <TableColumn label="12月31日前应完成数">
            <TableColumn prop="shoudNum" label="投资额(亿元)" />
          </TableColumn>
        </Table>
      </div>
    );
  }
};
