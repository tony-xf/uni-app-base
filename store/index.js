import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import user from './User.js'
export default new Vuex.Store({
  modules: {
    user
  }
})