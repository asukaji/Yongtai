import { createInstance } from './utils';
import { TOKEN, USER_INFO, SIGN_TYPE } from '@/constants';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_NEXT_URL}`
});

/**
 * 登陆
 * @param {string} username
 * @param {string} password
 */
export function login(username, password) {
  return instance
    .post('/xiangcun/userLogin', {
      username,
      password
    })
    .then(({ result, code, message }) => {
      if (code === 200) {
        localStorage.setItem(TOKEN, result.token);
        localStorage.setItem(USER_INFO, JSON.stringify(result.userInfo));
        return message;
      }
      throw new Error(message);
    });
}

/**
 * 获取登录人自己负责的项目列表
 */
export function fetchUserProjects() {
  return instance
    .get('/profession/xiangcun/project/list', {
      params: {
        pageNo: 1,
        pageSize: 500
      }
    })
    .then(({ result: { records } }) => records);
}

/**
 * 打卡接口
 * @param {string} username
 * @param {string} password
 */
export function check(params) {
  return instance
    .post('/profession/xiangcun/sign/add', { ...params, signType: localStorage.getItem(SIGN_TYPE) || undefined })
    .then(({ code }) => {
      if (code !== 200) {
        throw new Error('操作失败');
      }

      return true;
    });
}

/**
 * 查看某个项目的打卡记录
 */
export function fetchUserCheckedRecord(projectId) {
  return instance
    .post(
      '/profession/xiangcun/sign/list',
      {
        pageNo: 1,
        pageSize: 500,
        projectId,
        signType: localStorage.getItem(SIGN_TYPE) || undefined
      }
    )
    .then(({ result: { records } }) => records);
}

/**
 * 获取乡村振兴的项目列表
 */
export function fetchProjects() {
  return instance
    .get('/profession/xiangcun/zxArea/list', {
      params: {
        pageNo: 1,
        pageSize: 500
      }
    })
    .then(({ result }) => result);
}

/**
 * 获取乡村振兴的项目列表
 */
export function updatePassword(
  username,
  oldpassword,
  password,
  confirmpassword
) {
  return instance
    .put('/sys/user/updatePassword', {
      username,
      password,
      oldpassword,
      confirmpassword
    })
    .then(({ code, message }) => {
      if (code === 200) {
        return message;
      }
      throw new Error(message);
    });
}
