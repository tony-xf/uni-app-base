import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import Host from './utils/host.js'
Vue.prototype.$store = store
Vue.config.productionTip = false
Vue.prototype.$host = Host
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
