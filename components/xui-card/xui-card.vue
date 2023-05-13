<template>
	<view class="card"
		:style="{'border-radius':borderRadius+'rpx','box-shadow':'0px 2px 4px rgba(0, 0, 0, 0.1)','padding':padding}"
		:hover-class="hover ? 'card-hover' : ''" :hover-stay-time="150">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			borderRadius: {
				type: Number,
				default: 40
			},
			//是否有点击效果
			hover: {
				type: Boolean,
				default: true
			},
			//是否需要阴影
			shadow: {
				type: Boolean,
				default: false
			},
			padding: {
				type: String,
				default: '28rpx'
			}
		},
		computed: {
			cardStyle() {
				return {
					borderRadius: `${this.borderRadius}rpx`,
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.card {
		box-sizing: border-box;
		background-color: white;
		// box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
		// padding: 28rpx;
		margin: 20rpx 0;
	}

	.card-hover {
		background-color: #F7F7F7 !important;
	}
</style>