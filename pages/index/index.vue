<template>
	<view class="live_page">
		<view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				role: 'anchor'
			}
		},
		methods: {

		},
		created(){
			console.log(this.$host.getHost())
		}
	}
</script>

<style lang="scss">
.live_page{
	background-image: url(https://img2.csmall.com/webPublicity/5a182fd315873.jpg);
	background-color: #333;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;
	width: 100vw;
	overflow: hidden;
}
</style>
