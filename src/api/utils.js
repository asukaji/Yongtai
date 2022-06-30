import axios from 'axios';
import _ from 'lodash';
import { isMobile } from '../main';

import { TOKEN } from '@/constants';

export function createInstance(config) {
  const instance = axios.create(config);

  if (isMobile()) {
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem(TOKEN);

      if (token) {
        _.set(config, 'headers.X-Access-Token', token);
      }

      return config;
    });
  }

  instance.interceptors.response.use(
    (response) => {
      if (response.data) {
        return response.data;
      }

      if (typeof response.data === 'string') {
        try {
          response.data = JSON.parse(response.data);
        } catch (err) {
          return response.data;
        }
      }

      throw Object.assign(
        new Error(
          response.data?.message ?? response.data?.error ?? response.statusText
        ),
        {
          status: response.status,
          errorCode: response.data?.code
        }
      );
    },
    (error) => {
      console.dir(error);
      if (error.response.data?.code === 401) {
        location.href = `${location.protocol}//${location.host}/#/login`;
      }
      return error;
    }
  );

  return instance;
}
