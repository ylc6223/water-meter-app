<template>
	<view class="container relative">
		<tui-navigation-bar splitLine @init="initNavigation" backgroundColor="#ffffff00" color="#333">
			<!-- #ifndef MP-ALIPAY || MP-BAIDU -->
			<!-- #endif -->
		</tui-navigation-bar>
		<xui-card></xui-card>
		<xui-card></xui-card>
		<xui-card></xui-card>
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
		created() {
			this.resetTabBarIndex()
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			...mapMutations(["changeTabBar", "resetTabBarIndex"]),
		}
	}
</script>

<style>

</style>