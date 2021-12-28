import { createInstance } from './utils';
import moment from 'moment';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_DOMAIN}/index`
});

function formatDate(month) {
  return moment().subtract(month, 'months').format('YYYYMM');
}

/**
 * 经济指标一级页面（指标总览页）
 */
export function fetchIndustry(month = 2, date) {
  return instance
    .post('/indicatorBreakdown/queryIndustryNameList', {
      date: date ?? formatDate(month),
      area: '永泰县',
      state: '1'
    })
    .then(({ data }) => {
      if (_.isUndefined(data)) {
        throw new Error('data is undefined');
      }

      return _.map(
        data,
        ({ cumulative, industryId, industryName, ratio, unit }) => ({
          cumulative: cumulative.replace(/^\s*/g, '').replace(unit, ''),
          id: industryId,
          name: industryName,
          rate: ratio,
          unit
        })
      );
    });
}

/**
 * 经济指标二级页面 各区县排名
 * @param {string} industryId
 */
export function fetchIndustryRankingById(industryId) {
  return instance
    .post('/indicators/queryRanking', {
      industryId,
      area: '永泰县'
    })
    .then(({ data }) => ({
      category: data.areaList,
      barData: data.cumulativeList,
      lineData: data.ratioList
    }));
}

/**
 * 经济指标二级页面-当季同比增长情况
 * @param {string} industryId
 */
export function fetchIndustryInstrumentById(industryId) {
  return instance
    .post('/indicators/queryInstrumentPanel', {
      industryId,
      area: '永泰县'
    })
    .then(({ data }) => data);
}

/**
 * 获取最新的月份
 */
export function fetchLatestDate() {
  return instance
    .post('/indicatorBreakdown/queryHaveValue', {
      area: '永泰县'
    })
    .then(({ data }) => data);
}
