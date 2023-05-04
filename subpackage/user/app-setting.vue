<template>
	<view>

	</view>
</template>

<script>
	import Bluetooth from "@/utils/bluetooth/bluetoothManager.js"
	export default {
		data() {
			return {

			}
		},
		methods: {
		},
		onLoad() {
			const that = this
			const bl = new Bluetooth()
			bl.initBluetoothAdapter(()=>{
				console.log('hello world');
			})
			// uni.getSetting({
			// 	success(res) {
			// 		//蓝牙未授权
			// 		if (!res.authSetting['scope.bluetooth']) {
			// 			//要求授权并开启蓝牙
			// 			uni.authorize({
			// 				scope: 'scope.bluetooth',
			// 				success() {
			// 					//后续静默开启蓝牙并连接
			// 					that.initBle()
			// 					//开启蓝牙通信
			// 				}
			// 			})
			// 		} else {
			// 			//开启蓝牙通信
			// 		}
			// 	}
			// })
		}
	}
</script>

<style>

</style>