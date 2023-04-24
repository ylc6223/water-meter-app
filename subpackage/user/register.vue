<template>
	<view class="content">
		<view class="title">
			注册
		</view>
		<view class="row-input">
			<tui-icon name="people" color="#333" :size="40" unit="rpx"></tui-icon>
			<input placeholder="请输入用户名" maxlength="18" />
		</view>
		<view class="row-input">
			<tui-icon name="pwd" color="#333" :size="40" unit="rpx"></tui-icon>
			<input placeholder="密码" maxlength="18" :password="!isShowPassword" />
		</view>
		<view class="row-input">
			<tui-icon name="pwd" color="#333" :size="40" unit="rpx"></tui-icon>
			<input placeholder="确认密码" maxlength="18" :password="!isShowPassword" />
		</view>
		<view class="register-btn">注册</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		background-color: #FFF;
		padding: 0 60rpx;
	}

	.title {
		padding-bottom: 50rpx;
		height: 200rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		font-size: 60rpx;
		letter-spacing: 5rpx;
		color: #585858;
	}

	.row-input {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 110rpx;
		border-bottom: 1rpx solid #ededed;

		image,tui-icon {
			margin: 0 20rpx;
			flex-shrink: 0;
			width: 40rpx;
			height: 40rpx;
		}

		input {
			width: 480rpx;
			font-size: 30rpx;
		}
	}

	.register-btn {
		margin-top: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		color: #FFFFFF;
		font-size: 38rpx;
		letter-spacing: 5rpx;
		height: 110rpx;
		border-radius: 20rpx;
		background-color: #4772fb;
	}
</style>
