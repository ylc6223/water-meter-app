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
							that.$g.tui.modal({
								title: '更新提示',
								content: '新版本已经上线啦~，为了获得更好的体验，建议立即更新',
								showCancel: false,
								callback: res => {
									// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
									updateManager.applyUpdate();
								}
							});
						});
						updateManager.onUpdateFailed(function() {
							// 新的版本下载失败
							that.$g.tui.modal({
								title: '更新失败',
								content: '新版本更新失败，为了获得更好的体验，请您删除当前小程序，重新搜索打开',
								showCancel: false,
								callback: res => {}
							});
						});
					}
				});
			}
			wx.login({
				success(res) {
					if (res.code) {
						// 授权登录
						that.$g.http.request({
							url: '/SysWechatOpen/snsOAuth2',
							method: 'POST',
							data: {
								code: res.code
							}
						}).then(res1 => {
							const openid = res1.result;
							console.log("openid", openid);
						}).catch(e => {
							console.log("fail");
						})
					} else {
						console.log('登录失败！' + res.errMsg)
					}
				}
			})
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
	@import url('@/static/styles/thorui-extend.css');
	@import url('@/static/fonts/iconfont.css');
	@import url('@/components/uni/uParse/src/wxParse.css');
</style>