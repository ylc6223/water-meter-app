<template>
	<view class="container relative">
		<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent
			color="#333" title="设备列表">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view :style="{marginTop:navigationBarHeight+'px'}">
			<view v-if="!userInfo" class="w-full h-full flex flex-col items-center justify-center">
				<view class="mx-auto flex items-center flex-col">
					<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
					<text class="small-text">没有历史设备</text>
				</view>
			</view>
			<tui-wing-blank v-else size="large">
				<view @click="toggleDevice">
					<block v-for="item in 3" :key="item">
						<tui-slide-view class="block mt-20" :buttons="buttons" @click.stop="handleClick">
							<view class="tui-list-cell">
								<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-shui"
									color="#2A96D8"></tui-icon>
								<view class="w-80p">
									<text class="block">深蓝工业园4#201</text>
									<view class="flex items-center">
										<tui-icon size="24" custom-prefix="tui-icon__extend" name=".icon-shui"
											color="#2A96D8"></tui-icon>
										<text>剩余水量30m³</text>
									</view>
								</view>
								<tui-icon name="ellipsis"></tui-icon>
							</view>
						</tui-slide-view>
					</block>
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
				buttons: [{
					text: '删除',
					color: '#fff',
					background: '#FA5151'
				}],
				role: '', //当前角色,
			}
		},
		computed: {
			...mapState(["tabBarIndex", "tabBar", "isLogin", "userInfo"]),
			...mapGetters(["isEmpower"])
		},
		onLoad() {
			uni.hideTabBar()
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
		}
	}
</script>

<style lang="scss" scoped>
	.empty-image {
		width: 400rpx;
		height: 400rpx;
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

	.tui-padding {
		width: 100%;
		padding: 0 25rpx;
		box-sizing: border-box;
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
				border-radius: 48rpx;
				overflow: hidden;
			}
		}
	}
</style>