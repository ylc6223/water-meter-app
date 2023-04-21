export default class ZRBluetooth {
	constructor(isIOS) {
		this.isIOS = isIOS; // 是否是iphone
		this.available = false; // 蓝牙是否可用/开启
		this.discovering = false; // 是否正在搜索设备
		this.discoveringTimer = null; // 搜索无设备提示延时器
		this.isDiscovery = false; // 是否搜索到设备
		this.discoveringInterval = 20000; // 搜索时长20s
	}
	/**
	 * 初始化蓝牙模块
	 * @param {function} discoveryCallback 搜索到设备后的回调
	 * @param {function} stateChangeCallback 状态变化的回调
	 */
	initBluetooth(discoveryCallback, stateChangeCallback) {
		return new Promise((resolve, reject) => {
			uni.openBluetoothAdapter({
				mode: 'central',
				success: res => {
					console.log('初始化蓝牙模块成功！');
					uni.showToast({
						// #ifndef MP-ALIPAY
						duration: 1500,
						// #endif
						title: "蓝牙适配器已开启~",
						icon: 'success'
					})

					// 监听蓝牙适配器状态变化事件
					// this.onBluetoothStateChange(stateChangeCallback);

					// 开始搜寻附近的蓝牙外围设备
					this.discoverBluetooth(discoveryCallback);
					resolve("蓝牙已启用");
				},
				fail: errMsg => {
					console.log('初始化蓝牙模块失败');
					if (errMsg.errCode === 10001) {
						uni.showToast({
							// #ifndef MP-ALIPAY
							duration: 2000,
							// #endif
							title: "请开启手机蓝牙",
							icon: 'none'
						})
					}
					// 监听蓝牙适配器状态变化事件
					this.onBluetoothStateChange(stateChangeCallback);
					reject();
				}
			})
		})
	}

	/**
	 * 搜寻蓝牙设备
	 * 上报设备时间间隔设置之后，出现了拿到的设备列表混乱，不建议添加
	 * @param {function} cb 搜索到设备后的回调
	 */
	discoverBluetooth(cb) {
		if (!cb || typeof cb !== 'function') return;
		uni.showLoading({
			title: '蓝牙搜索中'
		});
		const self = this;
		uni.startBluetoothDevicesDiscovery({
			services: ["0000FE60-0000-1000-8000-00805F9B34FB"], // 搜索主服务 UUID 对应的设备
			allowDuplicatesKey: false, // 不允许重复上报同一设备
			success: () => {
				self.discoveringTimer = setTimeout(() => {
					// TODO
					// 进行超过指定时间还没搜到设备的处理
				}, self.discoveringInterval);
			},
			// interval: 200, // 上报设备的间隔
		})
		// 监听搜索蓝牙设备事件
		self.onBluetoothDeviceFound().then(res => {
			cb && cb(res);
		})
	}


	/**
	 * 停止搜寻蓝牙设备
	 */
	stopDiscovery() {
		uni.stopBluetoothDevicesDiscovery();
		clearTimeout(this.discoveringTimer);
	}
	/**
	 * close 本机蓝牙适配器
	 */
	closeBluetooth() {
		// console.log('关闭蓝牙适配器');
		uni.closeBluetoothAdapter();
		clearTimeout(this.discoveringTimer);
	}
	/**
	 * 卸载本机蓝牙的事件
	 */
	unloadBluetooth() {
		this.closeBluetooth();
		this.discovering && this.stopDiscovery();
	}
	/**
	 * 获取本机蓝牙适配器状态
	 */
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
	/**
	 * 监听蓝牙适配器状态变化事件
	 * @param {function} cb 处理状态变化的函数
	 */
	onBluetoothStateChange(cb) {
		uni.onBluetoothAdapterStateChange(res => {
			const {
				available,
				discovering
			} = res;
			this.updateBluetoothState(res); // 更新蓝牙适配器状态
			if (!available && !discovering) { // 蓝牙断开
				this.unloadBluetooth();
			}
			cb && cb(res);
		})
	}
	/**
	 * 更新蓝牙适配器状态
	 */
	updateBluetoothState(state) {
		// 是否可用 是否处于搜索状态
		// boolean
		const {
			available,
			discovering
		} = state;
		this.available = available;
		this.discovering = discovering;
	}

	/**
	 * 监听搜索蓝牙设备事件
	 * @param {Array} devicesList 设备列表  
	 */
	onBluetoothDeviceFound(devicesList = []) {
		return new Promise((resolve, reject) => {
			uni.onBluetoothDeviceFound(res => {
				const devices = res.devices;
				const device = devices[0];
				// 筛选有名称的设备
				if (/^ZEER\d+/g.test(device['name'])) {
					// if (this.isIOS) { // 如果是 iphone
					// 	//重点 根据advertisData 取出mac进行拼接
					// 	if (device.advertisData) {
					// 		// 此处0~6只针对本司低功耗蓝牙，各产品可能不同，需要经过测试确定
					// 		let bf = device.advertisData.slice(0, 6);
					// 		let mac = Array.prototype.map.call(new Uint8Array(bf), x => ('00' + x
					// 			.toString(16)).slice(-2)).join(':');
					// 		mac = mac.toUpperCase();
					// 		// 保存mac地址
					// 		device.advertisMacData = mac;
					// 	}
					// }
					devicesList.push(device);
					this.isDiscovery = true;
				}
				// 这里resolve只执行一次，不管监听到多少设备
				resolve(devicesList);
			})
		})
	}
}
