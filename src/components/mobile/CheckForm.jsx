import { Form, FormItem, Input, Button, Select, Option } from 'element-ui';
import { withAmap } from '@amap/amap-vue';
import styles from './CheckForm.module.less';

import moment from 'moment';
import { mapState, mapMutations } from 'vuex';
import { check } from '@/api';
import _ from 'lodash';

// import { POSITION } from '@/constants';
import upload from '@/assets/Icon/icon-upload.png';

const rules = {
  finished: [{ required: true, message: '请选择选项' ,trigger: 'blur'}],
  remark: [{ required: true, message: '请输入备注' }]
};

export default {
  name: 'CheckForm',

  mixins: [withAmap],

  data() {
    return {
      state: {
        time: moment(),
        loading: false
      },
      form: {
        finished: '',
        remark: '',
        nextPlan: '',
        troubles: ''
      },
      counter: undefined,
      options: [
        {
          value: '0',
          label: '未竣工'
        },
        {
          value: '1',
          label: '竣工'
        }
      ],
    };
  },

  computed: {
    ...mapState('mobile', [
      'location',
      'position',
      'imgList',
      'videoList',
      'projectPosition',
      'remark',
      'finished',
      'nextPlan',
      'troubles'
    ]),

    currentTime() {
      return this.state.time.format('HH:mm:ss');
    },

    fileList() {
      return _.map(_.concat([], this.imgList, this.videoList), ({ url }) => ({
        filePath: url
      }));
    }
  },

  watch: {
    'form.remark': {
      handler(value) {
        this.setRemark(value);
      }
    },
    'form.nextPlan': {
      handler(value) {
        this.setNextPlan(value);
      }
    },
    'form.troubles': {
      handler(value) {
        this.setTroubles(value);
      }
    }
  },

  mounted() {
    this.counter = this.setTime();
    this.form.remark = this.remark;
    this.form.finished = this.finished;
    this.form.nextPlan = this.nextPlan;
    this.form.troubles = this.troubles;
  },

  beforeDestroy() {
    clearTimeout(this.counter);
  },

  methods: {
    ...mapMutations('mobile', ['setRemark','setNextPlan', 'setTroubles']),

    onSubmit() {
      if (!this.location) {
        this.$message({
          message: '定位失败',
          type: 'error'
        });

        return;
      }

      // HACK 取消打卡范围判定
      // const distance = AMap.GeometryUtil.distance(
      //   this.position,
      //   // this.projectPosition ?? localStorage.getItem(POSITION).split(',')
      // );

      // if (distance > 50) {
      //   this.$message({
      //     message: `不在打卡范围内，距离打卡点${distance}m`,
      //     type: 'error'
      //   });

      //   return;
      // }

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
              remark: this.form.remark,
              finished: this.form.finished,
              nextPlan: this.form.nextPlan,
              troubles: this.form.troubles,
              // longitudes: this.position[0],
              // latitudes: this.position[1]
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
          <FormItem label="项目进展情况" prop="remark">
            <Input
              vModel={this.form.remark}
              placeholder="请输入内容"
              type="textarea"
              rows={1}
            />
          </FormItem>

          <FormItem label="是否竣工" prop="finished">
            <Select
              placeholder="请选择是否竣工"
              vModel={this.form.finished}
              size="small"
              style={{ width: '310px' }}
            >
              {this.options.map(({ value, label }) => (
                <Option value={value} label={label} />
              ))}
            </Select>
          </FormItem>

          <FormItem label="存在问题" prop="troubles">
            <Input
              vModel={this.form.troubles}
              placeholder="请输入内容"
              type="textarea"
              rows={1}
            />
          </FormItem>
          <FormItem label="下一步计划" prop="nextPlan">
            <Input
              vModel={this.form.nextPlan}
              placeholder="请输入内容"
              type="textarea"
              rows={1}
            />
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              disabled={this.state.loading}
              loading={this.state.loading}
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
