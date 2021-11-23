import { createInstance } from './utils';
import moment from 'moment';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_DOMAIN}/index`
});

function formatDate(date) {
  return moment(date).format('YYYYMM');
}

/**
 * 经济指标一级页面（指标总览页）
 */
export function fetchIndustry() {
  return instance.post('/indicatorBreakdown/queryIndustryNameList', {
    date: formatDate(),
    area: '永泰县',
    state: '1'
  });
}

/**
 * 经济指标二级页面 各区县排名
 * @param {string} industryId
 */
export function fetchIndustryRankingById(industryId) {
  return instance.post('/indicators/queryRanking', {
    industryId,
    area: '永泰县'
  });
}

/**
 * 经济指标二级页面-当季同比增长情况
 * @param {string} industryId
 */
export function fetchIndustryInstrumentById(industryId) {
  return instance.post('/indicators/queryInstrumentPanel', {
    industryId,
    area: '永泰县'
  });
}
