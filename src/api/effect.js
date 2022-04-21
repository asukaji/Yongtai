import { createInstance } from './utils';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun`
});

/**
 * 美丽乡村项目列表
 * @param {string} code
 * @param {string} type
 */
export function fetchPromoteProjectList(code, type) {
  return instance
    .post('/beautyVallage/projectList', {
      code,
      type
    })
    .then(({ result }) => result);
}

/**
 * 省政-目录索引
 */

export function fetchProvinceProfile(projectClass, datetime) {
  return instance.post('/work/catalogue', {
    projectClass,
    datetime,
  }).then(({ result }) => result);
}

/**
 * 坐标-目录索引
 */

export function fetchCoordProfile(code, type, projectClass) {
  return instance.post('/work/coordinates', {
    code,
    type,
    projectClass
  }).then(({ result }) => result);
}

/**
 * 项目-目录索引
 */

export function fetchProject(code, type, projectClass) {
  return instance.post('/work/project', {
    code,
    type,
    projectClass
  }).then(({ result }) => result);
}

export function cardProject(projectId, projectClass) {
  return instance.post('/work/schedule', {
    projectId,
    projectClass
  }).then(({ result }) => result);
}

/**
 * 项目-详细信息
 */

export function summaryProject(code, type, projectClass) {
  return instance.post('/work/summary', {
    code,
    type,
    projectClass
  }).then(({ result }) => result);
}

/**
 * 乡村振兴概况
 */

export function surveyProject(itemname) {
  return instance.post('/industry/revitalization', {
    itemname
  }).then(({ result }) => result);
}

/**
 * 项目打卡
 */

export function projectClock(projectId) {
  return instance.post('/work/projectRecords', {
    projectId
  }).then(({ result }) => result);
}
