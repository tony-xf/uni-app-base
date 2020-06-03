<script>
import config from 'config.js'
import Hosts from './utils/host.js'
import {mapActions} from 'vuex'
export default {
	methods: {
		...mapActions({
		　　　　codeLogin: "user/codeLogin"
		　　})
	},
	onLaunch: function() {
		const self = this
		config.isDebug && Hosts.initEnv();
		console.log(this.$store.state.user.info)
		const user = this.$store.state.user.info
		if(!user.id){
			uni.login({
				provider: 'weixin',
				success: function ({ code }) {
					self.codeLogin({code}).catch(()=>{})
				}
			});
		}
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
