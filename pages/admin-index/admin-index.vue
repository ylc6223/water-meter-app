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
					<text>二师兄管家</text>
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
						@click="scanCode"></tui-icon>
					<tui-icon custom-prefix="tui-icon__extend" name=".icon-saoma" color="#333"
						@click="scanCode"></tui-icon>
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
				<view class="flex flex-col items-center w-full" v-if="!adminUserInfo">
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
				<!-- 已登录-->
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

		<tui-modal padding="30rpx 40rpx" :show="initSetShow" @cancel="initSetShow = false" :custom="true" fadeIn>
			<view class="flex flex-col">
				<view class="text-center text-black text-xl">预置设定</view>

				<tui-form ref="form">
					<text class="inline-block text-lg text-black p-20">安装地址</text>
					<view class="my-15">
						<tui-input padding="10rpx 20rpx" isFillet inputBorder v-model="form.address">
							<template v-slot:left>
								<view class="tui-left__icon">
									<tui-icon name="position" color="#333" :size="40" unit="rpx"></tui-icon>
								</view>
							</template>
						</tui-input>
					</view>
					<text class="inline-block text-lg text-black p-20">供应价格</text>
					<view class="my-15">
						<tui-input padding="10rpx 20rpx" isFillet inputBorder v-model="form.priceMoney">
							<template v-slot:left>
								<view class="tui-left__icon">
									<tui-icon name="coupon" color="#333" :size="40" unit="rpx"></tui-icon>
								</view>
							</template>
							<template v-slot:right>
								<text>人民币/吨</text>
							</template>
						</tui-input>
					</view>
				</tui-form>
				<view class="mt-20">
					<tui-button height="72rpx" :size="28" shape="circle" type="green"
						@click="commitPreSet">保存</tui-button>
				</view>
			</view>
		</tui-modal>
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import emptyImages from '@/static/emptyImage.js';
	import {
		getQueryString
	} from "@/utils/util.js"
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	import {
		meterInfo,
		meterPreset
	} from "@/api/meter/index.js"
	// 校验规则
	const rules = [{
		name: "address",
		rule: ["required"],
		msg: ["请输入安装地址"]
	}, {
		name: "priceMoney",
		rule: ["required", "isAmount"],
		msg: ["请输入金额", "金额允许保留两位小数"]
	}]
	export default {
		data() {
			return {
				options: {
					//注意：小程序端需确保域名已授权访问
					path: 'https://assets2.lottiefiles.com/packages/lf20_zbui4bnx.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				screenHeight: 0, //屏幕高度
				safeAreaHeight: 0, //底部安全区高度
				tabbarHeight: '100rpx',
				role: '', //当前角色
				scanPromise: null,
				tabs: ['全部', 'A组', 'B组', 'C组', 'D组', 'E组', 'F组', 'G组', 'H组'],
				showModal: false, //控制对话框显示隐藏
				defaultEmptyImage: emptyImages.data,
				showEmpty: true, // 默认显示空数据，未登录为true，
				meterInfo: '',
				initSetShow: false,
				form: {
					meterNo: "",
					userName: "",
					address: "",
					priceID: '',
					priceMoney: ''
				}
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "adminUserInfo"]),
			...mapGetters(["isEmpower"])
		},
		async onLoad(query) {
			// const q = decodeURIComponent(query.q) // 获取到二维码原始链接内容
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
		async onShow() {
			const that = this
			const adminUserInfo = that.adminUserInfo || uni.getStorageSync('adminUserInfo')
			try {
				//检查管理员登录状态
				if (!adminUserInfo) {
					this.showEmpty = true
					return
				}
				//管理员已登录但未扫二维码
				else if (adminUserInfo && !that.scanPromise) {
					return
				}
				//管理员已登录且扫了二维码
				else {
					const meterNo = await that.scanPromise
					this.form.meterNo = meterNo
					//携带表号查询表信息
					that.meterInfo = await that.getMeterInfo(meterNo)
					//检查二维码对应的表是否已完成初始化设定
					const initState = that.checkMeterInitState();
					!(initState) && (that.initSetShow = true)
				}
			} catch (e) {}
		},
		methods: {
			...mapMutations(["changeTabBar", "resetTabBarIndex", "setAdminUserInfo"]),
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
				const that = this
				that.scanPromise = new Promise((resolve, reject) => {
					function scanCallback(res) {
						if (res) {
							//对二维码携带的表号进行截取
							// const meterNo = getQueryString(res.result, 'meterNo')
							const meterNo = "ZR000000000003"
							resolve(meterNo);
						}
					}
					// 将扫码回调函数作为参数传递给扫码 API
					uni.scanCode({
						scanType: [
							'qrCode'
						],
						success: scanCallback,
						fail: () => {
							reject('扫码失败')
						},
					});
				})
			},
			//去登录
			navToLogin() {
				this.showModal = false
				uni.reLaunch({
					url: "../../subpackage/user/login",
					fail(e) {
						console.log(e);
					}
				})
			},
			//获取表信息
			getMeterInfo(meterNo) {
				return new Promise((resolve, reject) => {
					meterInfo(meterNo).then(res => {
						resolve(res.result)
					}).catch(e => {
						reject(e)
					})
				})
			},
			//检查当前二维码对应的表初始化设置
			checkMeterInitState() {
				const that = this
				let initState;
				if (!this.meterInfo) {
					console.log('不是扫码进来的');
					//不是扫码进来的
					return
				}
				//管理员有无完成初始化设定
				if (!this.meterInfo.roomText && !this.meterInfo.price) {
					initState = false
					console.log("未完成初始化设定,请使用管理员账户进行初始化");
					return initState
				}
				//已完成，管理员什么也不用做
				else {
					initState = true
					return initState
				}
			},
			//查看水表对应详情
			toMeterDashboard(id = 1) {
				uni.navigateTo({
					url: `../../subpackage/admin/meter-page/meter-page?${id}`
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
			//发现蓝牙水表模块回调
			bleFoundCallback(devices) {
				//devices 被搜寻到的符合条件的设备组成的数组
				console.log(devices, "搜寻到的设备");
			},
			//管理员提交预设
			commitPreSet() {
				const that = this
				that.$refs.form.validate(that.form, rules).then(res => {
					that.$g.tui.toast({
						text: "校验通过"
					})
					that.$g.tui.showLoading()
					meterPreset(that.form).then(res => {
						console.log(res);
						uni.hideLoading()
					})
				}).catch(errors => {
					console.log(errors)
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