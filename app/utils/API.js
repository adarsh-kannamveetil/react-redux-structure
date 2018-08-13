import { memoize } from 'lodash';

import request from 'utils/request';

const defaultOptions = { credentials: 'same-origin', headers: {} };
const methodsWithPayload = ['POST', 'PUT', 'PATCH', 'DELETE'];

// const API_URL = 'http://192.168.1.9:3500/v1';
const API_URL = 'http://52.27.131.106:3500/v1';

/* eslint-disable no-underscore-dangle */
function _apiCall(path, options = {}) {
  const defaultedOptions = Object.assign({}, defaultOptions, options);

  if (defaultedOptions.fileUpload) {
    defaultedOptions.headers['Content-Type'] = defaultedOptions.body.type;
  } else {
    defaultedOptions.headers['Content-Type'] = 'application/json';
  }
  if (methodsWithPayload.indexOf(defaultedOptions.method) > -1 && defaultedOptions.body) {
    defaultedOptions.body = typeof defaultedOptions.body === 'string'
            ? defaultedOptions.body
            : JSON.stringify(defaultedOptions.body);
  }
  if (defaultedOptions.auth) {
    defaultedOptions.headers.Authorization = `Bearer ${getUserAuthToken()}`;
  } else {
    delete defaultedOptions.headers.Authorization;
  }
  let defaultedPath = typeof path === 'string' ? path : path.join('/');
  if (defaultedOptions.params) {
    const esc = encodeURIComponent;
    const query = Object.keys(defaultedOptions.params)
          .map((k) => `${esc(k)}=${esc(defaultedOptions.params[k])}`)
          .join('&');
    defaultedPath = `${defaultedPath}?${query}`;
  }
  let URL = `${API_URL}/${defaultedPath}`;
  if (defaultedOptions.crossOrigin) {
    URL = defaultedPath;
  }
  const fetch = request(URL, defaultedOptions)
        .then((result) => result);
  // return request(URL, defaultedOptions);
  return fetch;
}

function getUserAuthToken() {
  return localStorage.getItem('user_access_token');
}

// uses native xhr for PUT / File upload handling..
function makeRequest(method, url, file, imgUrl, id) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Cache-Control', 'public,max-age=3600');
    xhr.setRequestHeader('x-amz-acl', 'public-read');
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        let data;
        if (id) {
          data = { portfolio_id: id,
            portfolio_image_url: imgUrl };
        } else {
          data = imgUrl;
        }
        resolve(data);
      } else {
        reject({
          status: this.status,
          statusText: xhr.statusText,
        });
      }
    };
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      });
    };
    xhr.send(file);
  });
}
let callId = 0;
export const call = process.env.NODE_ENV === 'production'
    ? _apiCall
    : (path, options = {}, json = true, ...rest) => {
      const thisCallId = ++callId;
        /* eslint-disable no-console */
      console.log('API call', thisCallId, path, options);
      return _apiCall(path, options, json, ...rest)
            .then(
                (result) => {
                  console.info('API Result', thisCallId, json ? result : '(stream)');
                  return result;
                },
                (error) => {
                  console.log(error);
                  console.error('API Error', thisCallId, error.stack || error.message || error);
                  throw error;
                }
            );
        /* eslint-enable no-console */
    };

export default {
  prices: {
    getPrices(payload) {
      const url = 'price';
      return call(url, {
        method: 'GET',
        params: payload,
      });
    },
    list() {
      return call(['admin', 'price', 'listAll'], {
        method: 'GET',
        body: null,
        auth: true,
      });
    },
    edit(payload) {
      return call(['admin', 'price', 'costUpdate'], {
        method: 'POST',
        body: payload,
        auth: true,
      });
    },
  },
};
