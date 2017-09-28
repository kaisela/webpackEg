const GLOBAL = {
  getLoginUrl () {
    var logoutUrl = '';
    var _logHost = '';
    if (document.location.host.indexOf('dev') > -1 || document.location.host.indexOf('local') > -1 || document.location.host.indexOf('127.0.0.1') > -1 || document.location.host.indexOf('10.2.2.50') > -1 || document.location.host.indexOf('10.2.2.204') > -1) {
      // if (document.location.host.indexOf('dev') > -1 || document.location.host.indexOf('127.0.0.1') > -1 || document.location.host.indexOf('10.2.2.50') > -1 || document.location.host.indexOf('10.2.2.204') > -1) {
      _logHost = 'sso.dev.adt100.net';
      window.ROOT = document.location.host.indexOf('dev') > -1 ? '' : '/login.html';
      // _this.sso_server = 'http://localhost:8089';
    } else {
      _logHost = 'sso007.adt100.com';
      window.ROOT = '';
      // this.sso_server = 'http://localhost:8089';
    }
    logoutUrl = 'http://' + _logHost + '/logout?service=http://' + window.location.host + window.ROOT;
    return logoutUrl;
  },
  URL: {
    GET_USER_INFO: '/Yishang2/user/getLoginUserInfo', // 获取登录用户信息
    GET_CUST_ACCOUNT_LIST: '/Yishang2/user/getCustAccountList', // 获取用户列表
    GET_LAST_USER: '/Yishang2/user/getLastOpeCust', // 获得管理员最近操作的用户信息
    SET_LAST_USER: '/Yishang2/user/setLastOpeCust', // 设置管理员最近操作的用户信息
    TEST_URL: 'Yishang2/test/get'
  },
  TAG_TYPE: {
    CATEGROY: '1000',
    SUECATEGROY: '1001',
    UPDATE_FRAP: '1005'
  }

}
export default GLOBAL;
