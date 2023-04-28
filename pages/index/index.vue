<template>
	<view class="container relative">
		<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent isCustom
			color="#FFF" title="水表管理大师">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<template>
				<view class="navigation-bar flex items-center" :style="{'height':titleBarHeight+'px'}">
					<view class="scan" @tap="scanCode">
						<tui-icon name="sweep" color="#FFF"></tui-icon>
					</view>
					<text class="navigation-bar-title text-white">水表管理大师</text>
				</view>
			</template>
			<!-- #endif -->
		</tui-navigation-bar>
		<!-- 占位背景容器 -->
		<view class="tui-header-bg">
			<view class="tui-header-slide relative" :style="{'top':navigationBarHeight +'px'}">
				<swiper class="swiper" circular :indicator-dots="true" indicator-color="#FFF"
					indicator-active-color="#07C160" :autoplay="true">
					<swiper-item v-for="(banner,index) in banners" :key="index">
						<view class="swiper-item">
							<image :src="banner.url"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<!-- <view class="card-wrap" :style="{'margin-top':navigationBarHeight+'px','height': cardHeight+'px'}"> -->
		<view class="card-wrap" :style="{'margin-top':navigationBarHeight+'px'}">
			<xui-card :hover="false" :shadow="true">
				<view v-if="nodevice" class="flex h-full flex-col items-center justify-center">
					<view class="nodata-img">
						<image src="../../static/icons/shebei.svg" mode=""></image>
					</view>
					<text class="small-text">没有设备</text>
					<tui-form-button background="#5677FC" radius="45rpx" width="300rpx" height="90rpx" color="#000"
						@click="scanningDevice">
						<text class="text-white">扫描设备二维码</text>
					</tui-form-button>
				</view>
				<view v-else class="device-info flex flex-col justify-center">
					<view class="flex items-center">
						<image class="device-icon" src="../../static/icons/log.svg" mode=""></image>
						<view>
							<text class="block title-text">深蓝工业园4#201</text>
							<text class="block sub-title-text">蓝牙水表号:YM00232P0169</text>
						</view>
					</view>
					<view>
						<view class="my-15 flex items-center justify-center">
							<image class="icon" src="../../static/icons/water.svg" mode=""></image>
							<text class="sub-title">剩余水量(m³)</text>
						</view>
					</view>
					<view class="surplus flex justify-center">
						16.67
					</view>
					<view class="my-15 flex justify-center">
						<tui-form-button background="#07c16094" radius="67rpx" width="235rpx" height="67rpx"
							color="#FFF">
							抄表
						</tui-form-button>
					</view>
					<view class="meter-info p-30">
						<view class="meter-info-item flex items-center justify-between">
							<text class="title-text">总水量(m³)</text>
							<text>0.20</text>
						</view>
						<view class="meter-info-item flex items-center justify-between">
							<text class="title-text">抄表时间</text>
							<text>04-26 16:27</text>
						</view>
						<view class="meter-info-item flex items-center justify-between">
							<text class="title-text">水量单价(元/m³)</text>
							<text>3</text>
						</view>
					</view>

					<tui-button shape="circle" type="green">
						水表充值
					</tui-button>
				</view>
			</xui-card>
		</view>

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
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: {
					//注意：小程序端需确保域名已授权访问
					path: 'https://assets7.lottiefiles.com/packages/lf20_dqe40b1q.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				nodevice: false, //未绑定设备
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				screenHeight: 0, //屏幕高度
				cardHeight: 0, //卡片高度
				isEmpower: false, //用户是否已授权
				showModal: false, //控制授权对话框显示隐藏
				banners: [{
						url: '../../static/imgs/banner.png'
					},
					{
						url: '../../static/imgs/banner1.png'
					}
				],
				userInfo: null
			}
		},
		created() {
			this.resetTabBarIndex()
		},
		onLoad() {
			uni.hideTabBar()
			const systemInfo = uni.getSystemInfoSync()
			this.screenHeight = systemInfo.screenHeight
			//内容高度 = 屏幕高度-轮播图高度-导航栏高度-tabbar高度 -冗余高度
			this.cardHeight = this.screenHeight - 150 - this.navigationBarHeight - 55
		},
		onShow() {
			const that = this
			try {
				const userInfo = that.$g.tui.getUserInfo()
				this.userInfo = this.userInfo ? this.userInfo : userInfo
				if (userInfo) {
					return
				} else {
					this.showModal = true //唤起授权
				}
			} catch (e) {}
		},
		methods: {
			...mapMutations(["changeTabBar", "resetTabBarIndex"]),
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
			//初始化自定义导航栏
			initNavigation({
				width,
				height,
				left,
				top,
				statusBarHeight,
				opacity,
				windowHeight
			}) {
				this.titleBarHeight = height - statusBarHeight
				this.navigationBarHeight = height
			},
			//扫码
			scanCode() {
				uni.scanCode({
					scanType: [
						'qrCode'
					],
					success() {

					},
					fail() {

					},
					complete() {

					}
				})
			},
			//用户向小程序授权允许获取用户信息
			empower() {
				const that = this
				uni.getSetting({
					success(res) {
						//未授权获取用户信息
						if (!res.authSetting['scope.userInfo']) {
							//要求授权并获取用户信息
							uni.authorize({
								scope: 'scope.userInfo',
								success() {
									// 用户已经同意小程序获取用户信息，后续调用相关接口不会弹窗询问
									that.getUserInfo()
								}
							})
						} else {
							//直接获取用户信息
							that.getUserInfo()
						}
					}
				})
			},
			wxLogin(){
				
			},
			//向微信获取用户信息
			getUserInfo() {
				const that = this
				uni.getUserInfo({
					success(result) {
						console.log(result);
						that.$g.tui.setUserInfo(result.userInfo)
						that.userInfo = result.userInfo
						that.isEmpower = true
						that.showModal = false
					},
					fail(e) {
						console.log('获取用户信息失败');
					}
				})
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar"]),
		},
	}
