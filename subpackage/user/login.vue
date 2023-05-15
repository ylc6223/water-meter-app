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
		</tui-form>
		<view class="menu-link" v-if="false">
			<text @click="register">没有账号?</text>
		</view>
		<view class="login-btn" @click="submit">登录</view>
	</view>
</template>

<script>
	import {
		adminLogin
	} from "@/api/public.js"
	import {
		mapMutations
	} from 'vuex'
	import utils from "@/components/common/tui-utils/tui-utils.js"
	// 校验规则
	const rules = [{
		name: "account",
		rule: ["required", "minLength:2", "maxLength:16"],
		msg: ["请输入用户名", "用户名必须2个或以上字符", "用户名不能超过16个字符"]
	}, {
		name: "password",
		// rule: ["required", "isEnAndNo"],
		rule: ["required"],
		// msg: ["请输入密码", "密码为8~20位数字和字母组合"]
		msg: ["请输入密码"]
	}]
	export default {
		data() {
			return {
				isShowPassword: true,
				loginFrom: {
					"account": "",
					"password": "",
				},
			}
		},
		methods: {
			...mapMutations(["setAdminUserInfo"]),
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
				adminLogin(this.loginFrom).then(res => {
					uni.hideLoading()
					this.setAdminUserInfo(res.result)
					uni.setStorageSync('adminUserInfo', res.result)
					uni.reLaunch({
						url: "/pages/admin-index/admin-index",
						fail(e) {
							console.log(e, "登录跳转失败");
						}
					})
				})
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
		position: relative;
		min-height: 100vh;
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
		position: absolute;
		left: 0;
		right: 0;
		margin: 0 60rpx;
		margin-bottom: 60rpx;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
		// display: flex;
		// justify-content: center;
		// align-items: center;
		// width: 100%;
		color: #FFFFFF;
		text-align: center;
		font-size: 38rpx;
		letter-spacing: 5rpx;
		height: 110rpx;
		line-height: 110rpx;
		border-radius: 20rpx;
		background-color: #4772fb;
	}
</style>