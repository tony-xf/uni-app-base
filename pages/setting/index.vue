<template>
	<view class='setting_page'>
		<text class="title">应用信息</text>
		  <text class="tips"
		    >Tips：如果遇到非业务域名无法打开或者无法获取数据的提示，请在右上角打开调试模式。</text
		  >
		  <text class="text-app-info">{{appInfo}}</text>
		  <text class="title">API环境切换</text>
		  <radio-group @change="changeEnv" class="radio-group-env">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in envs" :key="item.value">
				<view>
					<radio :value="item.value" :checked="env===item.value" />
				</view>
				<view>{{item.name}}</view>
			</label>
		  </radio-group>
		  <button @click="submit" class="button" type="primary">提交环境配置</button>
	</view>
</template>

<script>
	import Hosts from '../../utils/host.js'
	export default{
		data(){
			return{
				appInfo: {},
				env: Hosts.ENV_PROD,
				envs: [
				  {
					name: 'prod',
					value: Hosts.ENV_PROD
				  },
				  {
					name: 'dev',
					value: Hosts.ENV_DEV
				  }
				]
			}
		},
		methods:{
			submit() {
				Hosts.setEnvToStorage(this.env);
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			changeEnv(e){
				this.env = e.target.value
			}
		}
	}
</script>

<style lang="scss">
.setting_page{
	display: flex;
	padding: 32rpx;
	flex-direction: column;
	.title {
	  margin-top: 32rpx;
	  font-size: 32rpx;
	}
	
	.tips {
	  margin-top: 32rpx;
	  font-size: 28rpx;
	}
	.text-app-info {
	  width: 700rpx;
	  margin-top: 32rpx;
	  font-size: 28rpx;
	  background: aliceblue;
	  padding-top: 24rpx;
	  padding-bottom: 24rpx;
	  word-break: break-all;
	}
	.radio-group-env {
	  margin-top: 32rpx;
	  display: flex;
	  flex-direction: column;
	}
	.radio-env {
	  font-size: 28rpx;
	  margin-top: 8rpx;
	}
	.button {
}
	  margin-top: 32rpx;
	  font-size: 28rpx;
	  width: 700rpx;
	}
</style>
