import { createInstance } from './utils';
import { staticPath } from '.';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun/ducha`
});

/**
 * 督查获取周期
 * @param {string} startDate
 * @param {string} endDate
 */
export function fetchRanges(startDate, endDate) {
  return instance.post('/getWeekly', {
    startDate,
    endDate
  }).then(({ result }) => result);
}

/**
 * 督查周期图片预览
 * @param {string} id
 * @param {string} endDate
 */
export function fetchControlContentById(id) {
  return instance.get(`/weeklyDetail/${id}`).then(({ result }) => ({
    PDFPath: `${staticPath}${result.PDFPath}`,
    fileList: result.fileList.map(({ path }) => `${staticPath}${path}`)
  }));
}
