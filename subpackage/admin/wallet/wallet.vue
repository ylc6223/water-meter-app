<template>
	<view class="container relative">
		<tui-notice-bar isLeft size="32" backgroundColor="#F7E5D5" color="#EB0909" class="text-center"
			:padding="['20rpx','30rpx']" single content="收款安全升级，绑定银行卡每日自动到账">
			<template v-slot:left>
				<view class="tui-padding">
					<tui-icon name="news-fill" :size="48" unit="rpx" color="#f54f46"></tui-icon>
				</view>
			</template>
		</tui-notice-bar>
		<tui-wing-blank size="large">
			<view class="link" @tap="viewCash">
				<text>明细</text>
				<tui-icon name="arrowright"></tui-icon>
			</view>
		</tui-wing-blank>
		<view class="content">
			<tui-icon class="my-30" custom-prefix="tui-icon__extend" name=".icon-renminbi2" color="#FEC200" unit="rpx"
				size="108"></tui-icon>
			<text class="my-30 block text-gray">钱包余额</text>
			<view class="money">
				<text class="text-lg unit">￥</text>
				<text class="amount">0.00</text>
			</view>
			<tui-tag type="gray" shape="circle" class="flex items-center">
				<tui-icon name="shield" unit="rpx" size="40" color="#27AE60"></tui-icon>
				<text class="text-base">保障中</text>
			</tui-tag>
		</view>
		<view class="cashbtn">
			<tui-button shape="circle" type="green" disabled>立即提现</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {
					msg: '一般消息提示~',
				}
			};
		},
		methods: {
			//查看提现记录
			viewCash() {
				uni.navigateTo({
					url: "../cash-history/cash-history"
				})
			}
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		overflow: hidden;
	}

	.link {
		display: flex;
		align-items: center;
		float: right;
		padding: 40rpx 0;
		font-weight: bold;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;

		.money {
			.unit {
				vertical-align: top;
			}

			.amount {
				font-size: 96rpx;
			}
		}
	}

	.cashbtn {
		position: absolute;
		left: 30%;
		right: 30%;
		padding-bottom: 100rpx;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
	}
</style>