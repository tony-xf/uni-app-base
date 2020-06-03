<template>
	<view class="login_page">
		<view class="auth" v-if="showAuth && pageInited">
			<image src="http://img2.csmall.com/webPublicity/59fd6700dd4dc.png" class="logo"></image>
			<view class="auth-subtitle">申请获取你的公开信息（昵称、头像等）</view>
			<button @getuserinfo="authUserInfo" class="auth-btn" openType="getUserInfo">微信授权</button>
		</view>
		<view v-if="!showAuth && pageInited">
			<view class="auth" v-if="useLoginType === 0">
				<image src="http://img2.csmall.com/webPublicity/59fd6700dd4dc.png" class="logo"></image>
				<view class="auth-subtitle">申请获取你的微信绑定的手机号</view>
				<button withCredentials @getphonenumber="getPhoneNumber" class="auth-btn" openType="getPhoneNumber">
					获取手机号
				</button>
				<view @click="usePhoneLoginType" class="link_btn">其他手机号码登录</view>
			</view>
			<view v-if="useLoginType === 1">
				<view class="login-container flex-column">
					<image src="http://img2.csmall.com//webPublicity/59fd6700dd4dc.png" class="logo"></image>
					<form @submit="formSubmit">
						<view class="input-group">
							<view class="input-line">
								<input maxlength="11" type="number" @input="bindPhoneInput" placeholder-style="font-size: 24rpx;" name="tel"
								 placeholder="请输入手机号码" />
							</view>
							<view class="input-line">
								<input @input="bindSMSInput" name="code" placeholder-style="font-size: 24rpx;" placeholder="请输入验证码" type="number" />
								<button @click="sendSMS" class="btn-login btn-inline btn-idle" v-if="vertificationStatus==='idle'">
									发送验证码
								</button>
								<button class="btn-login btn-inline btn-sent" v-else-if="vertificationStatus==='sent'">
									<text>{{remainSeconds}}s</text>
								</button>
								<button @click="sendSMS" class="btn-block btn-inline btn-retrieve text-white" v-else>
									重新获取
								</button>
							</view>
						</view>
						<view class="tip"> 未注册手机验证后自动登录，登录即同意<text>《用户协议》</text> </view>
						<button :class="'btn-login btn-submit '+ phone.length && smsCode.length ? '' : 'disabled'" formType="submit">
							登录
						</button>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showAuth: true,
				pageInited: true,
				useLoginType: 0,
				vertificationStatus: "idle",
				remainSeconds: 60
			}
		},
		methods: {
			authUserInfo() {
				
			},
			usePhoneLoginType() {

			},
			getPhoneNumber() {

			},
			bindPhoneInput() {

			},
			bindSMSInput() {

			},
			smsCode() {

			},
			sendSMS() {

			},
			formSubmit() {

			},
			initData() {
				if (uni.getSystemInfoSync().platform !== 'devtools') {
					this.showAuth = false;
					this.useLoginType = 1
				}
			}
		},
		created() {
			this.initData()
		}
	}
</script>

<style lang="scss">
	.login_page {
		.auth {
			text-align: center;
		}

		.logo {
			width: 400rpx;
			height: 96rpx;
			margin: 224rpx auto 40rpx;
		}

		.auth-title {
			font-size: 44rpx;
			color: #333;
			font-weight: 500;
		}

		.auth-subtitle {
			font-size: 28rpx;
			color: #666;
			margin: 22rpx 0 65rpx 0;
		}

		.auth-btn {
			width: 630rpx !important;
			height: 88rpx;
			line-height: 88rpx;
			background: #f7ad61;
			color: #fff;
			font-size: 32rpx;
		}

		.btn-login {
			width: 630rpx !important;
			line-height: 88rpx;
			position: relative;
			margin: 0;
			font-size: 32rpx;
			color: #fff;
		}

		.btn-login::after {
			border: 0;
		}

		.login-container {
			display: flex;
			flex-direction: column;
			height: 100%;
			padding: 30rpx 60rpx 0;
			background-color: #fff;

			.logo {
				margin-top: 0;
			}
		}

		.input-group {
			background-color: #fff;
		}

		.input-line {
			display: flex;
			height: 96rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #d9d9d9;
		}

		.input-line:first-child {
			border-bottom: 1rpx solid #eee;
		}

		input {
			width: 70%;
			font-size: 32rpx;
		}

		.btn-inline {
			position: relative;
			height: 59rpx;
			line-height: 59rpx;
			font-size: 28rpx;
			padding-left: 22rpx;
			padding-right: 22rpx;
			width: 180rpx;
			background-color: #fff;

			&::before {
				content: '';
				position: absolute;
				left: 0;
				top: 9rpx;
				height: 40rpx;
				width: 1rpx;
				background: #d9d9d9;
			}
		}

		.btn-idle {
			color: #f7ad61;
		}

		.btn-sent {
			color: #555;
			// background-color: #ccc;
		}

		.btn-retrieve {
			// background-color: #0097ff;
		}

		.tip {
			line-height: 80rpx;
			font-size: 22rpx;
			color: #999;
		}

		.center {
			text-align: center;
		}

		.btn-submit {
			background-color: #f7ad61;
		}

		.disabled {
			background-color: #ccc;
		}

		.navigator {
			display: inline-block;
			color: #0097ff;
		}

		.navigator-hover {
			color: #0097ff;
		}

		.auth .link_btn {
			margin: 40rpx auto 0;
			width: 630rpx;
			text-align: center;
			font-size: 30rpx;
			line-height: 88rpx;
			height: 88rpx;
			text-align: center;
			border: 1rpx solid #f7ad61;
			border-radius: 8rpx;
			color: #f7ad61;
		}

		.verify-mask {
			position: fixed;
			pointer-events: auto;
			z-index: 96;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;

			.verify-bg {
				z-index: 97;
				position: fixed;
				pointer-events: auto;
				background-color: rgb(0, 0, 0);
				opacity: 0.3;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.verify-modal {
				position: relative;
				z-index: 98;
				padding-top: 80rpx;
				position: fixed;
				pointer-events: auto;
				width: 550rpx;
				height: 560rpx;
				top: 280rpx;
				left: 50%;
				transform: translateX(-50%);
				background-color: #fff;
				border-radius: 4rpx;
				box-shadow: 2rpx 2rpx 100rpx rgba(0, 0, 0, 0.3);

				.wrapper {
					display: flex;
					flex-direction: column;
					align-items: center;

					.title {
						font-size: 32rpx;
						line-height: 32rpx;
						margin-bottom: 18rpx;
						color: #4e4e4e;
						text-align: center;
					}

					image {
						width: 240rpx;
						height: 80rpx;
						border: 1rpx solid #ebebeb;
					}

					.tip {
						font-size: 24rpx;
						line-height: 64rpx;
						margin-bottom: 18rpx;
						color: #a0a09f;
					}

					.vCode-input {
						width: 240rpx;
						height: 70rpx;
						font-size: 28rpx;
						color: #888;
						border: none;
						border-bottom: 2rpx solid #d9d9d9;
						text-align: center;
						border-radius: 0;
					}

					button {
						width: 430rpx;
						height: 90rpx;
						line-height: 90rpx;
						border: none;
						color: #fff;
						font-size: 34rpx;
						margin-top: 50rpx;
						border-radius: 10rpx;
						background: #f7ad61;
					}
				}
			}
		}
	}
</style>
