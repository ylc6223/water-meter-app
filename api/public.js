import http from '@/components/common/tui-request'
//微信用户登录
const login = function(data = {}) {
	return http.request({
		url: '/api/UserInfo/WechatPhoneCodeLogin',
		method: 'POST',
		data
	})
}
//退出登录
const logout = function(data = {}) {
	return http.request({
		url: '/api/meterSetter/page',
		method: 'POST',
		data
	})
}
export {
	login,
	logout
}