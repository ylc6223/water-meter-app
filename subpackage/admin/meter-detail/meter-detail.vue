<template>
	<view class="container relative">
		<view class="content">
			<xui-card :hover="false">
				<tui-list-view unlined="all">
					<tui-list-cell arrow unlined @click="handleClick">
						<view class="flex items-center justify-between">
							<text class="text-lg">安装位置</text>
							<text class="mr-4p text-lg text-gray">{{position}}</text>
						</view>
					</tui-list-cell>
					<tui-list-cell unlined>
						<view class="flex items-center justify-between">
							<text class="text-lg">S/N</text>
							<text class="mr-20 text-lg text-gray">YM00232P0169</text>
						</view>
					</tui-list-cell>
					<tui-list-cell unlined>
						<view class="flex items-center justify-between">
							<text class="text-lg">类型</text>
							<text class="mr-20 text-lg text-gray">蓝牙预付费水表</text>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</xui-card>
			<xui-card>
				<tui-list-view unlined="all">
					<tui-list-cell :hover="false" backgroundColor="#FFFFFF000" arrow unlined>
						<view class="flex items-center justify-between">
							<text class="text-lg">更换设备</text>
						</view>
					</tui-list-cell>
				</tui-list-view>
			</xui-card>
			<view class="delbtn">
				<tui-button shape="circle" plain type="black" @tap="delDialog=true">删除设备</tui-button>
			</view>
		</view>
		<tui-dialog :buttons="buttons" :show="dialog" title="安装位置" @close="close" @click="buttonTap">
			<template v-slot:content>
				<view class="my-15">
					<tui-input :labelWidth="0" v-model="position" inputBorder isFillet></tui-input>
				</view>
			</template>
		</tui-dialog>
		<tui-dialog :buttons="buttons" :show="delDialog" title="删除当前设备" @close="delClose" @click="delButtonTap">
		</tui-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				position: '深蓝工业园4#201',
				dialog: false, //修改安装位置弹窗
				delDialog: false, //修改安装位置弹窗
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
			handleClick() {
				this.dialog = true
			},
			close() {
				this.dialog = false
			},
			buttonTap({
				index,
				item
			}) {
				if (!index) {
					this.dialog = false
					return
				}
				//sava handle
				this.dialog = false
			},
			delClose() {
				this.delDialog = false
			},
			delButtonTap({
				index,
				item
			}) {
				if (!index) {
					this.delDialog = false
					return
				}
				//sava handle
				this.delDialog = false
			},
		}
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

	.delbtn {
		position: absolute;
		left: 4%;
		right: 4%;
		padding-bottom: 30rpx;
		bottom: constant(safe-area-inset-bottom);
		bottom: env(safe-area-inset-bottom);
	}
</style>