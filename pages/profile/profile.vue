<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="tui-header-bg">
			<view class="user-info flex items-center" @tap="modal = true">
				<view v-if="!userInfo" class="avatar">
					<image src="../../static/logo.png"></image>
				</view>
				<view v-else class="avatar noshadow">
					<image :src="userInfo.avatarUrl"></image>
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
		<view class="menulist">
			<view v-if="role==='admin'" class="details flex justify-between">
				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center">
						<image class="menu-icon" src="/static/icons/money-bag.svg" mode=""></image>
						<text>钱包</text>
					</view>
					<view>
						<text>余额￥0.00</text>
					</view>
				</xui-card>
				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center">
						<image class="menu-icon" src="/static/icons/rechargesvg.svg" mode=""></image>
						<text>起充</text>
					</view>
					<view>
						<text>金额￥50.00</text>
					</view>
				</xui-card>
			</view>
			<view class="list" v-if="role==='admin'">
				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//analyze-query-20.svg" mode=""></image>
							<text>能耗分析</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>

				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//message.svg" mode=""></image>
							<text>通知管理</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>

				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//question-circle.svg" mode=""></image>
							<text>常见问题</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>

				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//setting.svg" mode=""></image>
							<text>设置</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>
			</view>

			<view class="list" v-else>
				<xui-card border-radius="20" class="flex-1" v-for="(uitem,index) in consumerMenuList" :key="index"
					@tap="navTo(uitem.url,$event)">
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
			</view>
		</view>

		<block v-if="role==='consumer'">
			<tui-modal :show="showModal" custom :maskClosable="true">
				<view class="flex flex-col items-center">
					<tui-lottie width="450" height="400" :options="options"></tui-lottie>
					<text class="block my-15 title-text">您还未授权</text>
					<text class="block sub-title-text">请先授权再进行操作</text>
					<view class="w-full my-30">
						<tui-button height="72rpx" :size="28" shape="circle" type="green" @tap="empower">立即授权</tui-button>
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
						<tui-button height="72rpx" :size="28" shape="circle" type="green" @tap="navToLogin">立即登录</tui-button>
					</view>
					<view @tap="showModal=false">
						<text class="text-gray">稍后再说</text>
					</view>
				</view>
			</tui-modal>
		</block>
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				modal: false,
				options: {
					//注意：小程序端需确保域名已授权访问
					path: 'https://assets7.lottiefiles.com/packages/lf20_dqe40b1q.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				role: uni.getStorageSync('role') || 'consumer', //默认为用户端
				consumerMenuList: [{
						text: '充值记录',
						iconPath: '/static/icons//log.svg',
						url: '../../subpackage/consumer/recharge-history/recharge-history'
					},
					{
						text: '抄表记录',
						iconPath: '/static/icons//write.svg',
						url: '../../subpackage/consumer/check-history/check-history'
					},
					{
						text: '常见问题',
						iconPath: '/static/icons//question-circle.svg',
						url: ''
					},
					{
						text: '设置',
						iconPath: '/static/icons//setting.svg',
						url: '../../subpackage/user/app-setting'
					},
					{
						text: '权限设置',
						iconPath: '/static/icons//setting.svg',
						url: '#',
					},
				],
				adminMenuList: [],
				userInfo: null,
				isEmpower: false, //用户是否已授权
				showModal: false, //控制授权对话框显示隐藏
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		onShow() {
			const that = this
			try {
				const userInfo = that.$g.tui.getUserInfo()
				this.userInfo = this.userInfo ? this.userInfo : userInfo
				//检查授权状态
				if (!that.isEmpower && !userInfo && that.role === 'consumer') {
					//未授权
					this.showModal = true //唤起授权
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
						url: '/pages/index/index'
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
			...mapMutations(["switchRole", "resetTabBarIndex"]),
			navTo(url, e) {
				console.log(url);
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
			empower() {
				const that = this
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
									const userInfo = await that.getUserInfo()
									that.$g.tui.setUserInfo(userInfo)
									that.userInfo = userInfo
									that.isEmpower = true
									uni.hideLoading()
									that.showModal = false

								}
							})
						} else {
							that.$g.tui.showLoading('登陆中')
							// 用户已经同意小程序获取用户信息，后续调用相关接口不会弹窗询问
							const userInfo = await that.getUserInfo()
							that.$g.tui.setUserInfo(userInfo)
							that.userInfo = userInfo
							that.isEmpower = true
							uni.hideLoading()
							that.showModal = false
						}
					}
				})
			},
			//向微信获取用户信息
			getUserInfo() {
				return new Promise((resolve, reject) => {
					uni.getUserInfo({
						success(result) {
							resolve(result.userInfo)
						},
						fail(e) {
							console.log('获取用户信息失败');
							reject(e)
						}
					})
				})
			},
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
		z-index: 999;
		margin-top: -30rpx;
		padding: 4%;
		width: 100%;
		height: calc(100vh - 530rpx);
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
		}

		.list {
			::v-deep xui-card:first-child .card {
				margin: 0;
			}
		}
	}
</style>