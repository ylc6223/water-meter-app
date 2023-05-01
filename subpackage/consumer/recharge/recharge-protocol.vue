<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" @change="opacityChange" :scrollTop="91" title="充值协议"
			backgroundColor="#fff" :isOpacity="false" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<view class="tui-header-icon" :style="{ marginTop: top + 'px' }"><tui-icon name="arrowleft" color="#333"
					@click="back"></tui-icon></view>
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="content" :style="{'margin-top':navbarHeight+'px'}">
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				top: 0, //标题图标距离顶部距离
				scrollTop: 0.5,
				navbarHeight: 0
			}
		},
		methods: {
			initNavigation(e) {
				this.top = e.top;
				this.navbarHeight = e.height
			},
			opacityChange(e) {
				this.opacity = e.opacity;
			},
			back() {
				uni.navigateBack();
			}
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		width: 100vw;
		padding: 0;
		margin: 0;
		background-color: #FFF;
		// padding-bottom: 40rpx;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.container::-webkit-scrollbar {
		display: none;
	}

	.content {
		// min-height: 100vh;
	}

	.tui-header-icon {
		width: 100%;
		position: fixed;
		top: 0;
		padding: 0 12rpx;
		display: flex;
		align-items: center;
		height: 32px;
		transform: translateZ(0);
		z-index: 99999;
		box-sizing: border-box;
	}
</style>