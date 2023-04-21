import http from '@/components/common/tui-request'
import tui from "@/components/common/httpRequest.js" //工具类
import {
	transParams
} from "@/utils/index.js";
//初始化请求配置项
http.create({
	host: 'http://8.142.169.72:9018',
	header: {
		// 'content-type': 'application/x-www-form-urlencoded'
		'content-type': 'application/json;charset=UTF-8'
	},
	//concise:true 
})
//请求拦截
http.interceptors.request.use(config => {
	let token = uni.getStorageSync('accessToken');
	if (config.header) {
		config.header['Authorization'] = "Bearer " + token
	} else {
		config.header = {
			'Authorization': "Bearer " + token
		}
	}
	// get请求映射params参数
	if (config.method === 'GET' && config.data) {
		let url = config.url + '?' + transParams(config.data);
		url = url.slice(0, -1); //把最后一个&符截去
		config.data = {};
		config.url = url;
	}
	return config
})
//响应拦截
http.interceptors.response.use(response => {
	if (response.statusCode == 200) {
		if (response.data.code == 200) {
			return response.data;
		}
		if (response.data.code == 401) {
			tui.modal({
				content: response.data.message,
				callback: (bl) => {
					if (bl) {
						uni.reLaunch({
							url: "/subpackage/user/login"
						})
					} else {
						return
					}
				}
			})
			return Promise.reject(response.data.message);
		}
		if (response.data.code == 500) {
			return response.data;
		} else {
			throw response.data.message;
		}
	} else {
		throw "服务器错误";
	}

	//TODO
	//return response


})
export default http