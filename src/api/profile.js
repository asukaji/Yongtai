import { createInstance } from './utils';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun`
});
const staticPath = `${process.env.VUE_APP_BASE_URL}/sys/common/static`;

/**
 * 重点项目-二级详情页
 * @param {string} projectId
 */
export function fetchProjectDetail(projectId) {
  return instance.get(`/project/detail/${projectId}`).then(({ result }) => ({
    content: result.content,
    belong: result.belong,
    investments: `${result.investments}亿元`,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: `${staticPath}${filePath}`,
      type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
    }))
  }));
}

/**
 * 重点项目-地图坐标分布
 */
export function fetchProjectList() {
  return instance.get('/project/list').then(({ result }) => ({
    completed: result.junGong,
    ready: result.kaiGong,
    working: result.zaiJian,
    planing: result.zhengQian,
    list: _.map(
      result.projectList,
      ({ id, latitudes, longitudes, projectName, projectType }) => ({
        id,
        position: [longitudes, latitudes],
        title: projectName,
        type: projectType
      })
    )
  }));
}

/**
 * 全域旅游-详情介绍
 * @param {string} areaId
 */
export function fetchTourDetail(areaId) {
  return instance.get(`/quanyu/detail/${areaId}`).then(({ result }) => ({
    content: result.content,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: `${staticPath}${filePath}`,
      type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
    }))
  }));
}

/**
 * 全域旅游-地图坐标分布
 */
export function fetchTourList() {
  return instance.get('/quanyu/list').then(({ result }) => _.map(
    _.filter(result, ({ id }) => !!id),
    ({ id, latitudes, longitudes, area, areaType }) => ({
      id,
      position: [longitudes, latitudes],
      title: area,
      type: areaType
    })
  ));
}

/**
 * 21个乡镇信息-乡镇详情介绍
 * @param {string} areaId
 */
export function fetchTownDetail(areaId) {
  return instance.get(`/town/detail/${areaId}`).then(({ result }) => ({
    content: result.content,
    name: 'Village Profile',
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: `${staticPath}${filePath}`,
      type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
    }))
  }));
}

/**
 * 21个乡镇信息-地图坐标分布
 */
export function fetchTownList() {
  return instance.get('/town/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, area }) => ({
        id,
        position: [longitudes, latitudes],
        title: area
      })
    )
  );
}

/**
 * 县情县况-地热-详情介绍
 * @param {string} areaId
 */
export function fetchGeothermalDetail(areaId) {
  return instance
    .get(`/xiankuang/dire/detail/${areaId}`)
    .then(({ result }) => ({
      content: result.content,
      name: 'Geothermal Conditions',
      media: _.map(result.fileList, ({ filePath, fileType }) => ({
        src: `${staticPath}${filePath}`,
        type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
      }))
    }));
}

/**
 * 县情县况-地热-地图坐标分布
 */
export function fetchGeothermalList() {
  return instance.get('/xiankuang/dire/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, area }) => ({
        id,
        position: [longitudes, latitudes],
        title: area
      })
    )
  );
}

/**
 * 县情县况-电力-详情介绍
 * @param {string} areaId
 */
export function fetchElecticDetail(areaId) {
  return instance.get(`/xiankuang/electic/detail/${areaId}`);
}

/**
 * 县情县况-电力-地图坐标分布
 */
export function fetchElecticList() {
  return instance.get('/xiankuang/electic/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, projectName, projectType }) => ({
        id,
        position: [longitudes, latitudes],
        title: projectName,
        type: projectType
      })
    )
  );
}

/**
 * 县情县况-流域-详情介绍
 * @param {string} areaId
 */
export function fetchWaterDetail(areaId) {
  return instance
    .get(`/xiankuang/liuyu/detail/${areaId}`)
    .then(({ result }) => ({
      content: result.content,
      media: _.map(result.fileList, ({ filePath, fileType }) => ({
        src: `${staticPath}${filePath}`,
        type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
      }))
    }));
}

/**
 * 县情县况-流域-地图坐标分布
 */
export function fetchWaterList() {
  return instance.get('/xiankuang/liuyu/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, projectName, projectType }) => ({
        id,
        position: [longitudes, latitudes],
        title: projectName,
        type: projectType
      })
    )
  );
}

/**
 * 乡村振兴-详情页面
 * @param {string} areaId
 */
export function fetchPromoteDetail(areaId) {
  return instance.get(`/zhengxing/detail/${areaId}`).then(({ result }) => ({
    content: result.content,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: `${staticPath}${filePath}`,
      type: fileType === '.jpg' || fileType === '.png' ? 'image' : 'video'
    }))
  }));
}

/**
 * 乡村振兴-地图坐标分布
 */
export function fetchPromoteList() {
  return instance.get('/zhengxing/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, area, description, title }) => ({
        id,
        position: [longitudes, latitudes],
        title,
        description,
        area
      })
    )
  );
}
