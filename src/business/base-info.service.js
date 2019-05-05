import router from '../../router';
import { LocalDataService } from '../../utils';

export class BaseInfoService {
  static navigatorChange = new Subject();
  static userChange = new Subject();

  static clearUser() {
    const user = this.getUser();
    if (user) {
      try {
        user.expire = ((new Date()).valueOf() - 60 * 60 * 1000);
        user.token = '';
        LocalDataService.cookieSet('userInfo', JSON.stringify(user), 0);
      } catch (ex) {
        console.log(ex);
      }
    }
    this.userChange = new Subject();
  }

  static getUser() {
    let userInfo;
    try {
      if (LocalDataService.cookieGet('userInfo')) {
        userInfo = JSON.parse(LocalDataService.cookieGet('userInfo'));
      }
      if (!userInfo || !userInfo.token) {
        return null;
      } else {
        userInfo.expire = ((new Date()).valueOf() + 60 * 60 * 1000);
        LocalDataService.cookieSet('userInfo', JSON.stringify(userInfo), (60 * 60).toString());
        return userInfo;
      }
    } catch (ex) { }
    return userInfo;
  }

  static setUser(userData) {
    const userInfo = {
      userId: userData.userId,
      userName: userData.userName,
      token: userData.token,
      expire: ((new Date()).valueOf() + 60 * 60 * 1000)
    };
    // this.userChange.next(userInfo);
    LocalDataService.cookieSet('userInfo', JSON.stringify(userInfo));
  }

  static validateUser() {
    const user = this.getUser();
    if (!user) {
      if (window.location.pathname.toLowerCase().indexOf('/login') === -1) {
        router.push({ name: 'login', params: { url: window.location.pathname.toLowerCase() } });
      }
    }
    return user;
  }
}
