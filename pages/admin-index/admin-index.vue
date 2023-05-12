<template>
	<view class="container relative bg-gray">
		<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent isCustom
			color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<template>
				<view class="navigation-bar relative flex items-center" :style="{'height':titleBarHeight+'px'}">
					<view class="logo">
						<tui-icon name="people" color="#07C160"></tui-icon>
					</view>
					<text>水表管理大师</text>
				</view>
			</template>
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="page-header">
			<view class="page-header-searchbar relative flex items-center justify-between mx-30"
				:style="{'top':navigationBarHeight +'px'}">
				<xui-search @search="search" inputBgColor="#FFFFFF000" backgroundColor="#FFFFFF000"></xui-search>
				<view class="page-header-btns flex flex-1 justify-end">
					<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-liebiao" color="#333"
						@tap="scanCode"></tui-icon>
					<tui-icon custom-prefix="tui-icon__extend" name=".icon-saoma" color="#333"
						@tap="scanCode"></tui-icon>
				</view>
			</view>
		</view>

		<view :style="{top:`calc(${navigationBarHeight}px + 80rpx)`}" class="page-content relative border-box">
			<view class="page-content-header flex justify-between items-center">
				<view class="overflow-hidden">
					<tui-tab scroll backgroundColor="#FFFFFF000" :tabs="tabs" :size="30" bold color="#999"
						selectedColor="#07c160" sliderBgColor="#07c160"></tui-tab>
				</view>
				<view class="page-content-header-btn border-box pr-30">
					<tui-icon custom-prefix="tui-icon__extend" name=".icon-shebeiguanli" color="#333"></tui-icon>
				</view>
			</view>
			<view class="flex items-center overflow-hidden"
				:style="{height:`calc(100vh - ${navigationBarHeight}px - 100rpx - 80rpx - ${tabbarHeight} - ${safeAreaHeight}px)`}">
				<view class="flex flex-col items-center w-full" v-if="showEmpty">
					<view class="w-full h-full flex items-center justify-center">
						<view class="mx-auto flex items-center flex-col">
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
					<view class="relative mx-30 border-box">
						<xui-card class="w-full" v-for="item in 5" :key="item" @tap="toMeterDashboard">
							<view class="flex items-center">
								<image class="device-icon" src="../../static/icons/log.svg" mode=""></image>
								<view>
									<text class="block text-base">深蓝工业园4#201</text>
									<text class="block text-gray text-sm">蓝牙水表号:YM00232P0169</text>
								</view>
							</view>
							<view class="meter-info p-30 flex justify-between">
								<view class="meter-info-item flex flex-col items-center justify-between">
									<text>0.20</text>
									<text class="text-sm">总水量(m³)</text>
								</view>
								<view class="meter-info-item flex flex-col items-center justify-between">
									<text>33.34</text>
									<text class="text-sm">剩余水量</text>
								</view>
								<view class="meter-info-item flex flex-col items-center justify-between">
									<text>3</text>
									<text class="text-sm">单价(元/m³)</text>
								</view>
							</view>
						</xui-card>
					</view>

				</view>
			</view>
		</view>
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
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				screenHeight: 0, //屏幕高度
				safeAreaHeight: 0, //底部安全区高度
				tabbarHeight: '100rpx',
				role: '', //当前角色
				scanPromise: null,
				tabs: ['全部', 'A组', 'B组', 'C组', 'D组', 'E组', 'F组', 'G组', 'H组'],
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

			//管理员首页搜索框
			search(keyword) {

			},

			//扫码
			scanCode() {
				//添加蓝牙水表，并尝试使用蓝牙
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
		}
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
	}

	.bg-gray {
		background: rgb(232, 241, 253);
		background: linear-gradient(180deg, rgba(232, 241, 253, 1) 0%, rgba(245, 246, 247, 1) 100%);
	}

	.navigation-bar {
		.logo {
			width: 64rpx;
			height: 64rpx;
			margin-left: 30rpx;
		}
	}

	.page-header {
		position: absolute;
		left: 0;
		right: 0;
		height: 267rpx;
	}

	.page-content {
		.page-content-header-btn {
			width: 120rpx;
		}

		.empty-image {
			width: 400rpx;
			height: 400rpx;
		}

		.empty-text {
			color: #606266;
			margin-top: 20rpx;
		}

		.device-icon {
			width: 100rpx;
			height: 120rpx;
			margin-right: 20rpx;
		}

		.meter-info {
			max-width: 560rpx;
			border-radius: 30rpx;
			background-color: #F8F8F8;
			margin-bottom: 20rpx;
			background: rgb(232, 241, 253);
			background: linear-gradient(90deg, rgba(232, 241, 253, 1) 0%, rgba(238, 243, 250, 1) 49%, rgba(245, 245, 247, 1) 100%);

			.meter-info-item {
				margin: 10rpx 0;
			}
		}
	}
</style>