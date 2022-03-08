import { Table, TableColumn } from 'element-ui';

import { fetchImportant } from '@/api';
import _ from 'lodash';

export default {
  name: 'BusinessProject',

  data() {
    return {
      state: {
        records: undefined
      }
    };
  },

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      _.assign(this.state, await fetchImportant());
    }
  },

  render() {
    const { records } = this.state;

    return (
      <div>
        <Table  data={records} 
          height={512} style={{ marginTop: '20px' }}>
          <TableColumn type="index" label="序号" />
          <TableColumn prop="projectName" label="项目名称" />
          <TableColumn prop="investor" label="投资方名称" />
          <TableColumn prop="teamId_dictText" label="责任单位" />
          <TableColumn prop="state" label="完成情况" />
        </Table>
      </div>
    );
  }
};
