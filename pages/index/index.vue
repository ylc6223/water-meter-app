<template>
	<view class="container relative" :class="{'admin-bg':role==='admin'}">
		<!-- 普通用户 -->
		<block v-if="role==='consumer'">
			<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent
				isCustom color="#FFF" title="水表管理大师">
				<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
				<template>
					<view class="navigation-bar flex items-center" :style="{'height':titleBarHeight+'px'}">
						<view class="ml-4p" @tap="scanCode">
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

			<view class="card-wrap"
				:style="{'top':`calc(${navigationBarHeight}px + 246rpx)`,'bottom':'0',height:`calc(100vh - ${navigationBarHeight}px - 246rpx - 100rpx - 40rpx - ${safeAreaHeight}px)`}">
				<xui-card :hover="false" :shadow="true">
					<view class="empty-view flex h-full flex-col items-center justify-center" v-if="!isBinding">
						<view class="empty-content">
							<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
							<text class="small-text">没有设备</text>
							<tui-form-button v-if="!userInfo" background="#07C160" radius="45rpx" width="300rpx"
								height="90rpx" color="#000" @click="showModal=true">
								<text class="text-white">授权登录</text>
							</tui-form-button>
							<tui-form-button v-else background="#07C160" radius="45rpx" width="300rpx" height="90rpx"
								color="#000" @click="scanCode">
								<text class="text-white">扫描设备二维码</text>
							</tui-form-button>
						</view>
					</view>
					<view v-else class="card-content-wrap flex flex-col justify-center">
						<view class="card-head flex items-center">
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

						<tui-button shape="circle" type="green" @tap="gotoPay">
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
						<tui-button height="72rpx" :size="28" shape="circle" type="green"
							@tap="empower">立即授权</tui-button>
					</view>
					<view @tap="showModal=false">
						<text class="text-gray">稍后再说</text>
					</view>
				</view>
			</tui-modal>

			<tui-modal :show="showTipModal" custom :maskClosable="true">
				<view class="flex flex-col items-center">
					<text class="block my-15 title-text">提示</text>
					<image class="qrcode" src="../../static/imgs/qrcode.jpg" mode=""></image>
					<text class="block my-15 title-text">首次充值需要扫描</text>
					<text class="block my-15 title-text">设备上的二维码,识别表号</text>
					<view class="w-full my-30">
						<tui-button height="72rpx" :size="28" shape="circle" type="green"
							@tap="showTipModal=false">知道了</tui-button>
					</view>
				</view>
			</tui-modal>

		</block>

		<!-- 管理员界面代码 -->
		<block v-if="role==='admin'">
			<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent
				isCustom color="#333">
				<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
				<template>
					<view class="navigation-bar flex items-center" :style="{'height':titleBarHeight+'px'}">
						<view class="logo ml-4p">
							<tui-icon name="people" color="#07C160"></tui-icon>
						</view>
						<text class="title-text">水表管理大师</text>
					</view>
				</template>
				<!-- #endif -->
			</tui-navigation-bar>
			<view class="header">
				<view class="header-searchbar relative flex items-center justify-between"
					:style="{'top':navigationBarHeight +'px'}">
					<xui-search @search="search" inputBgColor="#FFFFFF000" backgroundColor="#FFFFFF000"></xui-search>
					<view class="flex-1 flex justify-end">
						<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-liebiao" color="#333"
							@tap="scanCode"></tui-icon>
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-saoma" color="#333"
							@tap="scanCode"></tui-icon>
					</view>
				</view>
			</view>
			<view :style="{top:`calc(${navigationBarHeight}px + 80rpx)`}" class="relative border-box">
				<view class="flex items-center justify-between">
					<view class="tab">
						<tui-tab scroll backgroundColor="#FFFFFF000" :tabs="tabs" :size="30" bold color="#999"
							selectedColor="#07c160" sliderBgColor="#07c160"></tui-tab>
					</view>
					<view class="tab-btn">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shebeiguanli" color="#333"></tui-icon>
					</view>
				</view>
				<!-- <view class="tab-content flex items-center overflow-hidden" -->
				<view class="tab-content overflow-hidden flex items-center"
					:style="{height:`calc(100vh - ${navigationBarHeight}px - 100rpx - 80rpx - ${tabbarHeight} - ${safeAreaHeight}px)`}">
					<!-- <view v-for="item in 10" class="tab-content-item">
						{{item}}
					</view> -->
					<view class="w-full flex flex-col items-center" v-if="showEmpty">
						<view class="empty-view">
							<view class="empty-content">
								<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
								<text class="empty-text">没有设备,请先登录</text>
							</view>
						</view>
						<tui-form-button class="my-15" background="#07C160" radius="45rpx" width="300rpx" height="90rpx"
							color="#000" @click="navToLogin">
							<text class="text-white">立即登录</text>
						</tui-form-button>
					</view>
					<!-- 有设备 -->
					<view class="w-full h-full" style="overflow-y: scroll;" v-else>
						<view class="card-wrap">
							<xui-card class="card-content-wrap w-full" v-for="item in 5" :key="item"
								@tap="toMeterDashboard">
								<view class="card-head flex items-center">
									<image class="device-icon" src="../../static/icons/log.svg" mode=""></image>
									<view>
										<text class="block title-text">深蓝工业园4#201</text>
										<text class="block sub-title-text">蓝牙水表号:YM00232P0169</text>
									</view>
								</view>
								<view class="meter-info details p-30 flex justify-between">
									<view class="meter-info-item flex flex-col items-center justify-between">
										<text>0.20</text>
										<text class="sub-title-text">总水量(m³)</text>
									</view>
									<view class="meter-info-item flex flex-col items-center justify-between">
										<text>33.34</text>
										<text class="sub-title-text">剩余水量</text>
									</view>
									<view class="meter-info-item flex flex-col items-center justify-between">
										<text>3</text>
										<text class="sub-title-text">单价(元/m³)</text>
									</view>
								</view>
							</xui-card>
						</view>

					</view>
				</view>
			</view>
		</block>
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import emptyImages from '@/static/emptyImage.js';
	import Bluetooth from "@/utils/bluetooth/bluetoothManager.js"
	import {
		mapState,
		mapMutations,
		mapGetters
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
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				screenHeight: 0, //屏幕高度
				safeAreaHeight: 0, //底部安全区高度
				tabbarHeight: '100rpx',
				isBinding: false, //是否已绑定设备
				// isEmpower: false, //用户是否已授权
				showModal: false, //控制授权对话框显示隐藏
				showTipModal: false, //控制提示用户充值需扫码的显示隐藏

				banners: [{
						url: '../../static/imgs/banner.png'
					},
					{
						url: '../../static/imgs/banner1.png'
					}
				],
				contentHeight: 0,
				role: '', //当前角色
				scanPromise: null,
				//管理端data
				tabs: ['全部', 'A组', 'B组', 'C组', 'D组', 'E组', 'F组', 'G组', 'H组'],
				defaultEmptyImage: emptyImages.data,
				// showEmpty: true, // 是否显示空数据，未登录为true
				showEmpty: false, // 是否显示空数据，未登录为true
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "isLogin", "userInfo"]),
			...mapGetters(["isEmpower"])
		},
		onLoad() {
			uni.hideTabBar()
			this.resetTabBarIndex()
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
			//判断当前角色显示不同内容
			this.role = uni.getStorageSync('role') || 'consumer'
			const userInfo = that.userInfo || that.$g.tui.getUserInfo()
			try {
				if (this.role === 'consumer') {
					//检查授权状态
					if (!that.isEmpower && !userInfo) {
						//未授权要求授权
						this.showModal = true
					} else {
						//已授权情况下检查是否绑定了蓝牙设备
						if (!this.scanPromise) {
							return
						}
						this.scanPromise.then((result) => {
							if (result) {
								console.log('已成功绑定设备', result);
								!this.checkBindMeter() && (this.showTipModal = true)
							} else {
								console.log('未成功绑定设备');
							}
						}).catch((error) => {
							// 处理扫码失败的情况
							console.error(error);
						})
					}
				} else if (this.role === 'admin') {
					that.isLogin && (that.showEmpty = false)
				} else {

				}
			} catch (e) {}
		},
		methods: {
			...mapMutations(["changeTabBar", "resetTabBarIndex", "setLoginState", "setUserInfo"]),
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
				const that = this
				that.scanPromise = new Promise((resolve, reject) => {
					// 在扫码回调中执行 resolve 方法，表示扫码回调已完成
					function scanCallback(res) {
						if (res) {
							console.log(res, "扫码二维码");
							//扫到水表上的二维码,根据表号获取mac地址 连接对应的蓝牙
							//绑定设备
							uni.setStorageSync('bindDevice', {
								name: 'zeer'
							})
							//尝试申请使用蓝牙
							that.startBleAuth()
							const isBinding = true
							resolve(isBinding);
						}
					}
					// 将扫码回调函数作为参数传递给扫码 API
					uni.scanCode({
						scanType: [
							'qrCode'
						],
						success: scanCallback,
						fail: () => {
							uni.setStorageSync('bindDevice', '')
							reject('扫码失败')
						},
					});
				})
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
									that.setUserInfo(userInfo)
									uni.hideLoading()
									that.showModal = false
										//已授权情况下检查是否绑定了蓝牙设备,未绑将显示提示
										!that.checkBindMeter() && (that.showTipModal = true)

								}
							})
						} else {
							that.$g.tui.showLoading('登陆中')
							// 用户已经同意小程序获取用户信息，后续调用相关接口不会弹窗询问
							const userInfo = await that.getUserInfo()
							that.$g.tui.setUserInfo(userInfo)
							that.setUserInfo(userInfo)
							uni.hideLoading()
							that.showModal = false
								//已授权情况下检查是否绑定了蓝牙设备,未绑将显示提示
								!that.checkBindMeter() && (that.showTipModal = true)
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
			//尝试授权使用蓝牙，如先前已同意则静默开启蓝牙并连接
			startBleAuth() {
				const that = this
				uni.getSetting({
					success(res) {
						//蓝牙未授权
						if (!res.authSetting['scope.bluetooth']) {
							//要求授权并开启蓝牙
							uni.authorize({
								scope: 'scope.bluetooth',
								success() {
									//后续静默开启蓝牙并连接
									const bl = new Bluetooth()
									bl.initBluetoothAdapter(that.bleFoundCallback)
									//开启蓝牙通信
								}
							})
						} else {
							const bl = new Bluetooth()
							bl.initBluetoothAdapter(that.bleFoundCallback)
							//开启蓝牙通信
						}
					}
				})
			},
			//充值水费
			gotoPay() {
				uni.navigateTo({
					url: '../../subpackage/consumer/recharge/recharge'
				})
			},
			//发现蓝牙水表模块回调
			bleFoundCallback(devices) {
				//devices 被搜寻到的符合条件的设备组成的数组
				console.log(devices, "搜寻到的设备");
			},
			//检查当前是否绑定了水表
			checkBindMeter() {
				const isBinding = uni.getStorageSync('bindDevice') ? true : false
				this.isBinding = isBinding
				return isBinding
			},
			//管理员首页搜索框
			search(keyword) {

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
			//查看水表对应详情
			toMeterDashboard(id = 1) {
				uni.navigateTo({
					url: `../../subpackage/admin/meter-page/meter-page?${id}`
				})
			}
		},
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
	}

	.admin-bg {
		background: rgb(232, 241, 253);
		background: linear-gradient(180deg, rgba(232, 241, 253, 1) 0%, rgba(245, 246, 247, 1) 100%);
	}

	::v-deep tui-modal .tui-modal-box {
		// width: 80% !important;
	}

	.navigation-bar {
		position: relative;

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
		// position: relative;
		position: absolute;
		left: 0;
		right: 0;
		height: 267rpx;
		// background: rgb(147, 224, 231);
		// background: linear-gradient(0deg, rgba(147, 224, 231, 1) 0%, rgba(31, 142, 214, 1) 100%);
		background: rgb(185, 240, 208);
		background: linear-gradient(0deg, rgba(185, 240, 208, 1) 0%, rgba(49, 185, 106, 1) 100%);
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
				border-radius: 48rpx;
				overflow: hidden;
				.swiper-item {
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

		.card-content-wrap {
			.card-head {
				.device-icon {
					width: 100rpx;
					height: 120rpx;
					margin-right: 20rpx;
				}
			}

			.icon {
				width: 48rpx;
				height: 48rpx;
			}

			.surplus {
				font-size: 48px;
			}

			.meter-info {
				max-width: 560rpx;
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

				&.details {
					background: rgb(232, 241, 253);
					background: linear-gradient(90deg, rgba(232, 241, 253, 1) 0%, rgba(238, 243, 250, 1) 49%, rgba(245, 245, 247, 1) 100%);
				}
			}
		}

		xui-card {
			position: relative;
			height: 100%;
		}
	}

	image.qrcode {
		width: 250rpx;
		height: 250rpx;
	}

	//admin view style
	.logo {
		width: 64rpx;
		height: 64rpx;
	}

	.header {
		position: absolute;
		left: 0;
		right: 0;
		height: 267rpx;

		.header-searchbar {
			margin: 0 4%;
			// padding: 10rpx 0;
		}
	}

	.tab {
		overflow: hidden;
	}

	.tab-btn {
		box-sizing: border-box;
		padding-right: 4%;
		width: 120rpx;
	}

	.empty-view {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.empty-content {
			margin: auto;
			display: flex;
			align-items: center;
			flex-direction: column;

			.empty-image {
				width: 400rpx;
				height: 400rpx;
			}

			.empty-text {
				color: #606266;
				margin-top: 20rpx;
			}
		}
	}
</style>