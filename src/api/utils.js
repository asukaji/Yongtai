import axios from 'axios';

export function createInstance(config) {
  const instance = axios.create(
    Object.assign({}, config, { withCredentials: true })
  );
  instance.interceptors.request.use((config) => {
    return config;
  });

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
          response.data.meta?.msg ??
            response.data.meta?.error ??
            response.statusText
        ),
        {
          status: response.status,
          errorCode: response.data.meta?.code
        }
      );
    },
    (error) => {
      return error;
    }
  );

  return instance;
}
