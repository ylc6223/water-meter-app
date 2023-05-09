<template>
	<view class="container relative">
		<block v-if="role==='consumer'">
			<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent
				color="#333" title="设备列表">
				<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
				<!-- #endif -->
			</tui-navigation-bar>
			<view :style="{marginTop:navigationBarHeight+'px'}">
				<view v-if="!userInfo" class="empty-view flex h-full flex-col items-center justify-center">
					<view class="empty-content">
						<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
						<text class="small-text">没有历史设备</text>
					</view>
				</view>
				<tui-wing-blank v-else size="large">
					<view @click="toggleDevice">
						<block v-for="item in 3" :key="item">
							<tui-slide-view class="device-item" :buttons="buttons" @click.stop="handleClick">
								<view class="tui-list-cell flex items-center">
									<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-shui"
										color="#2A96D8"></tui-icon>
									<view class="device-item-content">
										<text class="block title-text">深蓝工业园4#201</text>
										<view class="flex items-center">
											<tui-icon size="24" custom-prefix="tui-icon__extend" name=".icon-shui"
												color="#2A96D8"></tui-icon>
											<text class="sub-title-text">剩余水量30m³</text>
										</view>
									</view>
									<tui-icon name="ellipsis"></tui-icon>
								</view>
							</tui-slide-view>
						</block>
					</view>
				</tui-wing-blank>
			</view>
		</block>
		<block v-if="role==='admin'">
			<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent isFixed
				isCustom color="#FFF" title="">
				<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
				<template>
					<tui-wing-blank size="large">
						<tui-tab :leftGap="30" :size="40" backgroundColor="#FFFFFF000" selectedColor="#000"
							sliderBgColor="#27AE60" bold :tabs="tabs" scroll @change="change"></tui-tab>
					</tui-wing-blank>
				</template>
				<!-- #endif -->
			</tui-navigation-bar>
			<view :style="{marginTop:`calc(${navigationBarHeight}px + 20rpx)`}">
				<tui-wing-blank size="large" class="relative">
					<swiper class="swiper" circular :indicator-dots="true" indicator-color="#FFF"
						indicator-active-color="#07C160" :autoplay="true">
						<swiper-item v-for="(banner,index) in banners" :key="index">
							<view class="swiper-item">
								<image :src="banner.url"></image>
							</view>
						</swiper-item>
					</swiper>
					<xui-card :hover="false">
						<view class="flex items-center justify-between">
							<view class="flex items-center">
								<text>2023年</text>
								<text>05月</text>
								<tui-icon name="calendar"></tui-icon>
							</view>
							<view class="flex items-center">
								<text>明细</text>
								<tui-icon name="arrowright"></tui-icon>
							</view>
						</view>
						<view class="">
							<tui-charts-line ref="tui_line_1" tooltip :xAxis="options1.xAxis" :yAxisLine="options1.yAxisLine" :yAxisLabel="options1.yAxisLabel"
								:dataset="options1.dataset" :max="options1.max" :splitLine="options1.splitLine" :splitNumber="options1.splitNumber"
								@click="dotClick"></tui-charts-line>
						</view>
					</xui-card>
				</tui-wing-blank>
			</view>
		</block>
		<tui-tabbar zIndex="8999"></tui-tabbar>
	</view>
</template>

<script>
	import emptyImages from '@/static/emptyImage.js';
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				navigationBarHeight: 0, //导航栏高度
				defaultEmptyImage: emptyImages.data,
				buttons: [{
					text: '删除',
					color: '#fff',
					background: '#FA5151'
				}],
				role: '', //当前角色,
				tabs: ['月收入', '年收入'],
				banners: [{
						url: '../../static/imgs/banner3.png'
					},
					{
						url: '../../static/imgs/banner4.png'
					}
				],
				options1: {
					xAxis: ['一月', '二月', '三月', '四月', '五月', '六月'],
					dataset: [{
						name: '营业额',
						color: '#5677fc',
						source: [380, 210, 0, 160, 30, 0],
					}],
					max: 600,
					splitNumber: 100,
					splitLine: {
						color: "transparent",
						type: "dashed"
					},
					yAxisLine:{color: 'transparent',itemGap: 60},
					yAxisLabel:	{show: false,color: "#333",size: 24},
				},
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "isLogin", "userInfo"]),
			...mapGetters(["isEmpower"])
		},
		onLoad() {
			uni.hideTabBar()
			this.resetTabBarIndex()
		},
		onShow() {
			const that = this
			//判断当前角色显示不同内容
			this.role = uni.getStorageSync('role') || 'consumer'
			const userInfo = that.userInfo || that.$g.tui.getUserInfo()
			if (this.role === 'admin') {
				uni.setNavigationBarTitle({
					title: ''
				})
			}
		},
		//绘制图表
		onReady() {
			this.$refs.tui_line_1 && (this.$refs.tui_line_1.draw(this.options1.dataset))
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
			handleClick(e) {
				let index = Number(e.index)
				if (!index) {
					this.$g.tui.modal({
						title: "删除设备",
						content: '确认要删除设备吗',
						callback: (flag) => {
							if (flag) {}
						}
					})
				}
			},
			toggleDevice() {
				this.$g.tui.modal({
					title: "切换设备",
					content: '确认要切换到所选设备吗',
					callback: (flag) => {
						if (flag) {}
					}
				})
			},
			dotClick() {

			},
			change(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.tui-list-cell {
		width: 100%;
		height: 120rpx;
		padding: 0 30rpx;
		border-radius: 30rpx;
		box-sizing: border-box;
		background-color: #fff;
		display: flex;
		align-items: center;
	}

	.tui-image__cell {
		height: 120rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.tui-img__menu {
		margin-top: 30rpx;
		overflow: hidden;
	}

	.tui-padding {
		width: 100%;
		padding: 0 25rpx;
		box-sizing: border-box;
	}

	.device-item {
		display: block;
		margin-top: 20rpx;
	}

	.device-item-content {
		width: 80%;
	}

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
</style>