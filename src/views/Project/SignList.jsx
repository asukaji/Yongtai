import { Table, TableColumn, Button, Empty } from 'element-ui';

import { fetchProjectSignList } from '@/api';
import VueTypes from 'vue-types';

import _ from 'lodash';

export default {
  name: 'SignList',

  props: {
    id: VueTypes.string.def(),

    step: VueTypes.number.def(1)
  },

  data() {
    return {
      fileList: undefined,
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
    },

    step(step) {
      if (step === 2) {
        return;
      }
      this.state.showFileList = false;
      this.fileList = undefined;
    }
  },

  methods: {
    onClick({ row: { fileList } }) {
      this.state.showFileList = true;
      this.fileList = fileList;
      this.$emit('changeStep');
    },

    renderFileList() {
      return _.size(this.fileList) ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '25% 25% 25% 25%',
            marginTop: '20px',
            height: '192px',
            maxHeight: '392px',
            overflow: 'auto'
          }}
        >
          {_.map(this.fileList, (src) => (
            <img
              key={src}
              src={src}
              vViewer
              style={{
                width: '192px',
                minWidth: '192px',
                marginRight: '8px',
                marginBottom: '8px'
              }}
            />
          ))}
        </div>
      ) : (
        <Empty />
      );
    }
  },

  render() {
    const { list, showFileList } = this.state;

    return showFileList ? (
      this.renderFileList()
    ) : (
      <Table data={list} border height={512} style={{ marginTop: '20px' }}>
        <TableColumn type="index" label="序号" width="56" />
        <TableColumn prop="createTime" label="打卡日期" />
        <TableColumn prop="userId_dictText" label="打卡人" />
        <TableColumn prop="area" label="打卡位置" />
        <TableColumn prop="remark" label="进展情况" />
        <TableColumn prop="troubles" label="存在问题" />
        <TableColumn prop="nextPlan" label="下一步计划" />
        <TableColumn
          label="附件"
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
        ></TableColumn>
      </Table>
    );
  }
};
