<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="tui-header-bg">
			<view class="user-info flex items-center" @tap="modal = true">
				<view v-if="!userInfo" class="avatar">
					<image src="../../static/default-avatar.png"></image>
				</view>
				<view v-else class="avatar noshadow">
					<image :src="userInfo.avatarUrl||'../../static/default-avatar.png'"></image>
				</view>
				<view class="flex flex-col">
					<view @tap="showModal=true">
						<text class="text-white">点击登录</text>
					</view>
					<view v-if="role==='admin'">
						<text class="text-gray">共0台设备</text>
					</view>
				</view>
			</view>
			<view class="actions-box flex items-center">
				<view class="flex items-center w-full justify-between">
					<view class="flex items-center">
						<tui-icon name="people-fill" color="#E74C3C"></tui-icon>
						<text v-if="role==='admin'" class="text-white">当前管理端</text>
						<text v-else class="text-white">当前用户端</text>
					</view>
					<tui-form-button background="#ffc048" radius="67rpx" width="235rpx" height="67rpx" color="#000"
						@click="toggleClient">
						<text v-if="role==='admin'">进入用户端</text>
						<text v-else>进入管理端</text>
					</tui-form-button>
				</view>
			</view>
		</view>
		<view class="menulist" :style="{height:`calc(100vh - 530rpx - 40rpx - ${safeAreaHeight}px)`}">
			<view v-if="role==='admin'" class="details flex justify-between">
				<xui-card border-radius="20" class="flex-1" @tap="navTo(walletPageUrl,$event)">
					<view class="flex items-center">
						<image class="menu-icon" src="/static/icons/money-bag.svg" mode=""></image>
						<text>钱包</text>
					</view>
					<view>
						<text>余额￥0.00</text>
					</view>
				</xui-card>
				<xui-card border-radius="20" class="flex-1" @tap="changePayLimit">
					<view class="flex items-center">
						<image class="menu-icon" src="/static/icons/rechargesvg.svg" mode=""></image>
						<text>起充</text>
					</view>
					<view>
						<text>金额￥50.00</text>
					</view>
				</xui-card>
			</view>
			<scroll-view scroll-y class="list admin" :style="{maxHeight:screenHeight>736?'auto':'568rpx'}"
				v-if="role==='admin'">
				<xui-card border-radius="20" class="flex-1" v-for="(aitem,index) in adminMenuList" :key="index"
					@tap="navTo(aitem,$event)">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" :src="aitem.iconPath" mode=""></image>
							<text>{{aitem.text}}</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>
			</scroll-view>

			<scroll-view scroll-y class="list" :style="{maxHeight:screenHeight>736?'auto':'570rpx'}" v-else>
				<xui-card border-radius="20" class="flex-1" v-for="(uitem,index) in consumerMenuList" :key="index"
					@tap="navTo(uitem,$event)">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" :src="uitem.iconPath" mode=""></image>
							<text>{{uitem.text}}</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>
			</scroll-view>
		</view>

		<block v-if="role==='consumer'">
			<tui-modal :show="showModal" custom :maskClosable="true">
				<view class="flex flex-col items-center">
					<tui-lottie width="450" height="400" :options="options"></tui-lottie>
					<text class="block my-15 title-text">您还未授权</text>
					<text class="block sub-title-text">请先授权再进行操作</text>
					<view class="w-full my-30">
						<tui-button height="72rpx" :size="28" shape="circle" type="green" open-type="getPhoneNumber"
							@getphonenumber="empower">立即授权</tui-button>
					</view>
					<view @tap="showModal=false">
						<text class="text-gray">稍后再说</text>
					</view>
				</view>
			</tui-modal>
		</block>

		<block v-if="role==='admin'">
			<tui-modal :show="showModal" custom :maskClosable="true">
				<view class="flex flex-col items-center">
					<tui-lottie width="450" height="400" :options="options"></tui-lottie>
					<text class="block my-15 title-text">您还未登录</text>
					<text class="block sub-title-text">请先登录再进行操作</text>
					<view class="w-full my-30">
						<tui-button height="72rpx" :size="28" shape="circle" type="green"
							@tap="navToLogin">立即登录</tui-button>
					</view>
					<view @tap="showModal=false">
						<text class="text-gray">稍后再说</text>
					</view>
				</view>
			</tui-modal>
		</block>

		<block>
			<tui-bottom-popup :zIndex="9001" :maskZIndex="9000" :show="showPopup" @close="showPopup = false">
				<view class="bottom-popup">
					<text class="block my-30 text-black text-lg text-center">起充金额</text>
					<view class="mx-30 p-20 rounded-xl bg-grey flex items-center justify-between">
						<text class="text-black text-lg">当前起充金额</text>
						<text class="text-light-green">30元</text>
					</view>
					<text class="my-30 mx-30 inline-block text-base text-black">调整起充金额</text>
					<view class="tui-input__box" @tap="cursor = true">
						<view class="tui-symbol">￥</view>
						<view class="tui-input">{{value}}</view>
						<view class="tui-cursor" v-if="cursor"></view>
					</view>
					<tui-digital-keyboard buttonBackground="#27AE60" buttonText="确定" :show="true" :disabled="value==''"
						:isDecimal="true" @click="keyTap" @backspace="backspace"
						@confirm="confirm"></tui-digital-keyboard>
				</view>
			</tui-bottom-popup>
		</block>
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				screenHeight: 0,
				safeAreaHeight: 0, //底部安全区高度
				modal: false,
				options: {
					//注意：小程序端需确保域名已授权访问
					path: 'https://assets2.lottiefiles.com/packages/lf20_zbui4bnx.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				role: uni.getStorageSync('role') || 'consumer', //默认为用户端
				//普通用户菜单
				consumerMenuList: [{
						text: '充值记录',
						iconPath: '/static/icons//log.svg',
						url: '../../subpackage/public/recharge-history',
						isVerify: true
					},
					{
						text: '抄表记录',
						iconPath: '/static/icons//write.svg',
						url: '../../subpackage/public/check-history',
						isVerify: true
					},
					{
						text: '常见问题',
						iconPath: '/static/icons//question-circle.svg',
						url: '../../subpackage/public/question',
						isVerify: false
					},
					{
						text: '设置',
						iconPath: '/static/icons//setting.svg',
						url: '../../subpackage/user/app-setting',
						isVerify: false
					},
					{
						text: '权限设置',
						iconPath: '/static/icons//setting.svg',
						url: '#',
						isVerify: false
					},
				],
				//管理员菜单
				adminMenuList: [{
						text: '能耗分析',
						iconPath: '/static/icons//analyze-query-20.svg',
						url: '',
						isVerify: true
					},
					{
						text: '通知管理',
						iconPath: '/static/icons//message.svg',
						url: '../../subpackage/public/question',
						isVerify: true
					},
					{
						text: '常见问题',
						iconPath: '/static/icons//setting.svg',
						url: '/static/icons//question-circle.svg',
						isVerify: true
					},
					{
						text: '设置',
						iconPath: '/static/icons//setting.svg',
						url: '#',
						isVerify: false
					},

				],
				walletPageUrl: '../../subpackage/admin/wallet/wallet',
				showModal: false, //控制授权对话框显示隐藏
				showPopup: false,
				cursor: false,
				value: '', //起充金额
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "isLogin", "userInfo"]),
			...mapGetters(["isEmpower"])
		},
		onLoad() {
			uni.hideTabBar()
			const systemInfo = uni.getSystemInfoSync()
			this.screenHeight = systemInfo.screenHeight
			// 计算安全区域大小
			const safeArea = systemInfo.safeArea
			// 计算导航栏高度
			const navBarHeight = systemInfo.statusBarHeight + 44 // 44 为导航栏高度
			// 计算 TabBar 高度
			const tabBarHeight = 50 //TabBar的高度预设为为100rpx
			// 计算理想显示区域高度
			this.safeAreaHeight = this.screenHeight - safeArea.bottom
			// const idealHeight = screenHeight - safeArea.top - navBarHeight - tabBarHeight
		},
		onShow() {
			const that = this
			try {
				const userInfo = that.$g.tui.getUserInfo()
				//检查授权状态
				if (!that.isEmpower && !userInfo && that.role === 'consumer') {
					//未授权
					this.showModal = true //唤起授权
				}
				//已登录并且是管理员
				if (userInfo && userInfo.accountType === 89) {
					this.adminMenuList.unshift({
						text: '收款账户',
						iconPath: '/static/icons//analyze-query-20.svg',
						url: '../../subpackage/admin/income-account/income-account',
						isVerify: true
					})
				}
			} catch (e) {}
		},
		methods: {
			/**
			 * @description 导航栏初始化信息，回传导航栏相关信息
			 * @param {number} width 导航栏宽度
			 * @param {number} height:导航栏高度,
			 * @param {string} left:左边界坐标(px),
			 * @param {string} top:上边界坐标(px),
			 * @param {Number} statusBarHeight 状态栏高度,
			 * @param {Number} opacity:不透明度,
			 * @param {Number} windowHeight
			 *
			 * @return void没有返回值
			 */
			initNavigation({
				width,
				height,
				left,
				top,
				statusBarHeight,
				opacity,
				windowHeight
			}) {

			},
			//去登录
			navToLogin() {
				this.showModal = false
				uni.navigateTo({
					url: "../../subpackage/user/login",
					fail(e) {
						console.log(e);
					}
				})
			},
			//切换用户端
			toggleClient() {
				if (this.role === 'consumer') {
					// 切换到管理端
					this.switchRole('admin')
					this.role = 'admin'
					//缓存对应角色
					uni.setStorageSync('role', this.role)
					this.resetTabBarIndex()
					uni.switchTab({
						url: '/pages/admin-index/admin-index'
					})
				} else if (this.role === 'admin') {
					//切换到用户端
					this.switchRole('consumer')
					this.role = 'consumer'
					//缓存对应角色
					uni.setStorageSync('role', this.role)
					this.resetTabBarIndex()
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {

				}
			},
			...mapMutations(["switchRole", "resetTabBarIndex", "setUserInfo"]),
			navTo({
				url,
				isVerify
			}, e) {
				if (!this.userInfo && isVerify) {
					this.showModal = true
					return
				}
				if (url === '#') {
					uni.openSetting({
						success(res) {
							console.log(res.authSetting)
						}
					});
					return
				}
				uni.navigateTo({
					url: url,
					fail(e) {
						console.log("fail", e);
					}
				});
			},
			//授权允许获取用户信息
			empower(e) {
				const that = this
				const phoneCode = e.code
				uni.getSetting({
					async success(res) {
						//未授权获取用户信息
						if (!res.authSetting['scope.userInfo']) {
							//要求授权并获取用户信息
							uni.authorize({
								scope: 'scope.userInfo',
								async success() {
									that.$g.tui.showLoading('登陆中')
									// 用户已经同意小程序获取用户信息，后续调用相关接口不会弹窗询问
									const {
										result
									} = await that.usePhonelogin({
										"phoneCode": phoneCode,
										"openId": uni.getStorageSync('openid')
									})
									console.log(result);
									that.$g.tui.setUserInfo(result)
									that.setUserInfo(result)
									uni.hideLoading()
									that.showModal = false
								}
							})
						} else {
							that.$g.tui.showLoading('登陆中')
							// 用户已经同意小程序获取用户信息，后续调用相关接口不会弹窗询问
							const {
								result
							} = await that.usePhonelogin({
								"phoneCode": phoneCode,
								"openId": uni.getStorageSync('openid')
							})
							console.log(result);
							that.$g.tui.setUserInfo(result)
							that.setUserInfo(result)
							uni.hideLoading()
							that.showModal = false
						}
					}
				})
			},
			usePhonelogin(data) {
				return new Promise(function(resolve, reject) {
					login(data).then(res => {
						resolve(res)
					}).catch(e => {
						reject(e)
					})
				})
			},
			keyTap(e) {
				let keyVal = e.value;
				let value = this.value;
				if (~value.indexOf('.') && keyVal == '.') return;
				//最大9位，自行控制即可
				if (value.length == 9) {
					this.tui.toast('超过限制位数，不可输入')
					return
				}
				if (!this.value && keyVal == '.') {
					this.value = '0.'
				} else {
					this.value = this.value + e.value;
				}
			},
			backspace(e) {
				let val = this.value;
				if (val) {
					this.value = val.substring(0, val.length - 1)
				}
			},
			confirm(e) {
				this.showPopup = false;
				this.cursor = false;
				this.$g.tui.toast({
					text: '水价修改为：' + Number(this.value)
				})
			},
			changePayLimit() {
				if (!this.userInfo) {
					this.showModal = true
					return
				}
				this.showPopup = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		font-weight: bold;
		color: #333;
	}

	.tui-header-bg {
		position: relative;
		height: 460rpx;
		background-color: #1dd1a1;
		background-color: #27ae60;
	}

	.actions-box {
		position: absolute;
		left: 4%;
		right: 4%;
		bottom: 20rpx;
		height: 160rpx;
		margin: 0 auto;
		border-top-left-radius: 28rpx;
		border-top-right-radius: 28rpx;
		// background-color: #54a0ff;
		background-color: #393b4f;

		&>view {
			padding: 0 4%;
		}
	}

	.user-info {
		position: relative;
		z-index: 2001;
		margin-top: 128rpx;

		.avatar {
			position: relative;
			z-index: 999;
			width: 126rpx;
			height: 126rpx;
			margin-left: 8%;
			border-radius: 50%;
			background-color: #27AE60;
			box-shadow: 0px 0px 0px 5rpx #393B4F;
			overflow: hidden;

			& image {
				width: 100%;
				height: 100%;
			}

			&.noshadow {
				box-shadow: none;
			}
		}

		.avatar+view {
			margin-left: 26rpx;
		}
	}

	.menulist {
		position: relative;
		box-sizing: border-box;
		overflow: hidden;
		z-index: 999;
		margin-top: -30rpx;
		padding: 10rpx 30rpx;
		width: 100%;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		background-color: #F7F7F7;

		.details {
			xui-card:first-child {
				margin-right: 10rpx;
			}

			xui-card:last-child {
				margin-left: 10rpx;
			}
		}

		.menu-icon {
			width: 48rpx;
			height: 48rpx;
			margin-right: 20rpx;
		}

		.list {
			&.admin {
				// margin-top: 40rpx;
			}

			::v-deep xui-card:first-child .card {
				margin: 0;
			}
		}
	}

	.bottom-popup {
		min-height: 70vh;
	}

	.tui-input__box {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		height: 88rpx;
		margin: 0 30rpx;
		padding-bottom: 2rpx;
	}

	.tui-symbol {
		font-size: 60rpx;
		font-weight: bold;
	}

	.tui-input {
		font-size: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		padding-right: 6rpx;
	}

	.tui-cursor {
		display: block;
		width: 2px;
		border-radius: 2px;
		height: 88rpx;
		animation: blink 1s infinite steps(1, start)
	}

	@keyframes blink {
		0% {
			background-color: white;
		}

		50% {
			background-color: #5677fc;
		}

		100% {
			background-color: white;
		}
	}
</style>