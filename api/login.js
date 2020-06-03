import http from "../utils/request.js"
import Hosts from "../utils/host.js"
const api = {
  authorization: (params) => http.post('login/authorization', params),
  code2login: (params) => http.post('login/appletLogin', params),
  Login: (params) => http.post('/login/login', params),
  loginByWxMobile: (params) => http.post('login/mobileLogin', params),
  loginByMobile: (params) => http.post('login/verifyShortLogin', params),
  sendSms: (params) => http.post('login/sendSms', params),
  checkLoginVerifyCode: (params) => http.get('login/checkVerifyCode/smsSignIn/' + params),
  loginVerifyCode: () =>
    new Promise((resolve, reject) => {
      uni.request({
        url: Hosts.getApiHost().MAIN_HOST + 'login/verifyCode/smsSignIn',
        responseType: 'arraybuffer',
        success: resolve,
        fail: reject
      })
    })
}

export default api