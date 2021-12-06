import { Table, TableColumn, Button } from 'element-ui';

import { fetchProjectSignList } from '@/api';
import VueTypes from 'vue-types';

// import _ from 'lodash';

export default {
  name: 'SignList',

  props: {
    id: VueTypes.string.def()
  },

  data() {
    return {
      state: {
        list: undefined
      }
    };
  },

  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.state.list = await fetchProjectSignList(id);
      }
    }
  },

  render() {
    const { list } = this.state;

    return (
      <div>
        <Table
          data={list}
          border
          show-summary
          height={512}
          style={{marginTop: '20px'}}
        >
          <TableColumn
            type="index"
            label="序号"
            width="56"
          />
          <TableColumn
            prop="createTime"
            label="打卡日期"
          />
          <TableColumn
            prop="userId_dictText"
            label="打卡人"
          />
          <TableColumn
            prop="area"
            label="打卡位置"
          />
          <TableColumn
            label="操作"
          >
            <Button size="mini" type="primary">打卡图片</Button>
          </TableColumn>
        </Table>
      </div>
    );
  }
};
