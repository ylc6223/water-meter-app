<template>
	<view class="container relative">
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
				<view v-show="curTab===0">
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
						<view class="my-30">
							<view>
								<text class="block my-15 text-gray">本月合计收入</text>
								<view class="flex items-center">
									<text class="unit text-2xl">￥</text>
									<text class="amount">0.00</text>
								</view>
							</view>
							<tui-charts-line ref="tui_line_1" tooltip :xAxis="options1.xAxis"
								:yAxisLine="options1.yAxisLine" :yAxisLabel="options1.yAxisLabel"
								:dataset="options1.dataset" :max="options1.max" :splitLine="options1.splitLine"
								:splitNumber="options1.splitNumber" @click="dotClick"></tui-charts-line>
						</view>
					</xui-card>
					<xui-card :hover="false">
						<view class="flex items-center justify-between">
							<view class="flex items-center">
								<text class="text-bold">收入排行榜</text>
							</view>
							<view class="flex items-center" @tap="viewRanking(curTab,$event)">
								<text>全部排名</text>
								<tui-icon name="arrowright"></tui-icon>
							</view>
						</view>
					</xui-card>
				</view>

				<view v-show="curTab===1">


				</view>
			</tui-wing-blank>
		</view>
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
					yAxisLine: {
						color: 'transparent',
						itemGap: 60
					},
					yAxisLabel: {
						show: false,
						color: "#333",
						size: 24
					},
				},
				curTab: 0, //tab默认索引 0表示默认选中月收入
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "isLogin", "userInfo"]),
			...mapGetters(["isEmpower"])
		},
		onLoad() {
			uni.hideTabBar()
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

			//tab选项选中
			change({
				index
			}) {
				this.curTab = index
			},

			//折线图点击事件
			dotClick() {

			},

			//查看收入排行榜
			viewRanking(index, e) {
				uni.navigateTo({
					url: `../../subpackage/admin/income-rank/income-rank?index=${index}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
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
				border-radius: 48rpx;
				overflow: hidden;
			}
		}
	}

	.amount {
		font-size: 80rpx;
	}
</style>