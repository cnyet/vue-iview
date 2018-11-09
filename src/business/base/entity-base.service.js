import { HttpRequestService } from './http-request.service';
import { HttpOptions } from '../../models/http.model';

export class EntityBaseService {
  constructor(_restapibase) {
    this.restapibase = _restapibase;
  }

  delete(id) {
    const options = new HttpOptions();
    options.url = this.restapibase + id;
    return HttpRequestService.delete(options);
  }

  getList(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + 'filterData' + this.getCondition(condition);
    return HttpRequestService.get(options);
  }

  getAllObject(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + 'filterData';
    return HttpRequestService.get(options);
  }

  getData(apiName) {
    const options = new HttpOptions();
    options.url = this.restapibase + apiName;
    return HttpRequestService.get(options);
  }

  getObject(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + condition.apiName + this.getCondition(condition);
    options.params = condition.params || null;
    return HttpRequestService.get(options);
  }

  postObject(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + condition.apiName;
    options.body = condition.body || null;
    return HttpRequestService.post(options);
  }
  putObject(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + condition.apiName;
    options.body = condition.body || null;
    return HttpRequestService.put(options);
  }

  post(condition) {
    const options = new HttpOptions(condition);
    options.url = this.restapibase + condition.id;
    options.body = condition.body || null;
    return HttpRequestService.post(options);
  }

  get(id) {
    const options = new HttpOptions();
    options.url = this.restapibase + id;
    return HttpRequestService.get(options);
  }

  insert(obj) {
    const options = new HttpOptions();
    options.url = this.restapibase;
    options.body = obj;
    return HttpRequestService.post(options);
  }

  update(obj) {
    const options = new HttpOptions();
    options.url = this.restapibase + "update";
    options.body = obj;
    return HttpRequestService.post(options);
  }

  restore(id) {
    const options = new HttpOptions();
    options.url = this.restapibase + 'restore/' + id;
    return HttpRequestService.post(options);
  }

  patch(condition) {
    const options = new HttpOptions();
    options.url = this.restapibase + condition.id;
    options.body = condition.body;
    return HttpRequestService.patch(options);
  }

  recycle(id) {
    const options = new HttpOptions();
    options.url = this.restapibase + 'recycle/' + id;
    return HttpRequestService.post(options);
  }

  getCondition(condition) {
    if (!condition) {
      return '';
    }
    let result = '';
    if (condition.keyword !== undefined && condition.keyword !== '') {
      result += '&keyword=' + condition.keyword;
    }
    if (condition.searchField !== undefined && condition.searchField !== '') {
      result += '&searchField=' + condition.searchField;
    }
    if (condition.state !== undefined && condition.state !== '') {
      result += '&state=' + condition.state;
    }
    if (condition.startDate) {
      result += '&startDate=' + condition.startDate;
    }
    if (condition.endDate) {
      result += '&endDate=' + condition.endDate;
    }
    if (!condition.doNotPage) {
      result += '&pageSize=' + condition.pageSize;
      result += '&pageIndex=' + condition.pageIndex;
    } else {
      result += '&onePage=false';
    }

    if (condition.className === 'UserInfoCondition') {
      if (condition.userName) {
        result += '&userName=' + condition.userName;
      }
      if (condition.password) {
        result += '&password=' + condition.password;
      }
    }

    if (result) {
      return '?' + result.substr(1);
    } else {
      return result;
    }
  }
}
