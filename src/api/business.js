import { createInstance } from './utils';
import moment from 'moment';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun/zhaoshang`
});

function formatDate(date) {
  return moment(date).format('YYYY-MM');
}

/**
 * 招商-考评情况
 * @param {string} groups town=乡镇, pro=专业, dept=单位
 * @param {number} pageNo
 * @param {number} pageSize
 */
export function fetchAppraisal(groups, pageNo = 1, pageSize = 10) {
  return instance.post('/appraisal', {
    // datetime: formatDate(),
    groups,
    pageNo,
    pageSize
  });
}

/**
 * 招商-序时进度
 * @param {string} groups town=乡镇, pro=专业, dept=单位
 * @param {number} pageNo
 * @param {number} pageSize
 */
export function fetchChronological(groups, pageNo = 1, pageSize = 10) {
  return instance.post('/chronological', {
    // datetime: formatDate(),
    groups,
    pageNo,
    pageSize
  }).then(({ result: { list } }) => ({
    total: list.total,
    pageNo: list.current,
    list: list.records
  }));
}

/**
 * 招商-重大活动
 * @param {number} pageNo
 * @param {number} pageSize
 */
export function fetchImportant(pageNo = 1, pageSize = 10) {
  return instance.post('/important', {
    // datetime: formatDate(),
    pageNo,
    pageSize
  }).then(({ result: { list } }) => ({
    total: list.total,
    pageNo: list.current,
    list: list.records
  }));
}

/**
 * 招商-招商任务完成情况
 * @param {string} groups town=乡镇, pro=专业, dept=单位
 * @param {number} pageNo
 * @param {number} pageSize
 */
export function fetchCompletion(groups, pageNo = 1, pageSize = 10) {
  return instance.post('/completion', {
    // datetime: formatDate(),
    groups,
    pageNo,
    pageSize
  }).then(({ result: { list } }) => ({
    total: list.total,
    pageNo: list.current,
    list: list.records
  }));
}
