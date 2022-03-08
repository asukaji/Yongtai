import { Header } from '@/components/mobile';
import { Form, FormItem, Button, Empty } from 'element-ui';
import styles from './Record.module.less';

import { fetchUserCheckedRecord } from '@/api';
import { mapMutations, mapState } from 'vuex';
import _ from 'lodash';

// const debug = [
//   { createTime: '2021-01-01  9:30', area: 'asdasdasd', remark: 'asdqweqweqwe' },
//   { createTime: '2021-01-01  9:30', area: 'asdasdasd', remark: 'asdqweqweqwe' }
// ];

export default {
  name: 'Record',

  computed: {
    ...mapState('mobile', ['records']),

    projectId() {
      return this.$route.params.id;
    }
  },

  async mounted() {
    this.setRecords([
      await fetchUserCheckedRecord(this.projectId),
      this.projectId
    ]);
  },

  methods: {
    ...mapMutations('mobile', ['setRecords']),

    onSuccess(type, { message }) {
      this.setFileList([message, type]);
    }
  },

  render() {
    return (
      <div>
        <Header />
        <div class={styles.container}>
          {_.size(_.get(this.records, this.projectId)) ? (
            _.map(
              _.get(this.records, this.projectId),
              ({ createTime, area, remark, nextPlan, troubles }, index) => (
                <Form labelWidth="120px" labelPosition="left" size="mini">
                  <FormItem label="打卡时间">{createTime}</FormItem>
                  <FormItem label="打卡地点">{area}</FormItem>
                  <FormItem label="下一步计划">{nextPlan}</FormItem>
                  <FormItem label="存在问题">{troubles}</FormItem>
                  <FormItem label="备注">{remark}</FormItem>
                  <FormItem>
                    <Button
                      type="primary"
                      size="mini"
                      onClick={() =>
                        this.$router.push(
                          `/appendix/${this.$route.params.id}/${index}`
                        )
                      }
                    >
                      查看附件
                    </Button>
                  </FormItem>
                </Form>
              )
            )
          ) : (
            <Empty />
          )}
        </div>
      </div>
    );
  }
};
