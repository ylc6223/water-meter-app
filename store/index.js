import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		tabBar: [{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath": "/static/icons/deactive-index.svg",
				"selectedIconPath": "/static/icons/index.svg",
				"num": 0,
				"hump": false,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "pages/dashboard/dashboard",
				"text": "设备",
				"iconPath": "/static/icons/deactive-device.svg",
				"selectedIconPath": "/static/icons/device.svg",
				"num": 0,
				"hump": false,
				"isDot": false,
				"verify": true
			},
			{
				"pagePath": "pages/profile/profile",
				"text": "我的",
				"iconPath": "/static/icons/deactive-mine.svg",
				"selectedIconPath": "/static/icons/mine.svg",
				"num": 0,
				"hump": false,
				"isDot": true,
				"verify": true
			}
		],
		tabBarIndex: 0, //当前选中第几项,
		isLogin: false, //登录状态，
		// isEmpower: false, //用户是否已授权
		userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : ''
	},
	mutations: {
		changeTabBar(state, payload) {
			if (payload) {
				state.tabBarIndex = typeof payload.index == "number" ? payload.index : payload
			}
		},
		resetTabBarIndex(state, payload) {
			state.tabBarIndex = 0
		},
		switchRole(state, payload) {
			let adminTabbar = [{
					"pagePath": "pages/index/index",
					"text": "首页",
					"iconPath": "/static/icons/deactive-index.svg",
					"selectedIconPath": "/static/icons/index.svg",
					"num": 0,
					"hump": false,
					"isDot": false,
					"verify": true
				},
				{
					"pagePath": "pages/dashboard/dashboard",
					"text": "收入",
					"iconPath": "/static/icons/deactive-shouru.svg",
					"selectedIconPath": "/static/icons/shouru.svg",
					"num": 0,
					"hump": false,
					"isDot": false,
					"verify": true
				},
				{
					"pagePath": "pages/profile/profile",
					"text": "我的",
					"iconPath": "/static/icons/deactive-mine.svg",
					"selectedIconPath": "/static/icons/mine.svg",
					"num": 0,
					"hump": false,
					"isDot": true,
					"verify": true
				}
			]
			let consumerTabbar = [{
					"pagePath": "pages/index/index",
					"text": "首页",
					"iconPath": "/static/icons/deactive-index.svg",
					"selectedIconPath": "/static/icons/index.svg",
					"num": 0,
					"hump": false,
					"isDot": false,
					"verify": true
				},
				{
					"pagePath": "pages/dashboard/dashboard",
					"text": "设备",
					"iconPath": "/static/icons/deactive-device.svg",
					"selectedIconPath": "/static/icons/device.svg",
					"num": 0,
					"hump": false,
					"isDot": false,
					"verify": true
				},
				{
					"pagePath": "pages/profile/profile",
					"text": "我的",
					"iconPath": "/static/icons/deactive-mine.svg",
					"selectedIconPath": "/static/icons/mine.svg",
					"num": 0,
					"hump": false,
					"isDot": true,
					"verify": true
				}
			]
			const tabBar = payload === 'admin' ? adminTabbar : payload === 'consumer' ? consumerTabbar : []
			state.tabBar = tabBar
		},
		setLoginState(state, payload) {
			state.isLogin = payload
		},
		setUserInfo(state, payload) {
			state.userInfo = payload
		},
		// setEmpower(state, payload) {
		// 	state.isEmpower = payload
		// },
	},
	actions: {

	},
	getters: {
		//用户是否已授权
		isEmpower(state, otherGetters) {
			return state.userInfo ? true : false
		}
	}
})

export default store