<template>
	<view class="content">
		<view class="title">
			登录
		</view>
		<tui-form ref="form">
			<view class="row-input">
				<tui-input placeholder="请输入用户名" :border-bottom="false" v-model="loginFrom.account">
					<template v-slot:left>
						<view>
							<tui-icon name="people" color="#333" :size="40" unit="rpx"></tui-icon>
						</view>
					</template>
				</tui-input>
			</view>
			<view class="row-input">
				<tui-input placeholder="请输入密码" :border-bottom="false" :password="!isShowPassword"
					v-model="loginFrom.password">
					<template v-slot:left>
						<view>
							<tui-icon name="pwd" color="#333" :size="40" unit="rpx"></tui-icon>
						</view>
					</template>
				</tui-input>
				<tui-icon v-if="isShowPassword" @click="showOrHide" name="seen" color="#333" :size="40" unit="rpx">
				</tui-icon>
				<tui-icon v-else @click="showOrHide" name="unseen" color="#333" :size="40" unit="rpx"></tui-icon>
			</view>
			<view class="row-input">
				<tui-input v-model="loginFrom.code" :border-bottom="false" padding="20rpx 30rpx" placeholder="请输入验证码">
					<template v-slot:left>
						<view>
							<tui-icon name="shield" color="#333" :size="40" unit="rpx"></tui-icon>
						</view>
					</template>
				</tui-input>
			</view>
			<view class="row-input" @tap="refreshCaptcha">
				<image :src="captcha" mode="aspectFit"></image>
			</view>
		</tui-form>
		<view class="menu-link" v-if="false">
			<text @click="register">没有账号?</text>
		</view>
		<view class="login-btn" @click="submit">登录</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	import utils from "@/components/common/tui-utils/tui-utils.js"
	// 校验规则
	const rules = [{
			name: "account",
			rule: ["required", "minLength:2", "maxLength:16"],
			msg: ["请输入用户名", "用户名必须2个或以上字符", "姓名不能超过16个字符"]
		}, {
			name: "password",
			// rule: ["required", "isEnAndNo"],
			rule: ["required"],
			// msg: ["请输入密码", "密码为8~20位数字和字母组合"]
			msg: ["请输入密码"]
		},
		{
			name: "code",
			rule: ["required"],
			msg: ["请输入验证码"]
		}
	]
	export default {
		data() {
			return {
				isShowPassword: true,
				loginFrom: {
					"account": "",
					"password": "",
					"codeId": "",
					"code": ""
				},
				captcha: "data:image/gif;base64,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"
			}
		},
		created() {
			// this.getCaptcha()
		},
		// computed: mapState(["isLogin"]),
		methods: {
			...mapMutations(["setLoginState", "setUserInfo"]),
			// 显示密码/隐藏密码
			showOrHide() {
				this.isShowPassword = !this.isShowPassword
			},

			// 注册
			register() {
				uni.navigateTo({
					url: './register'
				})
			},
			//登录
			userLogin() {
				setTimeout(() => {
					this.setLoginState(true)
					this.setUserInfo('userInfo', {})
					uni.reLaunch({
						url: "/pages/admin-index/admin-index",
						fail(e) {
							console.log(e, "登录跳转失败");
						}
					})
				}, 1000)
				// login(this.loginFrom).then(res => {
				// 	uni.setStorageSync('accessToken', res.result.accessToken);
				// 	getApp().globalData.accessToken = res.result.accessToken
				// 	this.setLoginState(true)
				// 	uni.reLaunch({
				// 		url: "/pages/index/index",
				// 		fail(e) {
				// 			console.log(e, "登录跳转失败");
				// 		}
				// 	})
				// })
			},
			//获取验证码
			getCaptcha() {
				captcha().then(res => {
					console.log(res);
					let {
						img,
						id
					} = res.result
					this.captcha = "data:image/gif;base64," + img
					this.loginFrom.codeId = id
				})
			},
			//刷新验证码
			refreshCaptcha() {
				utils.debounce(this.getCaptcha);
			},
			submit() {
				const that = this
				this.$refs.form.validate(this.loginFrom, rules).then(res => {
					this.$g.tui.toast({
						text: "校验通过"
					})
					that.$g.tui.showLoading()
					that.userLogin()
				}).catch(errors => {
					console.log(errors)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: #FFF;
		padding: 0 60rpx;
	}

	.title {
		padding-bottom: 50rpx;
		height: 200rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 60rpx;
		letter-spacing: 5rpx;
		color: #585858;
	}

	.row-input {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 110rpx;
		border-bottom: 1rpx solid #ededed;

		tui-icon {
			margin: 0 20rpx;
			flex-shrink: 0;
			width: 36rpx;
			height: 40rpx;
		}

		image {
			// width: 100%;
			height: 100rpx;
		}

		input {
			width: 480rpx;
			font-size: 30rpx;
		}
	}

	.menu-link {
		display: flex;
		justify-content: flex-end;
		line-height: 100rpx;
		font-size: 28rpx;
		color: #6a75cf;
		padding-bottom: 20rpx;
	}

	.login-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #FFFFFF;
		font-size: 38rpx;
		letter-spacing: 5rpx;
		height: 110rpx;
		border-radius: 20rpx;
		background-color: #4772fb;
	}
</style>