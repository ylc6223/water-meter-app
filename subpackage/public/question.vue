<template>
	<view>
		<tui-button @tap="sweet">scancode</tui-button>
		<view>{{finished?'完成':'未完成'}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				finished: false,
				scanPromise: null
			}
		},
		methods: {
			sweet() {
				const that = this
				that.scanPromise = new Promise((resolve, reject) => {
					// 在扫码回调中执行 resolve 方法，表示扫码回调已完成
					function scanCallback(res) {
						if (res) {
							// 执行扫码回调的相关代码
							// 修改 finished 变量
							that.finished = true;
							// 将扫码结果传递给 resolve 方法
							console.log('success');
							resolve(res);
						}
					}
					// 将扫码回调函数作为参数传递给扫码 API
					uni.scanCode({
						success: scanCallback,
						fail: () => {
							reject('扫码失败')
						},
					});
				})
			}
		},
		onShow() {
			console.log('onshow');
			// 使用 Promise 等待扫码回调完成
			if(!this.scanPromise){
				return
			}
			this.scanPromise.then((result) => {
				// 扫码回调完成后，可以在这里处理扫码结果
				// 根据 finished 变量执行不同的操作
				if (this.finished) {
					console.log('扫码完成', result);
				} else {
					console.log('扫码失败');
				}
			}).catch((error) => {
				// 处理扫码失败的情况
				console.error(error);
			});
		}

	}
</script>

<style>

</style>