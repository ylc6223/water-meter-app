<template>
	<view class="container relative">
		<view class="filter-section flex items-center justify-between">
			<view class="selector flex items-center" @tap="showPicker">
				<text>{{currentYear}}年</text>
				<text>{{currentMonth}}月</text>
				<tui-icon name="turningdown" class="transition" :class="{'tui-animation-show':show}"></tui-icon>
			</view>
			<view class="total">
			</view>
		</view>
		<view>
			<tui-list-view v-if="data.length">
				<block v-for="item in 5" :key="item">
					<tui-list-cell :arrow="false">
						<view class="flex items-center justify-between">
							<view class="flex items-center">
								<view class="icon">
									<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-shui"
										color="#1296DB"></tui-icon>
								</view>
								<view class="detail flex flex-col">
									<text class="title-text">总用水量</text>
									<text class="sub-title-text">剩余水量33.34m³</text>
								</view>
							</view>
							<view class="number flex flex-col items-end ">
								<text class="additional-text">0.2m³</text>
								<text class="sub-title-text">04月25日16:18</text>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</tui-list-view>
			<block v-else>
				<view class="empty-view flex h-full flex-col items-center justify-center">
					<view class="empty-content">
						<image class="empty-image" :src="emptyImage || defaultEmptyImage" mode=""></image>
						<text class="small-text">没有抄表记录</text>
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

	.additional-text {
		font-size: var(--xui-font-size-xl);
		font-weight: 500;
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