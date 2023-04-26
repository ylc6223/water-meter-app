<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="tui-header-bg">
			<view class="user-info flex items-center" @tap="modal = true">
				<view class="avatar">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="flex flex-col" v-if="defaultClient==='admin'">
					<text class="text-white">点击登录</text>
					<text class="text-gray">共0台设备</text>
				</view>
			</view>
			<view class="actions-box flex items-center">
				<view class="flex items-center w-full justify-between">
					<view class="flex items-center">
						<tui-icon name="people-fill" color="#E74C3C"></tui-icon>
						<text v-if="defaultClient==='admin'" class="text-white">当前管理端</text>
						<text v-else class="text-white">当前用户端</text>
					</view>
					<tui-form-button background="#ffc048" radius="67rpx" width="235rpx" height="67rpx" color="#000"
						@click="toggleClient">
						<text v-if="defaultClient==='admin'">进入用户端</text>
						<text v-else>进入管理端</text>
					</tui-form-button>
				</view>
			</view>
		</view>
		<view class="menulist">
			<view v-if="defaultClient==='admin'" class="details flex justify-between">
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
			<view class="list" v-if="defaultClient==='admin'">
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
				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//log.svg" mode=""></image>
							<text>充值记录</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>

				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//write.svg" mode=""></image>
							<text>抄表记录</text>
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

				<xui-card border-radius="20" class="flex-1">
					<view class="flex items-center justify-between">
						<view class="flex items-center">
							<image class="menu-icon" src="/static/icons//setting.svg" mode=""></image>
							<text>权限设置</text>
						</view>
						<view class="flex items-center">
							<tui-icon name="arrowright"></tui-icon>
						</view>
					</view>
				</xui-card>
			</view>
		</view>

		<tui-modal :show="modal" @cancel="hide" :custom="true" :maskClosable="true" width="80%">
			<view class="tui-modal-custom flex flex-col items-center">
				<!-- <tui-lottie width="362" :options="options"></tui-lottie> -->
				<text class="block">您还未登录</text>
				<text class="block">请先登录在进行操作</text>
				<view class="w-full">
					<tui-button height="72rpx" :size="28" type="primary" shape="circle"
						@tap="navToLogin">立即登录</tui-button>
				</view>
				<text @tap="modal=false">稍后再说</text>
			</view>
		</tui-modal>

		<tui-tabbar></tui-tabbar>
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
					path: 'https://assets5.lottiefiles.com/packages/lf20_tri3EJ5bUI.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				defaultClient: 'consumer' //默认为用户端
			}
		},
		onLoad() {
			uni.hideTabBar()
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
			hide() {

			},
			//去登录
			navToLogin() {
				uni.navigateTo({
					url: "../../subpackage/user/login",
					fail(e) {
						console.log(e);
					}
				})
			},
			//切换用户端
			toggleClient() {
				if (this.defaultClient === 'consumer') {
					// 切换到管理端
					this.switchClient('admin')
					this.defaultClient = 'admin'
					this.resetTabBarIndex()
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else if (this.defaultClient === 'admin') {
					//切换到用户端
					this.switchClient('consumer')
					this.defaultClient = 'consumer'
					this.resetTabBarIndex()
					uni.switchTab({
						url: '/pages/index/index'
					})
				} else {

				}
			},
			...mapMutations(["switchClient", "resetTabBarIndex"])
		}
	}
</script>

<style lang="scss" scoped>
	page{
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
		margin-top: 128rpx;

		.avatar {
			width: 126rpx;
			height: 126rpx;
			margin-left: 8%;
			border-radius: 50%;
			background-color: #FFF;
			overflow: hidden;

			& image {
				width: 100%;
				height: 100%;
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