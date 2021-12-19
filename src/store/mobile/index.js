import * as mutations from './mutations';
// import * as actions from './actions';
// import * as getters from './getters';

export default {
  namespaced: true,
  mutations,

  state: {
    position: undefined,
    location: undefined,
    projects: undefined,
    projectId: undefined,
    projectPosition: undefined,
    imgList: [],
    videoList: [],
    records: undefined,
    remark: ''
  }
};
