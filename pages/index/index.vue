<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="head">
			<view class="tui-header-bg">
				<view class="title-bar flex items-center">
					<view class="scan">
						<tui-icon name="sweep" color="#FFF"></tui-icon>
					</view>
					<text class="nav-title text-white">水表管理大师</text>
				</view>
			</view>
			<view class="tui-header-slide">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="true" :interval="interval"
					:duration="duration">
					<swiper-item v-for="item in 1" :key="item">
						<view class="swiper-item"></view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="device-list">
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

					<tui-button class="paybtn" shape="circle" type="green">
						水表充值
					</tui-button>
				</view>
			</xui-card>
		</view>
		<tui-tabbar></tui-tabbar>
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
				nodevice: false, //未绑定设备

			}
		},
		created() {
			this.resetTabBarIndex()
		},
		onLoad() {
			uni.hideTabBar()
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
		},
		computed: mapState(["tabBarIndex", "tabBar"]),
	}
</script>

<style scoped lang="scss">
	.head {
		position: relative;
		height: 371rpx;
	}

	.tui-header-bg {
		height: 262rpx;
		background: rgb(147, 224, 231);
		background: linear-gradient(0deg, rgba(147, 224, 231, 1) 0%, rgba(31, 142, 214, 1) 100%);
		border-bottom-left-radius: 42rpx;
		border-bottom-right-radius: 42rpx;
	}

	.title-bar {
		position: relative;
		padding-top: 24px;

		.scan {
			margin-left: 4%;
		}

		.nav-title {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 20px;
			line-height: 1.5;
			font-weight: bold;
			text-align: center;
		}
	}

	.tui-header-slide {
		position: absolute;
		margin: 0 4%;
		bottom: -20rpx;

		swiper {
			width: 688rpx;
			margin: 0 auto;

			.swiper-item {
				border-radius: 48rpx;
				height: 246rpx;
				background: #2193b0;
				/* fallback for old browsers */
				// background: -webkit-linear-gradient(to bottom, #6dd5ed, #2193b0);
				// /* Chrome 10-25, Safari 5.1-6 */
				// background: linear-gradient(to bottom, #6dd5ed, #2193b0);
				// /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

			}
		}
	}

	.device-list {
		position: relative;
		height: calc(100vh - 371rpx - 55px);
		margin: 0 4%;

		::v-deep xui-card .card {
			position: absolute;
			box-sizing: border-box;
			top: 0;
			left: 0;
			right: 0;
			height: 94%;
		}

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
				margin-bottom: 40rpx;

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
		.paybtn{
			position: absolute;
			left: 0;
			right: 0;
			bottom: 30rpx;
			margin: 0 4%;
		}
	}
</style>