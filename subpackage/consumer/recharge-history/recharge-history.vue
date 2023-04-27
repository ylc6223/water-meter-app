<template>
	<view class="container relative">
		<view class="filter-section flex items-center justify-between">
			<view class="selector flex items-center" @tap="showPicker">
				<text>{{currentYear}}年</text>
				<text>{{currentMonth}}月</text>
				<tui-icon name="turningdown" class="transition" :class="{'tui-animation-show':show}"></tui-icon>
			</view>
			<view class="total">
				<text>支出￥100.00</text>
			</view>
		</view>
		<view>
			<tui-list-view v-if="data.length">
				<block v-for="item in 5" :key="item">
					<tui-list-cell :arrow="false">
						<view class="flex items-center justify-between">
							<view class="flex items-center">
								<view class="icon">
									<tui-icon class="mr-20" custom-prefix="tui-icon__extend" name=".icon-wodexinxi"
										color="#27AE60"></tui-icon>
								</view>
								<view class="detail flex flex-col">
									<text class="title-text">管理员支付</text>
									<text class="sub-title-text">04月25日16:18</text>
								</view>
							</view>
							<view class="number flex items-center ">
								<text class="additional-text">-50.00</text>
							</view>
						</view>
					</tui-list-cell>
				</block>
			</tui-list-view>
			<view v-else>
				<tui-no-data imgUrl="/static/imgs/nodata.png">没有缴费记录</tui-no-data>
			</view>
		</view>

		<tui-datetime :type="3" ref="dateTime" @confirm="change"></tui-datetime>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
		font-size: var(--xui-font-size-2xl);
		font-weight: 500;
	}
</style>