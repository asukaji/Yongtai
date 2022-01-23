import { Header } from '@/components/mobile';
import { Form, FormItem, Button, Input } from 'element-ui';
import styles from './Individual.module.less';

import { updatePassword } from '@/api';

import { USER_INFO } from '@/constants';

export default {
  name: 'Passwords',

  data() {
    return {
      form: {
        oldPassword: '',
        nextPassword: '',
        confirmPassword: ''
      },
      state: {
        loading: false
      }
    };
  },

  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem(USER_INFO));
    },

    userName() {
      return this.userInfo.username;
    },

    rules() {
      return {
        oldPassword: [{ required: true, message: '请输入旧密码' }],
        nextPassword: [
          { required: true, message: '请输入新密码' },
          {
            validator: (rule, value, callback) => {
              if (value === this.form.oldPassword) {
                callback(new Error('新密码应与旧密码不同'));
              } else {
                this.$refs.form.validateField('confirmPassword');
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.form.nextPassword) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]
      };
    }
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            this.state.loading = true;

            const message = await updatePassword(
              this.userName,
              this.form.oldPassword,
              this.form.nextPassword,
              this.form.confirmPassword
            );

            this.$message({
              message: message,
              type: 'success'
            });

            this.$router.go(-2);
          } catch (err) {
            this.$message({
              message: err.message,
              type: 'error'
            });
          } finally {
            this.state.loading = false;
          }
        }
      });
    }
  },

  render() {
    const { form, rules, state } = this;

    return (
      <div>
        <Header>修改密码</Header>
        <div class={styles.container}>
          <Form
            ref="form"
            labelWidth="120px"
            labelPosition="left"
            size="mini"
            {...{
              props: {
                model: this.form,
                rules
              }
            }}
          >
            <FormItem label="输入旧密码" prop="oldPassword">
              <Input
                vModel={form.oldPassword}
                showPassword
                placeholder="请输入旧密码"
              />
            </FormItem>
            <FormItem label="输入新密码" prop="nextPassword">
              <Input
                vModel={form.nextPassword}
                showPassword
                placeholder="请输入新密码"
              />
            </FormItem>
            <FormItem label="确认新密码" prop="confirmPassword">
              <Input
                vModel={form.confirmPassword}
                showPassword
                placeholder="请确认新密码"
              />
            </FormItem>
          </Form>
          <Button
            type="primary"
            loading={state.loading}
            onClick={this.onSubmit}
          >
            确认
          </Button>
        </div>
      </div>
    );
  }
};
