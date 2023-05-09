<template>
	<view class="container relative">
		<view class="content">
			<xui-card :hover="false" class="card-content-wrap w-full">
				<view class="card-head flex items-center justify-between">
					<image class="device-icon" src="../../../static/icons/log.svg" mode=""></image>
					<view>
						<text class="block text-white text-lg">正常启用中</text>
						<text class="block text-base text-gray">蓝牙水表号:YM00232P0169</text>
					</view>
					<view class="flex items-center justify-center flex-col" @tap="showPopup=true">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-gengduo" color="#FFF"></tui-icon>
						<text class="text-base text-white">更多</text>
					</view>
				</view>
				<view class="relative">
					<tui-lottie width="650" height="600" :options="options"></tui-lottie>
					<view class="meter-detail">
						<view class="h-full flex flex-col justify-center items-center">
							<text class="block text-base text-gray">剩余水量</text>
							<text class="block text-white" style="font-size: 96rpx;">33.34</text>
							<text class="block text-base text-gray">读取时间</text>
							<text class="block text-base text-gray">05-04&nbsp17:26</text>
						</view>
					</view>
				</view>
				<view class="flex items-center justify-evenly">
					<view>
						<text class="block text-white text-3xl">0.20</text>
						<text class="block text-gray">总水量(m³)</text>
					</view>
					<view>
						<view class="divide-line">|</view>
					</view>
					<view>
						<text class="block text-white text-3xl">3</text>
						<text class="block text-gray">单价(元/m³)</text>
					</view>
				</view>
			</xui-card>

			<xui-card :hover="false" class="controls">
				<view class="flex justify-between">
					<view class="flex flex-col justify-between items-center thorui-warning__color"
						@tap="valveDialog=true">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-zhiboguanbi" color="#ff7900"></tui-icon>
						<text>强制关闭</text>
					</view>
					<view class="flex flex-col justify-between items-center" @tap="showPricePopup=true">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shui" color="#2F97E9"></tui-icon>
						<text>单价</text>
					</view>
					<view class="flex flex-col justify-between items-center"
						@tap="gotoPage('../recharge/recharge',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-xiazai" color="#333"></tui-icon>
						<text>充值</text>
					</view>
					<view class="flex flex-col justify-between items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-zhuanfa" color="#333"></tui-icon>
						<text>分享</text>
					</view>
				</view>
			</xui-card>
		</view>

		<!-- 底部弹窗 -->
		<tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="showPopup" @close="maskTap">
			<view class="p-30">
				<view class="popup-header flex justify-center">
					<text class="text-xl">水表功能</text>
					<view class="closebtn" @tap="showPopup=false">
						<tui-icon name="shut" color="#999" unit="rpx" size="48"></tui-icon>
					</view>
				</view>
				<view class="menu-grid">
					<view class="menu-item flex flex-col justify-center items-center" @tap="readingMeter">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-bianji" color="#333"></tui-icon>
						<text>抄表</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../meter-detail/meter-detail',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shebei" color="#333"></tui-icon>
						<text>设备详情</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../meter-qrcode/meter-qrcode',$event)">
						<tui-icon name="qrcode" color="#333"></tui-icon>
						<text>二维码</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../meter-modify/meter-modify',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shuaxin" color="#333"></tui-icon>
						<text>修改底数</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center" @tap="meterReset">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shuaxin" color="#333"></tui-icon>
						<text>水量清零</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../../public/check-history',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>抄表记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../meter-reset/meter-reset',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>清零记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../../public/recharge-history',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>充值记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../usage-alert/usage-alert',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-tishi" color="#333"></tui-icon>
						<text>欠费提醒</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center"
						@tap="gotoPage('../usage-count/usage-count',$event)">
						<tui-icon name="histogram" color="#333"></tui-icon>
						<text>用水分析</text>
					</view>
				</view>
			</view>
		</tui-bottom-popup>

		<!-- 水价弹窗 -->
		<tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="showPricePopup" @close="priceMaskTap">
			<view class="price-controls">
				<view class="tui-form__box">
					<view class="tui-title text-xl">水量定价</view>
					<view class="tui-input__box" @tap="focus">
						<view class="tui-symbol">￥</view>
						<view class="tui-input">{{value}}</view>
						<view class="tui-cursor" v-if="cursor"></view>
					</view>
				</view>
				<tui-digital-keyboard buttonBackground="#27AE60" buttonText="确定" :show="true" :disabled="value==''"
					:isDecimal="true" @click="keyTap" @backspace="backspace" @confirm="confirm"></tui-digital-keyboard>
			</view>
		</tui-bottom-popup>

		<!-- 清零dialog -->
		<tui-dialog :buttons="clearButtons" :show="resetDialog" title="水表清零" @close="resetDialog = false"
			@click="resetButtonTap">
			<template v-slot:content>
				<text class="text-lg text-black">是否对当前设备进行剩余水量清零</text>
			</template>
		</tui-dialog>

		<!-- 关阀dialog -->
		<tui-dialog :buttons="valveButtons" :show="valveDialog" title="水表锁定" @close="valveDialog = false"
			@click="closeValvetButtonTap">
			<template v-slot:content>
				<text class="block text-lg text-black">是否对当前设备进行强制关阀?</text>
				<text class="block text-base text-red">强制关阀操作必须与设备保持连接状态</text>
			</template>
		</tui-dialog>

		<tui-tips ref="unConnectedTips" background-color="#EB0909" color="#fff"></tui-tips>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				options: {
					//注意：小程序端需确保域名已授权访问
					path: 'https://assets4.lottiefiles.com/packages/lf20_w7dge7mr.json',
					autoplay: true,
					//是否循环播放动画，可选，不传默认为true
					loop: true
				},
				showPopup: false, //底部弹窗
				showPricePopup: false, //修改价格弹窗
				resetDialog: false, //清零弹窗
				valveDialog: false, //关阀弹窗
				//包含确定和取消按钮
				clearButtons: [{
					text: '取消'
				}, {
					text: '清零',
					color: '#586c94'
				}],
				valveButtons: [{
					text: '取消'
				}, {
					text: '确认',
					color: '#586c94'
				}],
				timer: null,
				isConnected: false, //蓝牙连接状态
				cursor: false, //输入光标
				value: '', //水价
			};
		},
		methods: {
			//抄表
			readingMeter() {
				this.showPopup = false
				this.$g.tui.showLoading('抄表中')
				let timer = setTimeout(() => {
					// 检查蓝牙连接
					if (!this.isConnected) {
						this.$refs.unConnectedTips.showTips({
							msg: '蓝牙连接异常,请重试',
							duration: 2000
						});
					}
					uni.hideLoading()
				}, 1000)
			},
			//水表清零弹窗
			meterReset() {
				this.showPopup = false
				clearTimeout(this.timer)
				const timer = setTimeout(() => {
					this.resetDialog = true
				}, 400)
				this.timer = timer
			},
			//水表清零
			resetButtonTap({
				index,
				item
			}) {
				this.showPopup = false
				if (!index) {
					this.resetDialog = false
					return
				}
				this.resetDialog = false
				this.$g.tui.showLoading('水表清零中')
				let timer = setTimeout(() => {
					// 检查蓝牙连接
					if (!this.isConnected) {
						this.$refs.unConnectedTips.showTips({
							msg: '蓝牙连接异常,请重试',
							duration: 2000
						});
					}
					uni.hideLoading()
				}, 1000)
			},
			//水表关阀
			closeValvetButtonTap({
				index,
				item
			}) {
				if (!index) {
					this.valveDialog = false
					return
				}
				this.valveDialog = false
				this.$g.tui.showLoading('强制关阀中')
				let timer = setTimeout(() => {
					// 检查蓝牙连接
					if (!this.isConnected) {
						this.$refs.unConnectedTips.showTips({
							msg: '蓝牙连接异常,请重试',
							duration: 2000
						});
					}
					uni.hideLoading()
				}, 1000)

			},
			//点击蒙层关闭弹窗
			maskTap() {
				this.showPopup = false
			},
			//点击蒙层关闭弹窗
			priceMaskTap() {
				this.showPricePopup = false
			},
			gotoPage(url, e) {
				this.showPopup = false
				uni.navigateTo({
					url: url
				})
			},
			focus() {
				this.cursor = true;
			},
			keyTap(e) {
				console.log(e)
				let keyVal = e.value;
				let value = this.value;
				if (~value.indexOf('.') && keyVal == '.') return;
				//最大9位，自行控制即可
				if (value.length == 9) {
					this.tui.toast('超过限制位数，不可输入')
					return
				}
				if (!this.value && keyVal == '.') {
					this.value = '0.'
				} else {
					this.value = this.value + e.value;
				}
			},
			backspace(e) {
				let val = this.value;
				if (val) {
					this.value = val.substring(0, val.length - 1)
				}
			},
			confirm(e) {
				this.showPricePopup = false;
				this.cursor = false;
				this.$g.tui.toast({
					text: '水价修改为：' + Number(this.value)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		overflow: hidden;
	}

	.content {
		margin: 15rpx 0;
		padding: 0 4%;

		::v-deep xui-card:first-child .card {
			background-color: #a2d8b9;
		}

		xui-card.controls {
			position: absolute;
			left: 4%;
			right: 4%;
			padding-bottom: 30rpx;
			bottom: constant(safe-area-inset-bottom);
			bottom: env(safe-area-inset-bottom);
		}
	}

	.card-content-wrap {
		.card-head {
			.device-icon {
				width: 100rpx;
				height: 120rpx;
				margin-right: -80rpx;
			}
		}

		.meter-detail {
			position: absolute;
			z-index: 999;
			left: 50%;
			top: 50%;
			width: 330rpx;
			height: 330rpx;
			background-color: #393B4F;
			border-radius: 50%;
			transform: translate(-50%, -50%);
		}

		.divide-line {
			color: #FFF;
		}
	}

	.popup-header {
		position: relative;
		margin-bottom: 40rpx;

		text.text-xl {
			font-weight: bold;
		}

		.closebtn {
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
		}
	}

	.menu-grid {
		display: grid;
		min-height: 600rpx;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 20rpx;

		.menu-item {
			background-color: var(--thorui-bg-color-grey);

		}
	}

	.tui-form__box {
		background-color: #fff;
		padding: 0 50rpx 60rpx;
		box-sizing: border-box;
	}

	.tui-title {
		padding: 60rpx 0;
		box-sizing: border-box;
		text-align: center;
	}

	.tui-input__box {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid rgba(0, 0, 0, .1);
		height: 88rpx;
		padding-bottom: 2rpx;
	}

	.tui-symbol {
		font-size: 60rpx;
		font-weight: bold;
	}

	.tui-input {
		font-size: 80rpx;
		line-height: 80rpx;
		font-weight: bold;
		padding-right: 6rpx;
	}

	.tui-cursor {
		display: block;
		width: 2px;
		border-radius: 2px;
		height: 88rpx;
		animation: blink 1s infinite steps(1, start)
	}

	@keyframes blink {
		0% {
			background-color: white;
		}

		50% {
			background-color: #5677fc;
		}

		100% {
			background-color: white;
		}
	}

	.price-controls {
		min-height: 60vh;
	}
</style>