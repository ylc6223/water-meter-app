import http from '@/components/common/tui-request'
//微信用户登录
export const login = function(data = {}) {
	return http.request({
		url: '/api/UserInfo/WechatPhoneCodeLogin',
		method: 'POST',
		data
	})
}
//退出登录
export const logout = function(data = {}) {
	return http.request({
		url: '/api/meterSetter/page',
		method: 'POST',
		data
	})
}