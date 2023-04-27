<template>
	<view class="container relative">
		<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent
			title="设备列表" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<tui-wing-blank size="large">
			<view :style="{'margin-top':navigationBarHeight+'px'}" @click="toggleDevice">
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

		<!-- <xui-card></xui-card> -->
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
				navigationBarHeight: 0,
				buttons: [{
					text: '删除',
					color: '#fff',
					background: '#FA5151'
				}],
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
			initNavigation({
				width,
				height,
				left,
				top,
				statusBarHeight,
				opacity,
				windowHeight
			}) {
				this.navigationBarHeight = height
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	.device-item{
		display: block;
		margin-top: 20rpx;
	}
	.device-item-content {
		width: 80%;
	}
</style>