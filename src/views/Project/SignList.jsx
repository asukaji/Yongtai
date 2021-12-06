import { Table, TableColumn } from 'element-ui';

import { fetchProjectSignList } from '@/api';
import VueTypes from 'vue-types';

import _ from 'lodash';

export default {
  name: 'SignList',

  props: {
    id: VueTypes.string.def()
  },

  data() {
    return {
      state: {
        list: undefined,
        showFileList: false,
        fileList: []
      }
    };
  },

  watch: {
    id: {
      immediate: true,
      async handler(id) {
        this.state.showFileList = false;
        this.state.list = await fetchProjectSignList(id);
      }
    }
  },

  methods: {
    onClick(...args) {
      console.log(args);
    },

    renderFileList() {
      return (
        <div>
          {_.map(this.fileList, (src) => (
            <img src={src} />
          ))}
        </div>
      );
    }
  },

  render() {
    const { list, showFileList } = this.state;

    return showFileList ? (
      this.renderFileList()
    ) : (
      <Table
        data={list}
        border
        show-summary
        height={512}
        style={{ marginTop: '20px' }}
      >
        <TableColumn type="index" label="序号" width="56" />
        <TableColumn prop="createTime" label="打卡日期" />
        <TableColumn prop="userId_dictText" label="打卡人" />
        <TableColumn prop="area" label="打卡位置" />
        {/* <TableColumn
          label="操作"
          {...{
            scopedSlots: {
              //defaul 默认具名插槽
              default: (props) => {
                return (
                  <Button
                    size="mini"
                    type="primary"
                    onClick={this.onClick.bind(null, props)}
                  >
                    打卡图片
                  </Button>
                );
              }
            }
          }}
        ></TableColumn> */}
      </Table>
    );
  }
};
