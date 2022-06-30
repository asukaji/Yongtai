import { createInstance } from './utils';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun`
});
export const staticPath = `${process.env.VUE_APP_BASE_URL}/sys/common/static`;

/**
 * 重点项目-二级详情页
 * @param {string} projectId
 */
export function fetchProjectDetail(projectId) {
  return instance.get(`/project/detail/${projectId}`).then(({ result }) => ({
    content: result.content,
    belong: result.belong,
    investments: `${result.investments}亿元`,
    contacts: result.contacts,
    tags: result.tags,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: filePath,
      type:
        fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
          ? 'image'
          : 'video'
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
      _.concat(
        result.junGongList,
        result.kaiGongList,
        result.zaiJianList,
        result.zhengQianList
      ),
      ({
        id,
        latitudes,
        longitudes,
        projectName,
        projectType,
        tags,
        imp,
        model
      }) => ({
        id,
        position: [longitudes, latitudes],
        title: projectName,
        type: projectType,
        tags,
        imp: imp.split(','),
        model
      })
    )
  }));
}

/**
 * 重点项目-二级详情页-项目签到打卡数据
 * @param {number} projectId
 * @param {string} signType
 */
export function fetchProjectSignList(
  projectId,
  signType = '',
  pageNo = 1,
  pageSize = 500
) {
  return instance
    .get('/project/sign/list', {
      params: {
        projectId,
        signType,
        pageNo,
        pageSize
      }
    })
    .then(({ result }) =>
      _.map(result.records, ({ fileList, ...record }) => ({
        ...record,
        fileList: _.map(fileList, ({ filePath }) => filePath)
      }))
    );
}

/**
 * 全域旅游-详情介绍
 * @param {string} areaId
 */
export function fetchTourDetail(areaId) {
  return instance.get(`/quanyu/detail/${areaId}`).then(({ result }) => ({
    content: result.content,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: filePath,
      type:
        fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
          ? 'image'
          : 'video'
    }))
  }));
}

/**
 * 全域旅游-地图坐标分布
 */
export function fetchTourList() {
  return instance.get('/quanyu/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, area, areaType, filePath }) => ({
        id,
        position: [longitudes, latitudes],
        title: area,
        type: areaType,
        filePath
      })
    )
  );
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
      src: filePath,
      type:
        fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
          ? 'image'
          : 'video'
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
        src: filePath,
        type:
          fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
            ? 'image'
            : 'video'
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
export function fetchElectricDetail(areaId) {
  return instance
    .get(`/xiankuang/electic/detail/${areaId}`)
    .then(({ result }) => ({
      content: result.content,
      name: 'Electric Conditions',
      media: _.map(result.fileList, ({ filePath, fileType }) => ({
        src: filePath,
        type:
          fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
            ? 'image'
            : 'video'
      }))
    }));
}

/**
 * 县情县况-电力-地图坐标分布
 */
export function fetchElectricList() {
  return instance.get('/xiankuang/electic/list').then(({ result }) =>
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
 * 县情县况-流域-详情介绍
 * @param {string} areaId
 */
export function fetchWaterDetail(areaId) {
  return instance
    .get(`/xiankuang/liuyu/detail/${areaId}`)
    .then(({ result }) => ({
      content: result.content,
      media: _.map(result.fileList, ({ filePath, fileType }) => ({
        src: filePath,
        type:
          fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
            ? 'image'
            : 'video'
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
    contacts: result.contacts,
    media: _.map(result.fileList, ({ filePath, fileType }) => ({
      src: filePath,
      type:
        fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
          ? 'image'
          : 'video'
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

/**
 * 视频会议-获取会议链接
 */
export function createMeeting(params) {
  return instance.post('/createeeting', params).then(({ result }) => ({
    title: result.conferenceTitle,
    url: result.attendeeJoinUrl
  }));
}

/**
 * 县情县况-流域-详情介绍
 * @param {string} areaId
 */
export function fetchHotelDetail(areaId) {
  return instance
    .get(`/xiankuang/hotel/detail/${areaId}`)
    .then(({ result }) => ({
      content: result.content,
      media: _.map(result.fileList, ({ filePath, fileType }) => ({
        src: filePath,
        type:
          fileType === '.jpg' || fileType === '.png' || fileType === '.jpeg'
            ? 'image'
            : 'video'
      }))
    }));
}

/**
 * 县情县况-流域-地图坐标分布
 */
export function fetchHotelList() {
  return instance.get('/xiankuang/hotel/list').then(({ result }) =>
    _.map(
      _.filter(result, ({ id }) => !!id),
      ({ id, latitudes, longitudes, area, star }) => ({
        id,
        position: [longitudes, latitudes],
        title: area,
        star
      })
    )
  );
}

/**
 * 县情县况-流域-地图坐标分布
 */
export function fetchHighwayList() {
  return instance.get('/jiaotong/gaosu/list').then(({ result }) =>
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
 * 产权
 * @param {string} type
 */
export function fetchProperty(type) {
  return instance
    .get(`/chanquan/list/${type}`)
    .then(({ result }) => result[type] ?? result);
}

export function fetchPropertyList() {
  return instance
    .get('/chanquan/liuzhuan')
    .then(({ result }) => result);
}

export function fetchPropertyState() {
  return instance
    .get('/chanquan/exp')
    .then(({ result }) => result);
}

export function fetchPropertyStateHandel() {
  return instance
    .get('/chanquan/modi/list')
    .then(({ result }) => result);
}

export function fetchPropertyDetailsYears(type) {
  return instance
    .get(`/chanquan/year/${type}`)
    .then(({ result }) => result);
}

export function fetchPropertyDetailsListByYear(equityType, year) {
  return instance
    .post('/chanquan/tablelist', {
      equityType,
      year
    })
    .then(({ result }) => result);
}

export function fetchPropertyDetailsList(townName, classify, tab) {
  return instance
    .post('/chanquan/sec', {
      townName,
      classify,
      tab
    })
    .then(({ result }) => result);
}
