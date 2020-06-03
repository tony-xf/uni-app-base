import LoginServices from "../api/login.js"
const user_storage = uni.getStorageSync('USER') || {};
const cookie_storage = uni.getStorageSync('cookie') || '';
const User = {
	namespaced: true,
	state: {
		cookie: cookie_storage,
		info: user_storage,
		bind_status: false
	},
	mutations: {
		['SET_COOKIE'](state, data){
			state.cookie = data;
			uni.setStorageSync('cookie', data)
		},
		['SET_BIND_STATUS'](state, data){
			state.bind_status = data
		},
		['SET_USER_INFO'](state, data){
			state.info = data;
			uni.setStorageSync('USER', data)
		}
	},
	actions: {
		codeLogin({commit, state}, o){
			return new Promise((resolve, reject)=>{
				LoginServices
				.code2login(o)
				.then(({code, data}) => {
					if (code === 0) {
						let { cookie, customerInfo, isBinding } = data
						console.log(isBinding)
						if (isBinding) {
							let cookieId = cookie['jade-mall']
							commit('SET_COOKIE', cookieId)
							commit('SET_USER_INFO', customerInfo)
							commit('SET_BIND_STATUS', isBinding)
							uni.setStorageSync('LAST_LOGIN', Date.now())
							resolve(customerInfo)
						}
						reject({ key: 'LOGIN_FAIL', msg: '登录失败' })
					} else {
						reject()
					}
				})
				.catch((err) => {
					reject(err)
				})
			})
		},
		authorization({commit, state}, o){
			return new Promise((resolve, reject)=>{
				LoginServices
				.authorization(o)
				.then((code, data)=>{
					if(code === 0){
						let user_info = {}
						let { avatar, isBinding, nick, success, tempId, customerInfo, cookie, gender } = data
						if(isBinding){
							let cookieId = cookie['jade-mall']
							user_info = customerInfo
							commit('SET_COOKIE', cookieId)
						}else{
							user_info.avatar = avatar
							user_info.nick = nick
							user_info.gender = gender
						}
						user_info.bind_status = isBinding;
						success && commit('SET_USER_INFO', user_info)
						isBinding
								? resolve(user_info)
								: resolve({
									key: 'WECHAT_NOT_BIND_JADE_ACCOUNT',
									message: '这个微信号没有绑定jade-mall',
									tempId: tempId
								  })
					}
					reject()
				})
				.catch((err)=>{
					reject(err)
				})
			})
		}
	}
}
export default User