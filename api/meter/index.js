import http from '@/components/common/tui-request'
//获取表信息
const meterInfo = function(meterNo) {
	return http.request({
		url: `/api/Meter/InfoByNo/${meterNo}`,
		method: 'GET',
	})
}

//管理员:表预设置
const meterPreset = function(data) {
	return http.request({
		url: `/api/Admin/MeterOpenUser`,
		method: 'POST',
		data
	})
}
export {
	meterInfo,
	meterPreset
}