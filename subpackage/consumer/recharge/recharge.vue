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
		<view class="relative" :style="{'top':navigationBarHeight +'px'}">
			<view>
				<tui-data-checkbox width="31%" radius="30rpx" size="40" activeColor="#FFF" background="#F8F8F8"
					padding="40rpx 20rpx" v-model="defaultRechargeAmount" :options="options" activeBgColor="#2ecc71"
					borderColor="#27ae60" @change="change"></tui-data-checkbox>
				<view class="custom-price" :style="{'margin-top':20+'rpx'}">
					<input type="digit" placeholder="自定义">
				</view>
			</view>
			<xui-card class="amount">
				<view class="flex items-center my-15">
					<text class="title-text">充值金额:</text>
					<text class="text">50元</text>
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
			<tui-button shape="circle" type="green">立即支付</tui-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				titleBarHeight: 0, //标题栏高度
				navigationBarHeight: 0, //导航栏高度
				options: ['50元', '100元', '150元', '200元', '300元', '500元', ],
				defaultRechargeAmount: '50元'
			}
		},
		onLoad() {},
		methods: {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #FFF !important;
	}

	.navigation-bar {
		margin: 0 15rpx;
	}
	.relative{
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
		box-sizing: border-box;
		width: calc(62% + 15rpx);
		padding: 40rpx 30rpx;
		border-radius: 30rpx;
		margin-bottom: 20rpx;
		background-color: #F8F8F8;
	}

	.custom-price.active {
		background: #2ecc71;
		border-color: #27ae60;
		color: #FFF;
	}
	::v-deep xui-card.amount .card{
		// background: #beffda !important;
		background: #ecf7f1 !important;
		background: radial-gradient(circle, rgba(39, 174, 96, 1) 0%, rgba(46, 204, 113, 1) 100%);
		.text{
			color: #2ECC71;
		}
	}
	::v-deep xui-card.warn .card{
		background: #ffedd3 !important;
		.warning-text{
			color: #ffa729;
			font-size: 28rpx;
			line-height: 1.5;
		}
	}
</style>