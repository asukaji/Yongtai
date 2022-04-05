import { createInstance } from './utils';
import _ from 'lodash';

const instance = createInstance({
  baseURL: `${process.env.VUE_APP_BASE_URL}/xiangcun/industry`
});

/**
 * 产业地图-根据乡镇名称获取乡镇介绍
 * @param {string} town
 */
export function fetchStreetDetail(town) {
  return instance.post('/getTownInfo', { town }).then(({ result }) => ({
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
 * 产业地图-获取村庄数据
 * @param {string} village
 */
export function fetchVillageDetail(village, division) {
  return instance.post('/villageData', { village, division }).then(({ result }) => result);
}

/**
 * 产业地图-乡村振兴项目(工作成效)
 * @param {string} name
 * @param {string} mapLevel
 * @param {string} projectClass
 */
export function fetchWorkData(name, mapLevel, projectClass = 'project_szx') {
  return instance.post('/workData', { name, mapLevel, projectClass }).then(({ result }) => result);
}

/**
 * 产业地图-特色产业和自然资源
 * @param {string} town
 * @param {string} type
 */
export function fetchNatures(town, type) {
  return instance.post('/natures', { town, type }).then(({ result }) =>
    _.map(result,
      ({ id, latitudes, longitudes, icon, content, name }) => ({
        id,
        position: [longitudes, latitudes],
        icon,
        name,
        content
      })
    )
  );
}
