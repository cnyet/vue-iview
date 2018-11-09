import router from '../../router';
import axios from 'axios';

import { BaseInfoService } from './base-info.service';
import { LocalDataService, TextService } from '../../utils';
import { SERVERINFO } from '../../constants/app-info';

export class HttpRequestService {
  constructor() {
    this._redirected = false;
    // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  static checkClientToken(params) {
    const user = BaseInfoService.getUser();
    if (!params.skipValidation && (!user || !user.token) && !this._redirected && window.location.hash.toLowerCase().indexOf('/login/') === -1) {
      this._redirected = true;
      router.push({ name: 'login', params: { url: encodeURIComponent(window.location.href) } });
    }
    this._redirected = false;
    return true;
  }

  static delete(params) {
    if (!this.checkClientToken(params)) {
      return;
    }
    if (!SERVERINFO.serverIP) {
      this.mockData(params);
      return this.apiAxios('GET', params.url, params);
    }

    if (!this.handleRequest(params)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios('DELETE', params.url, params);
  }

  static get(params) {
    if (!this.checkClientToken(params)) {
      return;
    }
    if (!SERVERINFO.serverIP) {
      this.mockData(params);
      return this.apiAxios('GET', params.url, params);
    }

    if (!this.handleRequest(params)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios('GET', params.url, params);
  }

  static post(params) {
    if (!this.checkClientToken(params)) {
      return;
    }
    if (!SERVERINFO.serverIP) {
      this.mockData(params);
      return this.apiAxios('GET', params.url, params);
    }

    if (!this.handleRequest(params)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios('POST', params.url, params);
  }

  static patch (params) {
    if (!this.checkClientToken(params)) {
      return;
    }
    if (!SERVERINFO.serverIP) {
      this.mockData(params);
      return this.apiAxios('GET', params.url, params);
    }

    if (!this.handleRequest(params)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios('PATCH', params.url, params);
  }

  static put(params) {
    if (!this.checkClientToken(params)) {
      return;
    }
    if (!SERVERINFO.serverIP) {
      this.mockData(params);
      return this.apiAxios('GET', params.url, params);
    }

    if (!this.handleRequest(params)) {
      return new Promise(function (resolve, reject) {
        reject();
      });
    }
    return this.apiAxios('PUT', params.url, params);
  }

  static handleRequest(params) {
    const user = BaseInfoService.getUser();
    if (!params.skipValidation && !user) {
      if (window.location.hash.toLowerCase().indexOf('/login') === -1) {
        if (window.location.hash.toLowerCase() === '/') {
          router.push({ name: 'login' });
        } else {
          router.push({ name: 'login', params: { url: encodeURIComponent(window.location.hash.toLowerCase()) } });
        }
      }
      return false;
    }
    if (!params.headers) {
      params.headers = [{ name: 'Content-Type', value: 'application/json' }];
    } else {
      let hasContentType = false;
      for (let i = 0; i < params.headers.length; i++) {
        if (params.headers[i].name === 'Content-Type') {
          hasContentType = true;
          break;
        }
      }
      if (!hasContentType) {
        params.headers.push({ name: 'Content-Type', value: 'application/json' });
      }
    }
    params.headers.push({ name: 'language', value: TextService.getLanguage() });
    if (!params.skipValidation) {
      params.headers.push({ name: 'Authorization', value: user.token });
    }
    this._redirected = false;
    return true;
  }

  static mockData(params) {
    if (params.url.indexOf('api/finance/list') > -1) {
      params.url = 'api/finance/list';
    }
    if (params.url.indexOf('api/study/list') > -1) {
      params.url = 'api/study/list';
    }
    if (params.url.indexOf('api/ExchangeEmployeeCards/filterData') > -1) {
      params.url = 'api/exchangeemployeecards/filterdata';
    }
    if (!isNaN(params.url.substr(params.url.length - 1)) && params.url.toLowerCase().indexOf('/finance/') > -1) {
      params.url = 'api/finance/id';
    }
    if (!isNaN(params.url.substr(params.url.length - 1)) && params.url.toLowerCase().indexOf('/diary/') > -1) {
      params.url = 'api/diary/id';
    }
    if (!isNaN(params.url.substr(params.url.length - 1)) && params.url.toLowerCase().indexOf('/study/') > -1) {
      params.url = 'api/study/id';
    }
    if (!isNaN(params.url.substr(params.url.length - 1)) && params.url.toLowerCase().indexOf('/note/') > -1) {
      params.url = 'api/note/id';
    }
    console.log(params.url);
    switch (params.url.toLowerCase()) {
      case 'api/adminusers/login':
        params.url = composeUrl('token.json');
        break;
      case 'api/goods/list':
        params.url = composeUrl('goods-list.json');
        break;
      case 'api/orders/list':
        params.url = composeUrl('orders-list.json');
        break;
      case 'api/logistics/list':
        params.url = composeUrl('logistics-list.json');
        break;
      case 'api/exchangeemployeecards/filterdata':
        params.url = composeUrl('meal-list.json');
        break;
      case 'api/finance/id':
        params.url = composeUrl('finance.json');
        break;
      case 'api/images/list':
        params.url = composeUrl('images.json');
        break;
      case 'api/storehouse/list':
        params.url = composeUrl('storehouse.json');
        break;
      case 'api/note/id':
        params.url = composeUrl('note.json');
        break;
    }

    function composeUrl(url) {
      const pre = 'static/mock-data/' + TextService.getLanguage() + '/';
      const noCache = '?date=' + new Date().getTime();
      return pre + url + noCache;
    }
  }

  static apiAxios(method, url, params) {
    let headers = {};
    if (params.headers) {
      params.headers.forEach(element => {
        headers[element.name] = element.value;
      });
    }
    const promise = new Promise(function (resolve, reject) {
      if (params) {
        params = filterNull(params);
      }
      axios({
        method: method,
        baseURL: SERVERINFO.serverIP,
        url: url,
        data: method === 'POST' || method === 'PATCH' || method === 'PUT' ? params.body : null,
        params: method === 'GET' || method === 'DELETE' ? params.params : null,
        withCredentials: false,
        timeout: 60000,
        headers: headers
      }).then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          resolveError(res);
          reject(res.data);
        }
      }).catch((err) => {
        resolveError(err);
        reject((err.response && err.response.data) ? err.response.data : err);
      });
    });

    return promise;

    function filterNull(o) {
      for (const key in o) {
        if (o[key] === null) {
          delete o[key];
        }
        if (toType(o[key]) === 'string') {
          o[key] = o[key].trim();
        } else if (toType(o[key]) === 'object') {
          o[key] = filterNull(o[key]);
        } else if (toType(o[key]) === 'array') {
          o[key] = filterNull(o[key]);
        }
      }
      return o;
    }

    function toType(obj) {
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }

    function resolveError(err) {
      if (err.status === 401 || err.status === 0 || err.toString().toLowerCase().indexOf('401') > -1) {
        const userInfo = JSON.parse(LocalDataService.cookieGet('userInfo'));
        if (userInfo && userInfo.token) {
          userInfo.token = '';
          LocalDataService.cookieSet('userInfo', JSON.stringify(userInfo));
        }
        if (!HttpRequestService._redirected && window.location.hash.toLowerCase().indexOf('/login/') === -1) {
          HttpRequestService._redirected = true;
          router.push({ name: 'login', params: { url: encodeURIComponent(window.location.href) } });
        }
      }
    }
  }
}
