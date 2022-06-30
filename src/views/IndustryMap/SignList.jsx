import { Table, TableColumn } from 'element-ui';
import styles from './SignList.module.less';

export default {
  props: {
    records: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    record: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      card: true,
      cardTwo: false
    };
  },

  methods: {
    onClick() {
      this.$emit('change', false);
    },

    onAccess() {
      this.card = false;
      this.cardTwo = true;
    },

    onBack() {
      this.card = true;
      this.cardTwo = false;
    },

    formatter(row) {
      console.log('222222',row);
      return row.finished === 1 ? '是' : row.finished === 0 ? '否' : '';
    }
  },

  render() {
    return (
      <div class={styles.background}>
        <div class={styles.title}>
          <h2 align="left" style={{ paddingLeft: '30px' }}>
            {this.name}
          </h2>
          <span onclick={this.onClick.bind(this)}>关闭</span>
        </div>
        <div class={styles.table}>
          {this.card && (
            <Table
              data={this.records}
              border
              height={400}
              default-sort={{ prop: 'createTime', order: 'descending' }}
            >
              <TableColumn type="index" label="序号" width="56" />
              <TableColumn prop="createTime" label="打卡日期" sortable />
              <TableColumn prop="userId_dictText" label="打卡人" />
              <TableColumn
                prop="finished"
                label="是否竣工"
                formatter={this.formatter}
              />
              {this.signType ? (
                <TableColumn prop="itemId_dictText" label="类型" />
              ) : (
                <TableColumn prop="area" label="打卡位置" />
              )}
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
                          onClick={this.onAccess.bind(this)}
                        >
                          进展附件
                        </Button>
                      );
                    }
                  }
                }}
              ></TableColumn>
            </Table>
          )}
          {this.cardTwo && (
            <div>
              <div class={styles.title}>
                <span onclick={this.onBack.bind(this)}>返回</span>
              </div>
              <div class={styles.imgs}>
                {this.record.map((item) => {
                  if (item.fileList !== null) {
                    return item.fileList.map((data) => {
                      return (
                        <img class={styles.img} src={data.filePath} vViewer />
                      );
                    });
                  } else {
                    return;
                  }
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
};
