import store from '@/store'
import hosts from './host.js'
// H5版本
// #ifdef H5
import Fly from './fly.js'
// #endif

//微信小程序和APP版本
// #ifndef H5
import Fly from './wx.js'
// #endif

const request = new Fly();
request.interceptors.request.use((request) => {
  uni.showLoading({
    title: '正在努力加载中...'
  });
  request.baseURL = /\/\//.test(request.url) ? '' : hosts.getHost().MAIN_HOST;

  const cookie = store.state.user.cookie;
  if (cookie) {
    //给所有请求添加自定义header
	request.headers['Cookie'] = cookie ? `jade-mall=${cookie};cs_t=${cookie}` : ''
  }
	request.headers['Content-Type'] =
	request.method.toUpperCase() === 'GET'
	  ? 'application/json'
	  : 'application/x-www-form-urlencoded'
  // 防止缓存
  if (request.method === 'POST' && request.headers['Content-Type'] !== 'multipart/form-data') {
    request.body = {
      ...request.body,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (request.method === 'GET') {
    request.params = {
      _t: Date.parse(new Date()) / 1000,
      ...request.params
    }
  }
  return request
})

request.interceptors.response.use(function(response) { //不要使用箭头函数，否则调用this.lock()时，this指向不对 
  let errmsg = '';
  const data = response.data;
  if (!data || typeof data !== 'object') {
    errmsg = '服务器响应格式错误';
    uni.showToast({
      title: errmsg,
      icon: 'none'
    })
  } else {
    const errno = data.errno;
    switch (errno) {
      case 1001:
        // 数据检验未通过
        for (let i in data.data) {
          errmsg += data.data[i] + ';'
        }
        break;
      default:
        errmsg = data.errmsg;
        break
    }
    if (errmsg !== '' && errno !== 0) {
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
    }
    if (errmsg !== '' && errno === 0) {
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
    }
  }
  uni.hideLoading();
  return response.data; //只返回业务数据部分
}, function(err) {
  // console.log("error-interceptor:" + JSON.stringify(err))
  let errmsg = err.message;
  switch (err.status) {
    case 0:
      errmsg = "网络连接错误";
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
      break;
    case 401:
      store.dispatch('logout');
      uni.redirectTo({
        url: '/pages/center/login'
      })
      break;
    default:
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
  }
})

export default request
export {
  request
}