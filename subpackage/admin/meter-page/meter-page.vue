<template>
	<view class="container relative">
		<view class="content">
			<xui-card :hover="false" class="card-content-wrap w-full">
				<view class="card-head flex items-center justify-between">
					<image class="device-icon" src="../../../static/icons/log.svg" mode=""></image>
					<view>
						<text class="block text-white text-lg">深蓝工业园4#201</text>
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
					<view class="flex flex-col justify-between items-center thorui-warning__color">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-zhiboguanbi" color="#ff7900"></tui-icon>
						<text>强制关闭</text>
					</view>
					<view class="flex flex-col justify-between items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shui" color="#2F97E9"></tui-icon>
						<text>单价</text>
					</view>
					<view class="flex flex-col justify-between items-center">
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
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-bianji" color="#333"></tui-icon>
						<text>抄表</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center" @tap="gotoPage('../meter-detail/meter-detail',$event)">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shebei" color="#333"></tui-icon>
						<text>设备详情</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon name="qrcode" color="#333"></tui-icon>
						<text>二维码</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shuaxin" color="#333"></tui-icon>
						<text>修改底数</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-shuaxin" color="#333"></tui-icon>
						<text>水量清零</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>抄表记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>清零记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-jiankongpingtai" color="#333"></tui-icon>
						<text>充值记录</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon custom-prefix="tui-icon__extend" name=".icon-tishi" color="#333"></tui-icon>
						<text>欠费提醒</text>
					</view>
					<view class="menu-item flex flex-col justify-center items-center">
						<tui-icon name="histogram" color="#333"></tui-icon>
						<text>用水分析</text>
					</view>
				</view>
			</view>
		</tui-bottom-popup>
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
				showPopup:false,//底部弹窗
			};
		},
		methods:{
			maskTap(){
				this.showPopup = false
			},
			gotoPage(url,e){
				uni.navigateTo({
					url:url
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
</style>