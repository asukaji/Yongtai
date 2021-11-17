import _ from 'lodash';

export function validPosition(position) {
  return !_.some(position, _.isNil);
}
