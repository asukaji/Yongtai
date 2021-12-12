import _ from 'lodash';

export function setTitle(state, title) {
  state.title = title;
}

export function setIds(state, ids) {
  state.ids = ids;
}

export function setStates(state, period) {
  _.assign(state, period);
}
