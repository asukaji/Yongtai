import { fetchRanges as fetchRangesApi, fetchControlContentById as fetchControlContentByIdApi } from '@/api';
import _ from 'lodash';

export async function fetchRanges({ commit }, date) {
  commit('setIds', await fetchRangesApi(...date));
}

export async function fetchControlContentById({ commit, state }, id) {
  const {PDFPath, ...nextState} = await fetchControlContentByIdApi(id);

  commit('setStates', {
    ...nextState,
    PDFPath: _.defaults({[id]: PDFPath}, state.PDFPath)
  });
}
