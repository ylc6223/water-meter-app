<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<view class="tui-header-bg"></view>
		
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		methods: {
			/**
			 * @description 导航栏初始化信息，回传导航栏相关信息
			 * @param {number} width 导航栏宽度
			 * @param {number} height:导航栏高度,
			 * @param {string} left:左边界坐标(px),
			 * @param {string} top:上边界坐标(px),
			 * @param {Number} statusBarHeight 状态栏高度,
			 * @param {Number} opacity:不透明度,
			 * @param {Number} windowHeight
			 *
			 * @return void没有返回值
			 */
			initNavigation({width,height,left,top,statusBarHeight,opacity,windowHeight}) {

			}
		}
	}
</script>

<style lang="scss" scoped>
.tui-header-bg{
	height: 236px;
	background-color: #3498db;
}
</style>