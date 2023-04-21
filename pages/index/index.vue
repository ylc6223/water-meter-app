<template>
	<view>
		<text>首页</text>
		<tui-tabbar></tui-tabbar>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		created() {
			this.resetTabBarIndex()
		},
		onLoad() {
			uni.hideTabBar()
		},
		methods: {
			...mapMutations(["changeTabBar", "resetTabBarIndex"]),
		},
		computed: mapState(["tabBarIndex", "tabBar"]),
	}
</script>

<style>

</style>