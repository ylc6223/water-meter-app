<script>
	export default {
		onLaunch: function() {
			let that = this;
			// #ifdef MP-WEIXIN
			if (wx.canIUse('getUpdateManager')) {
				const updateManager = wx.getUpdateManager();
				updateManager.onCheckForUpdate(function(res) {
					// 请求完新版本信息的回调
					if (res.hasUpdate) {
						updateManager.onUpdateReady(function() {
							that.tui.modal('更新提示', '新版本已经上线啦~，为了获得更好的体验，建议立即更新', false, res => {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate();
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							that.tui.modal('更新失败', '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开', false,
								res => {});
						});
					}
				});
			}
			// wx.getSystemInfo({
			// 	success: (res) => {
			// 		const statusBarHeight = res.statusBarHeight
			// 		//标题栏高度 = 胶囊底部距顶部的距离+胶囊顶部距离 - (状态栏高度*2)
			// 		//导航栏高度 = 胶囊按钮高度 + 状态栏到胶囊按钮间距 * 2 + 状态栏高度
			// 		const titleBarHeight = wx.getMenuButtonBoundingClientRect().bottom + wx
			// 			.getMenuButtonBoundingClientRect().top - (res.statusBarHeight * 2)
			// 	},
			// 	failure() {
			// 		this.globalData.statusBarHeight = 0
			// 		this.globalData.titleBarHeight = 0
			// 	}
			// })
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url('@/static/styles/utils.scss');
	@import url('@/static/styles/app.css');
	@import url('@/static/styles/thorui-extend.css');
	@import url('@/static/fonts/iconfont.css');
	@import url('@/components/uni/uParse/src/wxParse.css');
	/*每个页面公共css */
</style>