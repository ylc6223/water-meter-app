<template>
	<view class="container relative">
		<tui-wing-blank size="large">
			<view class="notice-bar">
				<view class="flex items-center justify-center">
					<text>缴费收入将直接进入收款账户,请谨慎填写</text>
				</view>
			</view>
			<view>
				<xui-card :hover="false" @tap="primaryAccount">
					<view class="pl-30">
						<view class="my-30 flex flex-col">
							<text class="block text-2xl text-bold text-white">个人用户</text>
							<text class="block text-white">拥有个人银行卡</text>
						</view>
					</view>
				</xui-card>
				<xui-card :hover="false" @tap="publicAccount">
					<view class="pl-30">
						<view class="my-30 flex flex-col">
							<text class="block text-2xl text-bold text-white">企业用户</text>
							<text class="block text-white">拥有对公账号和营业执照</text>
						</view>
					</view>
				</xui-card>
			</view>
		</tui-wing-blank>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				primary:[],
				public:[]
			};
		},
		methods: {
			primaryAccount(){
				//未绑定任何账户
				if(!this.primary.length){
					uni.navigateTo({
						url:"../bind-card/bind-card"
					})
				}
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

	.notice-bar {
		background-color: #F7E5D5;
		color: var(--thorui-color-error);
		font-size: var(--thorui-font-size-base);
		padding: 20rpx;
		border-radius: 20rpx;
	}

	::v-deep xui-card:nth-child(1) .card {
		background-color: #A2D8B9;
	}

	::v-deep xui-card:nth-child(2) .card {
		background-color: #7D94E7;
	}
</style>