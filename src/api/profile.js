import { createInstance } from './utils';

const instance = createInstance({ baseURL: '/api/server/permission' });

export function fetchData() {
  return instance.get();
}
