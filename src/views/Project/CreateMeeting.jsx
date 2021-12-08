import {
  CheckboxButton,
  CheckboxGroup,
  Button,
  Input,
  Form,
  FormItem
} from 'element-ui';
import styles from './CreateMeeting.module.less';

import { createMeeting } from '@/api';
import VueTypes from 'vue-types';
import _ from 'lodash';

const rules = {
  meeting: [{ required: true, message: '请输入会议主题' }],
  initiator: [{ required: true, message: '请输入会议发起人' }],
  userIds: [{ required: true, message: '请选择参会人员' }]
};

export default {
  name: 'CreateMeeting',

  props: {
    id: VueTypes.string.def(),

    contacts: VueTypes.array.def([])
  },

  data() {
    return {
      form: {
        meeting: '',
        initiator: '',
        userIds: []
      },
      state: {
        href: undefined,
        loading: false
      }
    };
  },

  watch: {
    contacts: {
      immediate: true,

      handler() {
        this.form.userIds = _.map(this.contacts, 'userId');
      }
    }
  },

  methods: {
    renderHref() {
      return (
        <div
          onClick={() => window.open(this.state.href?.url)}
          style={{ color: '#0078FF' }}
        >
          点击此链接参加会议：{this.state.href?.title}
        </div>
      );
    },

    async onJoin() {
      this.state.loading = true;
      try {
        this.state.href = await createMeeting(this.form);
      } catch (err) {
        this.state.href = undefined;
      } finally {
        this.state.loading = false;
      }
    },

    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.onJoin();
        }
      });
    }
  },

  render() {
    return (
      <div class={styles.container}>
        {this.state.href ? (
          this.renderHref()
        ) : (
          <Form
            ref="form"
            {...{
              props: {
                model: this.form, ////vue jsx element 表单校验的model不可以直接写 以这种方式解决
                rules: rules
              }
            }}
          >
            <FormItem label="会议主题" prop="meeting">
              <Input vModel={this.form.meeting} />
            </FormItem>
            <FormItem label="会议发起人" prop="initiator">
              <Input vModel={this.form.initiator} />
            </FormItem>
            <FormItem label="参会人员" prop="userIds">
              <CheckboxGroup vModel={this.form.userIds}>
                {_.map(this.contacts, ({ userId, username, type_dictText }) => (
                  <CheckboxButton label={userId}>
                    <pre>
                      {username}
                      <span>{type_dictText}</span>
                    </pre>
                  </CheckboxButton>
                ))}
              </CheckboxGroup>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.onSubmit}>
                开始会议
              </Button>
            </FormItem>
          </Form>
        )}
      </div>
    );
  }
};
