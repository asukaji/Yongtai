import { Table, TableColumn, Pagination} from 'element-ui';

import { fetchCompletion } from '@/api';
import _ from 'lodash';

export default {
  name: 'BusinessProject',

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

  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData(pageNo) {
      _.assign(this.state, await fetchCompletion('pro', pageNo ?? 1));
    }    
  },

  render() {
    const { list, total, pageSize, pageNo } = this.state;

    return <div>
      <Table
        data={list}
        style={{marginTop: '20px'}}
      >
        <TableColumn
          type="index"
          label="序号"
        />
        <TableColumn
          prop="name"
          label="项目名称"
        />
        <TableColumn
          prop="teamId_dictText"
          label="投资方名称"
        />
        <TableColumn
          prop="teamId_dictText"
          label="责任单位"
        />
        <TableColumn
          prop="process"
          label="完成情况"
        />
      </Table>
      <Pagination total={total} pageSize={pageSize} currentPage={pageNo} onCurrentChange={pageNo => this.fetchData(pageNo)} />
    </div>;
  }
};