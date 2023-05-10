<template>
	<view class="container relative">
		<view class="filter-section flex items-center justify-between">
			<view class="selector flex items-center" @tap="showPicker">
				<text>{{currentYear}}年</text>
				<text>{{currentMonth}}月</text>
				<tui-icon name="turningdown" class="transition" :class="{'tui-animation-show':show}"></tui-icon>
			</view>
			<view class="total flex items-center">
				<tui-tag type="warning" padding="12rpx">收入</tui-tag>
				<text>￥100.00</text>
			</view>
		</view>
		<view>
			<tui-list-view v-if="data.length">
				<block v-for="item in 5" :key="item">
					<tui-list-cell :arrow="false">
						<view class="flex items-center justify-between">
							<view class="flex items-center">
								<text class="inline-block text-gray text-lg mr-20">{{item}}</text>
								<view class="icon">
									<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-wodexinxi"
										color="#27AE60"></tui-icon>
								</view>
								<view class="detail flex flex-col">
									<text class="title-text">深蓝工业园4#201</text>
								</view>
							</view>
							
							<view class="flex items-center">
								<text class="text-bold text-lg">￥0</text>
								<tui-icon name="arrowright"></tui-icon>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</tui-list-view>
			<block v-else>
				<view class="empty-view flex h-full flex-col items-center justify-center">
					<view class="empty-content">
						<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
						<text class="small-text">没有提现记录</text>
					</view>
				</view>
			</block>
		</view>

		<tui-datetime :type="3" ref="dateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	import emptyImages from '@/static/emptyImage.js';
	export default {
		data() {
			return {
				defaultEmptyImage: emptyImages.data,
				show: false,
				currentYear: String(new Date().getFullYear()),
				currentMonth: String(new Date().getMonth() + 1).length > 1 ? String(new Date().getMonth() + 1) : 0 +
					String(new Date().getMonth() + 1),
				data: [1]
			}
		},
		onLoad(params) {
			const index = Number(params.index)
			if (!index) {
				uni.setNavigationBarTitle({
					title: "收入月排行榜"
				})
			} else {
				uni.setNavigationBarTitle({
					title: "收入年排行榜"
				})
			}
		},
		methods: {
			showPicker(e) {
				this.$refs.dateTime.show();
				this.show = true
			},
			change(e) {
				//选择的结果
				console.log(e);
				this.currentYear = e.year
				this.currentMonth = e.month
				this.show = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.filter-section {
		margin: 0 4%;
	}

	.empty-view {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		.empty-content {
			margin: auto;
			display: flex;
			align-items: center;
			flex-direction: column;

			.empty-image {
				width: 400rpx;
				height: 400rpx;
			}

			.empty-text {
				color: #606266;
				margin-top: 20rpx;
			}
		}
	}
</style>