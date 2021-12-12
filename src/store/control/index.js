import * as mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  mutations,
  actions,
  getters,

  state: {
    title: undefined,
    ids: [],
    projectList: undefined,
    projectSitua: undefined,
    landSitua: undefined,
    landList: undefined,
    fileList: [],
    PDFPath: {}
  }
};
