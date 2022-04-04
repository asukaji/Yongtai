import { Form, FormItem, Input, Button } from 'element-ui';
import Header from './Header';
import styles from './Login.module.less';

import { login } from '@/api';

const rules = {
  username: [{ required: true, message: '请输入账号' }],
  password: [{ required: true, message: '请输入密码' }]
};

export default {
  name: 'Login',

  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },

  methods: {
    onSubmit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            await login(this.form.username, this.form.password);

            // this.$router.push('/');
            // 跳转新首页
            this.$router.push('/about');
          } catch (err) {
            this.$message({
              message: err.message,
              type: 'error'
            });
          }
        }
      });
    }
  },

  render() {
    return (
      <div>
        <Header />
        <div class={styles.container}>
          <div></div>
          <div>
            <h1>欢迎。</h1>
            <Form
              ref="form"
              {...{
                props: {
                  model: this.form, ////vue jsx element 表单校验的model不可以直接写 以这种方式解决
                  rules: rules
                }
              }}
            >
              <FormItem prop="username">
                <Input vModel={this.form.username} placeholder="输入账号" />
              </FormItem>
              <FormItem prop="password">
                <Input
                  vModel={this.form.password}
                  showPassword
                  placeholder="输入密码"
                />
              </FormItem>
              <FormItem>
                <Button type="primary" onClick={this.onSubmit}>
                  立即登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    );
  }
};
