<template>
	<view class="container relative">
		<tui-navigation-bar :isOpacity="true" @init="initNavigation" backgroundColor="#ffffff00" transparent isCustom
			color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<template>
				<view class="navigation-bar flex items-center" :style="{'height':titleBarHeight+'px'}">
					<view @tap="back">
						<tui-icon name="arrowleft" color="#333"></tui-icon>
					</view>
					<text class="navigation-bar-title">充值</text>
				</view>
			</template>
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="flex flex-col" :style="{'margin-top':navigationBarHeight +'px'}">
			<view>
				<tui-data-checkbox width="31%" radius="30rpx" size="40" activeColor="#FFF" background="#F8F8F8"
					padding="40rpx 20rpx" v-model="defaultRechargeAmount" :options="options" activeBgColor="#2ecc71"
					borderColor="#27ae60" @change="change"></tui-data-checkbox>
				<view class="custom-price" :style="{'margin-top':20+'rpx'}">
					<input type="digit" placeholder="自定义">
					<text>元</text>
				</view>
			</view>
			<xui-card class="amount">
				<view class="flex items-center my-15">
					<text class="title-text">充值金额:</text>
					<text class="text">{{defaultRechargeAmount}}</text>
				</view>
				<view class="flex items-center my-15">
					<text class="title-text">到账水量:</text>
					<text class="text">16.67m³(水量单价3元/m³)</text>
				</view>
				<view class="flex items-center my-15">
					<text class="title-text">实际付款:</text>
					<text class="text">50.30元(包含服务费0.30元)</text>
				</view>
			</xui-card>
			<xui-card class="warn">
				<text class="warning-text title-text">充值须知</text>
				<view class="flex items-center">
					<text class="warning-text">1.充值时与蓝牙设备保持在三米内</text>
				</view>
				<view class="flex items-center">
					<text class="warning-text">2.支付成功后,需点击"完成"按钮,请勿直接退出</text>
				</view>
				<view class="flex items-center">
					<text class="warning-text">3.若发生充值异常,可以在"我的"-"常见问题"中排查</text>
				</view>
			</xui-card>
			<tui-button shape="circle" type="green" @tap="payBeforeConfirm">立即支付</tui-button>
			<view class="flex justify-center protocol-box">
				<view class="user-protocol my-30 flex items-center">
					<label>
						<tui-checkbox-group class="flex items-center" v-model="val">
							<tui-checkbox checked value="1" color="#07c160" borderColor="#999">
							</tui-checkbox>
							<text>我已阅读并同意</text>
						</tui-checkbox-group>
					</label>
					<navigator url="../../public/richtext">
						<text class="link-text">《充值协议》</text>
					</navigator>
				</view>
			</view>
		</view>
		<tui-bottom-popup :zIndex="1002" :maskZIndex="1001" :show="popupShow" @close="popup">
			<view class="flex flex-col">
				<view class="flex justify-center items-center my-30">
					<text class="title-text">充值确认</text>
				</view>
				<view>
					<tui-list-view backgroundColor="#fff" marginTop="0rpx">
						<view class="flex items-center p-30">
							<view class="mr-20">
								<tui-icon name="about-fill" size="100" color="#FFB41E" unit="rpx"></tui-icon>
							</view>
							<view>
								<text class="block">请检查,是否为您需要充值的设备</text>
								<text class="block">支付完成后,请点击"完成"按钮</text>
								<text class="block">您充值金额将转入供水方绑定的账号,充值成功后无法撤回</text>
								<text class="block">若发现充错设备，请联系供水方处理</text>
							</view>
						</view>
						<view class="thorui-preview__bd">
							<view class="thorui-preview__item flex justify-between items-center">
								<view class="title-text">设备名称</view>
								<view class="sub-title-text">深蓝工业园4#201</view>
							</view>
							<view class="thorui-preview__item flex justify-between items-center">
								<view class="title-text">充值金额</view>
								<view class="sub-title-text">50元</view>
							</view>
							<view class="thorui-preview__item flex justify-between items-center">
								<view class="title-text">到账水量</view>
								<view class="sub-title-text">16.67m³</view>
							</view>
							<view class="thorui-preview__item flex justify-between items-center">
								<view class="title-text">服务费</view>
								<view class="sub-title-text">0.30元</view>
							</view>
							<view class="thorui-preview__item flex justify-between items-center">
								<view class="title-text">需支付金额</view>
								<view class="sub-title-text">50.30元</view>
							</view>
						</view>
						<view class="p-30">
							<tui-button type="green" shape="circle" @tap="confirm">确认支付</tui-button>
						</view>
					</tui-list-view>
				</view>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				options: ['50元', '100元', '150元', '200元', '300元', '500元', ],
				defaultRechargeAmount: '50元',
				defaultAgree: true,
				val: '',
				form: {
					price: '',
					quantity: '',
					actualPrice: ''
				},
				popupShow: false,
				connectedDeviceId: null // 用于存储已连接的设备ID
			}
		},
		computed: {

		},
		onLoad() {},
		methods: {
			back() {
				uni.navigateBack()
			},
			/**
			 * @description 导航栏初始化信息，回传导航栏相关信息
			 * @param {number} width 导航栏宽度
			 * @param {number} height:导航栏高度,
			 * @param {string} left:左边界坐标(px),
			 * @param {string} top:上边界坐标(px),
			 * @param {Number} statusBarHeight 状态栏高度,
			 * @param {Number} opacity:不透明度,
			 * @param {Number} windowHeight
			 *
			 * @return void没有返回值
			 */
			//初始化自定义导航栏
			initNavigation({
				width,
				height,
				left,
				top,
				statusBarHeight,
				opacity,
				windowHeight
			}) {
				this.titleBarHeight = height - statusBarHeight
				this.navigationBarHeight = height
			},
			change(e) {
				console.log(e.detail)
				if (e.detail.index === -1) {
					console.log('已取消所有选择')
				} else {
					console.log(e.detail.value)
				}
			},
			//支付前提醒用户同意用户协议
			payBeforeConfirm() {
				if (!this.val.length) {
					this.$g.tui.toast({
						text: '请阅读并同意《充值协议》'
					})
					return
				}
				this.popupShow = true
			},
			//最终确认支付
			confirm() {

			},
			popup() {
				this.popupShow = !this.popupShow
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #FFF !important;
		padding-bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		padding-bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.navigation-bar {
		margin: 0 15rpx;
	}

	.relative {
		padding: 0 15rpx;
	}

	.active {
		background: rgb(39, 174, 96);
		background: radial-gradient(circle, rgba(39, 174, 96, 1) 0%, rgba(46, 204, 113, 1) 100%);
	}

	::v-deep .tui-data-checkbox .tui-data__cb-item:nth-child(3n) {
		margin-right: 0 !important;
	}

	.custom-price {
		display: flex;
		justify-items: center;
		box-sizing: border-box;
		width: calc(62% + 15rpx);
		padding: 40rpx 30rpx;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
		font-size: 20px;
		color: #333;
		background-color: #F8F8F8;

		&:focus {}
	}

	.custom-price.active {
		background: #2ecc71;
		border-color: #27ae60;
		color: #FFF;
	}

	::v-deep xui-card.amount .card {
		// background: #beffda !important;
		background: #ecf7f1 !important;
		background: radial-gradient(circle, rgba(39, 174, 96, 1) 0%, rgba(46, 204, 113, 1) 100%);

		.text {
			color: #2ECC71;
		}
	}

	::v-deep xui-card.warn .card {
		background: #ffedd3 !important;

		.warning-text {
			color: #ffa729;
			font-size: 28rpx;
			line-height: 1.5;
		}
	}

	.protocol-box {
		position: absolute;
		left: 0;
		right: 0;
		margin-bottom: 20rpx;
		bottom: constant(safe-area-inset-bottom);
		/*兼容 IOS<11.2*/
		bottom: env(safe-area-inset-bottom);
		/*兼容 IOS>11.2*/
	}

	.link-text {
		font-size: 18px;
		color: #07C160;
	}
</style>