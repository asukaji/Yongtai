import { createInstance } from './utils';

const instance = createInstance({ baseURL: 'http://http://120.77.38.5:16810/jeecg-boot/xiangcun' });

/**
 * 重点项目-二级详情页
 * @param {string} projectId
 */
export function fetchProjectDetail(projectId) {
  return instance.get(`/project/detail/${projectId}`);
}

/**
 * 重点项目-地图坐标分布
 */
export function fetchProjectList() {
  return instance.get('/project/list');
}

/**
 * 全域旅游-详情介绍
 * @param {string} areaId
 */
export function fetchTourDetail(areaId) {
  return instance.get(`/quanyu/detail/${areaId}`);
}

/**
 * 全域旅游-地图坐标分布
 */
export function fetchTourList() {
  return instance.get('/quanyu/list');
}

/**
 * 21个乡镇信息-乡镇详情介绍
 * @param {string} areaId
 */
export function fetchTownDetail(areaId) {
  return instance.get(`/town/detail/${areaId}`);
}

/**
 * 21个乡镇信息-地图坐标分布
 */
export function fetchTownList() {
  return instance.get('/town/list');
}

/**
 * 县情县况-地热-详情介绍
 * @param {string} areaId
 */
export function fetchGeothermalDetail(areaId) {
  return instance.get(`/dire/detail/${areaId}`);
}

/**
 * 县情县况-地热-地图坐标分布
 */
export function fetchGeothermalList() {
  return instance.get('/dire/list');
}

/**
 * 县情县况-电力-详情介绍
 * @param {string} areaId
 */
export function fetchElecticDetail(areaId) {
  return instance.get(`/electic/detail/${areaId}`);
}

/**
 * 县情县况-电力-地图坐标分布
 */
export function fetchElecticList() {
  return instance.get('/electic/list');
}

/**
 * 县情县况-流域-详情介绍
 * @param {string} areaId
 */
export function fetchWaterDetail(areaId) {
  return instance.get(`/liuyu/detail/${areaId}`);
}

/**
 * 县情县况-流域-地图坐标分布
 */
export function fetchWaterList() {
  return instance.get('/liuyu/list');
}

/**
 * 乡村振兴-详情页面
 * @param {string} areaId
 */
export function fetchPromoteDetail(areaId) {
  return instance.get(`/zhengxing/detail/${areaId}`);
}

/**
 * 乡村振兴-地图坐标分布
 */
export function fetchPromoteList() {
  return instance.get('/zhengxing/list');
}