</script>

<style scoped lang="scss">
	::v-deep tui-modal .tui-modal-box {
		// width: 80% !important;
	}

	.navigation-bar {
		position: relative;

		.scan {
			margin-left: 4%;
		}

		.navigation-bar-title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 20px;
			line-height: 1.5;
			text-align: center;
		}
	}

	.tui-header-bg {
		position: relative;
		height: 267rpx;
		background: rgb(147, 224, 231);
		background: linear-gradient(0deg, rgba(147, 224, 231, 1) 0%, rgba(31, 142, 214, 1) 100%);
		border-bottom-left-radius: 42rpx;
		border-bottom-right-radius: 42rpx;

		.tui-header-slide {
			position: absolute;
			z-index: 999;
			margin: 0 4%;

			swiper {
				width: 688rpx;
				height: 246rpx;
				margin: 0 auto;

				.swiper-item {
					border-radius: 48rpx;
					height: 100%;
					overflow: hidden;

					/* fallback for old browsers */
					// /* Chrome 10-25, Safari 5.1-6 */
					// /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}

	.card-wrap {
		position: relative;
		height: 48%;
		min-height: 300px;
		margin: 0 4%;
		box-sizing: border-box;

		.nodata-img {
			image {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.small-text {
			display: inline-block;
			margin: 20rpx auto;
			color: #B0B3B7;
		}

		.device-info {
			.device-icon {
				width: 100rpx;
				height: 120rpx;
				margin-right: 20rpx;
			}

			.icon {
				width: 48rpx;
				height: 48rpx;
			}

			.surplus {
				font-size: 48px;
			}

			.meter-info {
				width: 560rpx;
				border-radius: 30rpx;
				background-color: #F8F8F8;
				margin-bottom: 20rpx;

				.meter-info-item {
					margin: 10rpx 0;

					.title-text {
						color: var(--xui-text-color-grey);
						font-size: 18px;
					}
				}
			}
		}

		xui-card.card {
			position: relative;
		}
	}
</style>