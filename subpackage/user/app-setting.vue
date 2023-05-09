<template>
	<view class="container relative">
		<view class="content">
			<xui-card>
				<view class="flex items-center justify-between" @click="aboutus">
					<view class="flex items-center">
						<tui-icon name="about" class="mr-20"></tui-icon>
						<text class="inline-block text-lg">关于</text>
					</view>
					<tui-icon name="arrowright"></tui-icon>
				</view>
			</xui-card>
			<xui-card>
				<view class="flex items-center justify-between">
					<view class="flex items-center">
						<tui-icon name="setup"></tui-icon>
						<text class="text-lg">当前版本</text>
					</view>
					<text class="mr-20 text-lg text-gray">V0.0.1</text>
				</view>
			</xui-card>
			<view class="signup-btn">
				<tui-button shape="circle" plain type="black" @tap="logoutDialog=true">退出登录</tui-button>
			</view>
		</view>
		<tui-dialog :buttons="buttons" :show="logoutDialog" title="是否退出登录" @close="close" @click="buttonTap">
		</tui-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				logoutDialog: false,
				//包含确定和取消按钮
				buttons: [{
					text: '取消'
				}, {
					text: '确定',
					color: '#586c94'
				}]
			}
		},
		methods: {
			close() {
				this.logoutDialog = false
			},
			buttonTap({
				index,
				item
			}) {
				if (!index) {
					this.logoutDialog = false
					return
				}
				//sava handle
				this.logoutDialog = false
			},
			aboutus(){
				uni.navigateTo({
					url:'./aboutus'
				})
			}
		},
		onLoad() {}
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: 100vh;
		overflow: hidden;
	}

	.content {
		margin: 15rpx 0;
		padding: 0 4%;

		::v-deep xui-card:first-child .card {}

		xui-card.controls {}
	}

	.signup-btn {
		position: absolute;
		left: 4%;
		right: 4%;
		padding-bottom: 30rpx;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
	}
</style>