import { createInstance } from './utils';
// import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun`
});

/**
 * 美丽乡村-目录索引
 */
export function fetchPromoteProfile() {
  return instance.get('/beautyVallage/index').then(({ result }) => result);
}

/**
 * 美丽乡村项目列表
 * @param {string} code
 * @param {string} type
 */
export function fetchPromoteProjectList(code, type) {
  return instance.post('/beautyVallage/projectList', {
    code,
    type
  }).then(({ result }) => result);
}

/**
 * 美丽乡村-项目详情、形象进度 
 * @param {string} projectId
 */
export function fetchPromoteSchedule(projectId) {
  return instance.post('/beautyVallage/schedule', {
    projectId
  }).then(({ result }) => result);
}

/**
 * 全域旅游精品路线文章列表
 */
export function fetchTourArticle() {
  return instance.get('/quanyu/article').then(({ result }) => result);
}

/**
 * 吃住行游购物
 * @param {string} type
 */
export function fetchTourArticleByType(type) {
  return instance.post('/quanyu/travels', {
    pageNo: 1,
    pageSize: 500,
    itemType: type
  }).then(({ records }) => records);
}

/**
 * 根据分类获取相应的村落坐标位置和村落名字
 * @param {string} code
 */
export function fetchVillages(code) {
  return instance.post('/beautyVallage/coordinates', {
    code,
    type: 'area'
  }).then(({ result }) => result);
}

/**
 * 根据村名称获取项目列表
 * @param {string} vallage
 */
export function fetchProjectsByVillages(vallage) {
  return instance.post('/beautyVallage/projectByVallage', {
    vallage
  }).then(({ result }) => result);
}