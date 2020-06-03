import config from '../config.js'
const network = 'NETWORK_ENV';
let ENV = 'prod'
function getEnv(){
	return config.isDebug ? ENV: 'prod'
}
function setEnv(env){
	ENV = env;
}
const prod = {
	MAIN_HOST: 'http://baoli.try.csmall.com/',
}
const dev = {
	MAIN_HOST: '127.0.0.1',
}

export default {
	ENV_PROD: 'prod',
	ENV_DEV: 'dev',
	initEnv: function(){
		let envFromStorage = uni.getStorageSync(network)
		envFromStorage && setEnv(envFromStorage)
	},
	getHost: function(){
		switch(getEnv()){
			case 'prod':
				return prod
			case 'dev':
				return dev
			default:
				return prod
		}
	},
	setEnvToStorage: function(env){
		uni.setStorageSync(network, env)
		setEnv(env)
	},
	getEnvFromStorage: function () {
		return config.isDebug ? uni.getStorageSync(network) : 'prod'
	}
}