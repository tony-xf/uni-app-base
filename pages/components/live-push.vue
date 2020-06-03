<template>
	<cover-view>
		<live-pusher 
			id='livePusher'
			ref="livePusher" 
			class="livePusher" 
			:url="pushUrl"
			mode="SD" 
			:beauty="1" 
			whiteness="2"
			aspect="9:16"
			@statechange="statechange"
			@netstatus="netstatus"
			@error = "error">
		</live-pusher>
	</cover-view>
</template>

<script>
export default{
	data(){
		return {
			pushUrl: ''
		}
	},
	onReady() {
		
	}
	methods:{
		initData(){
			
		},
		getLivePush(){
			
		},
		statechange(){
			
		},
		netstatus() {
			
		},
		error() {
			
		}
	}
}
</script>

<style>
</style>
