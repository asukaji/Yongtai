import _ from 'lodash';

export function setStates(state, period) {
  _.assign(state, period);
}

export function setProjects(state, projects) {
  state.projects = projects;
}

export function setProjectId(state, id) {
  state.projectId = id;
}

export function setProjectPosition(state, position) {
  state.projectPosition = position;
}


export function setFileList(state, [filePath, type]) {
  if (type === 'img') {
    state.imgList = _.concat([], state.imgList, {
      name: _.last(filePath.split('/')),
      url: filePath
    });
  } else {
    state.videoList = _.concat([], state.videoList, {
      name: _.last(filePath.split('/')),
      url: filePath
    });
  }
}

export function clearFileList(state) {
  state.imgList = [];
  state.videoList = [];
}

export function setRecords(state, [records, id]) {
  state.records = _.assign(state.records, { [id]: records });
}

export function setRemark(state, remark) {
  state.remark = remark;
}
