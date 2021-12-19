import { Form, FormItem, Input, Button } from 'element-ui';
import styles from './CheckForm.module.less';

import moment from 'moment';
import { mapState } from 'vuex';
import { check } from '@/api';
import _ from 'lodash';

import upload from '@/assets/Icon/icon-upload.png';

const rules = {
  remark: [{ required: true, message: '请输入备注' }]
};

export default {
  name: 'CheckForm',

  data() {
    return {
      state: {
        time: moment(),
        loading: false
      },
      form: {
        remark: ''
      },
      counter: undefined
    };
  },

  computed: {
    ...mapState('mobile', ['location', 'position', 'imgList', 'videoList']),

    currentTime() {
      return this.state.time.format('HH:mm:ss');
    },

    fileList() {
      return _.map(_.concat([], this.imgList, this.videoList), ({ url }) => ({
        filePath: url
      }));
    }
  },

  mounted() {
    this.counter = this.setTime();
  },

  beforeDestroy() {
    clearTimeout(this.counter);
  },

  methods: {
    onSubmit() {
      if (!this.location) {
        this.$message({
          message: '定位失败',
          type: 'error'
        });

        return;
      }

      if (_.size(this.fileList) === 0) {
        this.$message({
          message: '未上传照片',
          type: 'error'
        });

        return;
      }

      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.state.loading = true;

            await check({
              area: this.location,
              fileList: this.fileList,
              projectId: this.$route.params.id,
              remark: this.form.remark
            });

            this.$message({
              message: '打卡成功',
              type: 'success'
            });
          } catch (err) {
            this.$message({
              message: err,
              type: 'error'
            });
          } finally {
            this.state.loading = false;
          }
        }
      });
    },

    setTime() {
      setTimeout(() => {
        this.state.time = moment();
        this.setTime();
      }, 1024);
    },

    renderCamera() {
      return (
        <router-link
          to={`/upload/${this.$route.params.id}`}
          class={styles.upload}
        >
          <span>点击这里拍照</span>
          <img src={upload} />
        </router-link>
      );
    }
  },

  render() {
    return (
      <div class={styles.form}>
        <Form
          ref="form"
          {...{
            props: {
              model: this.form, ////vue jsx element 表单校验的model不可以直接写 以这种方式解决
              rules: rules
              // labelPosition: 'top'
            }
          }}
        >
          <FormItem label="我的位置">{this.location ?? '--'}</FormItem>
          <FormItem label="拍照/小视频">{this.renderCamera()}</FormItem>
          <FormItem label="备注（必填）" prop="remark">
            <Input
              vModel={this.form.remark}
              placeholder="请输入内容"
              type="textarea"
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              disabled={this.state.loading}
              onClick={this.onSubmit}
            >
              {this.currentTime} 打卡
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
};
