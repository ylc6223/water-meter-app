export default class ZRBLE {
	constructor(deviceId, serviceId) {
		this.deviceId = deviceId; // 设备id
		this.serviceId = serviceId; // 主服务 uuid
		this.writeCharacteristicId = ""; // write 特征值uuid
		this.notifyCharacteristicId = ""; // notify  特征值uuid
		this.connectionTimeout = 20000; // 连接BLE timeout 时长
	}
	// TODO 下面实现的方法
	/**  

	 * 处理特征值，获取notifyCharacteristicId和writeCharacteristicId
	 * @param {array} characteristics
	 * @return {object} [notifyCharacteristicId, writeCharacteristicId] 
	 */
	handleCharacteristics(characteristics) {
		const len = characteristics.length;
		for (let i = 0; i < len; i++) {
			const characteristic = characteristics[i];
			// 如果根据 serviceId 匹配到 所用的蓝牙产品，直接把特征值写死，因为是唯一的。
			if (this.serviceId == '6E400001-B5A3-F393-E0A9-E50E24DCCA9E' || this.serviceId.toLocaleUpperCase() ==
				'6E400001-B5A3-F393-E0A9-E50E24DCCA9E') {
				this.notifyCharacteristicId = '6E400003-B5A3-F393-E0A9-E50E24DCCA9E'
				this.writeCharacteristicId = '6E400002-B5A3-F393-E0A9-E50E24DCCA9E'
			} else {
				// 获取notifyCharacteristicId
				if (characteristic.properties.notify) {
					this.notifyCharacteristicId = characteristic.uuid;
				}
				// 获取writeCharacteristicId
				if (characteristic.properties.write) {
					this.writeCharacteristicId = characteristic.uuid;
				}
			}
		}
		return {
			notifyCharacteristicId: this.notifyCharacteristicId,
			writeCharacteristicId: this.writeCharacteristicId
		}
	}

	/**
	/**
	 * 连接BLE
	 * @param {function} cb 弹框回调
	 */
	createBLEConnection() {
		return new Promise((resolve, reject) => {
			uni.createBLEConnection({
				deviceId: this.deviceId,
				timeout: this.connectionTimeout,
				success: res => {
					// console.log("res:createBLEConnection " + JSON.stringify(res));
					resolve(res);
				},
				fail: err => {
					console.log(err);
					reject(err)
					// err.errCode == 10003 ? this.createBLEConnection() : reject(err)
				},
			})
		})
	}

	/**
	 * 获取某个型号BLE设备服务表
	 * 这里获取到的是一个列表,具体选取哪个serviceId 需要拿到每个serviceId后,
	 * 去获取蓝牙设备对应服务中所有特征值(characteristic), 获取到的特征值能成功写入(write)和订阅(notify)
	 * 消息, 就用这个serviceId, 此时serviceId 就可以写死到项目中***(只针对同型号的蓝牙).***
	 */
	getBLEServices() {
		return new Promise((resolve, reject) => {
			// 连接成功之后需要延时，继续操作才不会出问题
			setTimeout(() => {
				uni.getBLEDeviceServices({
					deviceId: this.deviceId,
					success: res => {
						const serviceList = [];
						const services = res.services;
						const len = services.length;
						for (let i = 0; i < len; i++) {
							if (services[i].isPrimary) {
								serviceList.push(services[i]);
							}
						}
						// console.log(serviceList);
						resolve(serviceList);
					},
					fail: err => {
						console.log(err);
						reject(err);
					}
				})
			}, 600)
		})
	}

	/**
	 * 获取蓝牙设备某个服务中所有特征值(characteristic)
	 * 
	 */
	getBLEDeviceCharacteristics() {
		return new Promise((resolve, reject) => {
			uni.getBLEDeviceCharacteristics({
				deviceId: this.deviceId,
				serviceId: this.serviceId,
				success: res => {
					// 处理特征值，获取notifyCharacteristicId和writeCharacteristicId
					const result = this.handleCharacteristics(res.characteristics);
					resolve(result);
				}
			})
		})
	}

	/**
	 * 向低功耗蓝牙设备特征值中写入二进制数据
	 * @param {Object} buffer
	 */
	writeBLECharacteristicValue(buffer) {
		return new Promise((resolve, reject) => {
			uni.writeBLECharacteristicValue({
				deviceId: this.deviceId,
				serviceId: this.serviceId,
				characteristicId: this.writeCharacteristicId,
				value: buffer,
				success: res => {
					resolve(res);
				},
				fail: err => {
					console.log('message发送失败', JSON.stringify(err));
					reject(err);
				}
			});
		});
	}

	/**
	 * 启用低功耗蓝牙设备特征值变化时的 notify 功能，订阅特征值
	 */
	notifyBLECharacteristicValue() {
		return new Promise((resolve, reject) => {
			uni.notifyBLECharacteristicValueChange({
				state: true, // 启用 notify 功能
				deviceId: this.deviceId,
				serviceId: this.serviceId,
				characteristicId: this.notifyCharacteristicId,
				success: res => {
					resolve(res)
				},
				fail: err => {
					reject(err)
					console.log('notifyBLECharacteristicValueChange failed:' + err.errMsg);
				}
			});
		})
	}

	/**
	 * 接收设备推送的 notification
	 * @param {function} cb 处理回调
	 */
	onBLECharacteristicValueChange(cb) {
		uni.onBLECharacteristicValueChange(function(res) {
			cb && cb(res.value)
		})
	}

	/**
	 * 监听低功耗蓝牙连接状态的改变事件。
	 * 包括开发者主动连接或断开连接，设备丢失，连接异常断开等等
	 */
	onBLEConnectionStateChange() {
		return new Promise(resolve => {
			uni.onBLEConnectionStateChange(function(res) {
				// 该方法回调中可以用于处理连接意外断开等异常情况
				// console.log(`device ${res.deviceId} state has changed, connected: ${res.connected}`)
				if (!res.connected) {
					resolve(res)
				}
			})
		})

	}

	/**
	 * 断开联链接
	 */
	closeBLEConnection() {
		uni.closeBLEConnection({
			deviceId: this.deviceId,
			success: res => {
				// console.log(res)
			}
		})
	}
}
