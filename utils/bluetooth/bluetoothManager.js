class Bluetooth {
	constructor(isIOS) {
		this.isIOS = typeof isIOS === 'undefined' ? false : isIOS; // 是否是iphone
		this.available = false; // 蓝牙是否可用/开启
		this.discovering = false; // 是否正在搜索设备
		this.discoveringTimer = null; // 搜索无设备提示延时器
		this.isDiscovery = false; // 是否搜索到设备
		this.discoveringTimeout = 20000; // 默认搜索时长20s
		this.connectedDeviceId = null;
		this.discoveredDevices = []; // 用于存储发现的蓝牙设备
	}
	/**
	 * 初始化蓝牙模块
	 * @param {function} discoveryCallback 搜索到设备后的回调
	 */
	initBluetoothAdapter(discoveryCallback) {
		const self = this
		return new Promise((resolve, reject) => {
			uni.openBluetoothAdapter({
				mode: 'central',
				success: res => {
					console.log("蓝牙适配器初始化成功");
					uni.showToast({
						// #ifndef MP-ALIPAY
						duration: 1500,
						// #endif
						title: "蓝牙适配器已开启~",
						icon: 'none'
					})

					//监听寻找到新设备的事件
					this.onBluetoothDeviceFound().then(res => {
						discoveryCallback && discoveryCallback(res);
					})

					// 开始搜寻附近的蓝牙外围设备
					this.startDiscovery(discoveryCallback);
					resolve("蓝牙已启用");
				},
				fail: errMsg => {
					console.log('蓝牙适配器初始化失败');
					if (errMsg.errCode === 10001) {
						uni.showToast({
							// #ifndef MP-ALIPAY
							duration: 2000,
							// #endif
							title: "请开启手机蓝牙",
							icon: 'none'
						})
						return
					}
					// 监听蓝牙适配器状态变化事件
					uni.onBluetoothAdapterStateChange((res) => {
						if (res.available) return
						self.startDiscovery(discoveryCallback);
					})
					reject(false);
				}
			})
		})
	}

	//查找周围蓝牙设备
	async startDiscovery() {
		uni.showLoading({
			title: '蓝牙搜索中'
		})
		const self = this;
		console.log("开始搜索附近的蓝牙外围设备");
		try {
			await uni.startBluetoothDevicesDiscovery({
				services: [], // 此处应填写需要查找的服务uuid列表，如果为空，则查找所有设备
				allowDuplicatesKey: false, // 不允许重复上报同一设备
				interval: 0
			})

			//设置定时器，在一段时间后停止搜索并处理未找到设备的情况
			self.discoveringTimer = setTimeout(async () => {
				await self.stopDiscovery()
				uni.hideLoading()
				console.log("停止搜索附近的蓝牙外围设备");
				if (self.discoveredDevices.length === 0) {
					console.log("没有找到符合条件的蓝牙设备");
					// 在这里处理未找到设备的逻辑，例如提示用户
					uni.showToast({
						title: '未找到符合条件设备',
						icon: 'error'
					})
				}
			}, self.discoveringTimeout)
		} catch (err) {
			console.error("搜索附近的蓝牙外围设备失败", err);
		}




	}

	//停止搜寻周围蓝牙设备
	stopDiscovery() {
		uni.stopBluetoothDevicesDiscovery();
		clearTimeout(this.discoveringTimer);
	}
	//卸载蓝牙事件,卸载时顺手close掉
	unloadBluetooth() {
		uni.closeBluetoothAdapter();
		clearTimeout(this.discoveringTimer);
		this.discovering && this.stopDiscovery();
	}

	//获取本机蓝牙适配器状态
	getBluetoothState() {
		return new Promise((resolve, reject) => {
			uni.getBluetoothAdapterState({
				success: res => {
					this.updateBluetoothState(res); // 更新蓝牙适配器状态
					resolve(res);
				}
			})
		})
	}

	//更新蓝牙适配器状态
	updateBluetoothState(state) {
		const {
			available,
			discovering
		} = state;
		this.available = available;
		this.discovering = discovering;
	}

	//监听寻找到新设备的事件
	onBluetoothDeviceFound() {
		// const regex = /^ZEER\d+/g //搜寻以ZEER开头的蓝牙设备
		return new Promise((resolve, reject) => {
			uni.onBluetoothDeviceFound((res) => {
				res.devices.forEach((device) => {
					// if (
					// 	!this.discoveredDevices.some(
					// 		(discoveredDevice) => discoveredDevice.deviceId === device
					// 		.deviceId
					// 	) && regex.test(device.name)
					// )
					// 去重设备
					if (
						!this.discoveredDevices.some(
							(discoveredDevice) => discoveredDevice.deviceId === device
							.deviceId
						)
					) {
						this.discoveredDevices.push(device);
						this.isDiscovery = true;
						console.log("发现新设备", device);
					}
				})
				// 这里resolve只执行一次，不管监听到多少设备
				resolve(this.discoveredDevices);
			})
		})
	}

	// 连接到低功耗蓝牙设备
	async connectToBLEDevice(deviceId) {
		try {
			await uni.createBLEConnection({
				deviceId
			});
			console.log("低功耗蓝牙设备连接成功");
			this.connectedDeviceId = deviceId;

			// 连接成功后，发现设备的服务
			const servicesResult = await uni.getBLEDeviceServices({
				deviceId
			});
			console.log("获取到的服务列表：", servicesResult.services);

			// 根据需要查找特定服务的特征值，这里以第一个服务为例
			const targetService = servicesResult.services[0];
			const characteristicsResult = await uni.getBLEDeviceCharacteristics({
				deviceId,
				serviceId: targetService.uuid,
			});
			console.log("获取到的特征值列表：", characteristicsResult.characteristics);

			// 这里可以根据需要读写特征值，订阅特征值通知等

		} catch (err) {
			console.error("低功耗蓝牙设备连接失败", err);
		}
	}
	// async checkBluetoothConnection() {
	// 	if (!this.connectedDeviceId) {
	// 		console.log("没有已连接的设备");
	// 		return;
	// 	}

	// 	try {
	// 		const result = await uni.getConnectedBluetoothDevices({
	// 			services: [] // 此处应填写需要查找的服务uuid列表
	// 		});

	// 		const isConnected = result.devices.some(
	// 			(device) => device.deviceId === this.connectedDeviceId
	// 		);

	// 		if (isConnected) {
	// 			console.log("设备已连接");
	// 		} else {
	// 			console.log("设备未连接");
	// 		}
	// 	} catch (err) {
	// 		console.error("检查蓝牙连接状态失败", err);
	// 	}
	// }

	// async connectToDevice(deviceId) {
	// 	try {
	// 		await uni.createBLEConnection({
	// 			deviceId
	// 		});
	// 		console.log("连接成功");
	// 		this.connectedDeviceId = deviceId;
	// 	} catch (err) {
	// 		console.error("连接失败", err);
	// 	}
	// }
}

export default Bluetooth;