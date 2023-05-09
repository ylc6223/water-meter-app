<template>
	<view class="container relative">
		<view class="content">
			<view class="flex flex-col items-center justify-center">
				<image class="image" src="../../static/imgs/qrcode.jpg" mode=""></image>
				<view class="my-30">
					<text class="inline-block text-base">{{name}}</text>
					<text class="inline-block text-sm text-gray">({{version}})</text>
				</view>
			</view>
			<xui-card :hover="false">
				<view class="my-30 flex items-center justify-between">
					<text class="inline-block text-lg">服务协议</text>
					<tui-icon name="arrowright"></tui-icon>
				</view>
				<view class="my-30 flex items-center justify-between">
					<text class="inline-block text-lg">隐私政策</text>
					<tui-icon name="arrowright"></tui-icon>
				</view>
			</xui-card>
			<tui-footer copyright="Copyright © 2008-2023 XFAB."></tui-footer>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '水表智能管家',
				version:'v0.0.1'
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		overflow: hidden;
		background-color: #F6F6F6;
	}

	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		margin: 15rpx 0;
		padding: 0 4%;
		padding-top: 100rpx;
		::v-deep xui-card:first-child .card {}

		::v-deep xui-card {
			position: absolute;
			left: 4%;
			right: 4%;
			padding-bottom: 100rpx;
			bottom: constant(safe-area-inset-bottom);
			bottom: env(safe-area-inset-bottom);
		}
	}
	.image{
		width: 200rpx;
		height: 200rpx;
	}
</style>