import { Header } from '@/components/mobile';
import { Form, FormItem, Button } from 'element-ui';
import styles from './Individual.module.less';

import { TOKEN, USER_INFO } from '@/constants';

export default {
  name: 'Individual',

  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem(USER_INFO));
    },

    userName() {
      return this.userInfo.username;
    },

    realName() {
      return this.userInfo.realname;
    },

    phoneNumber() {
      return this.userInfo.telephone;
    }
  },

  methods: {
    logout() {
      localStorage.removeItem(TOKEN);
      this.$router.replace('/login');
    },

    toPasswords() {
      this.$router.push('/passwords');
    }
  },

  render() {
    return (
      <div>
        <Header>个人中心</Header>
        <div class={styles.container}>
          <Form labelWidth="80px" labelPosition="left" size="mini">
            <FormItem label="登录名">{this.userName}</FormItem>
            <FormItem label="用户名">{this.realName}</FormItem>
            <FormItem label="手机号">{this.phoneNumber}</FormItem>
          </Form>
          <Button onClick={this.toPasswords}>修改密码</Button>
          <Button type="primary" onClick={this.logout}>
            退出登录
          </Button>
        </div>
      </div>
    );
  }
};
