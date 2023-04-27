<template>
	<view class="nav-bar" :style="{'height':navBarHeight+'px'}">
		<input class="search" placeholder="输入关键词"
			:style="{'height':capsuleBarHeight+'px','min-height':capsuleBarHeight+'px','line-height':capsuleBarHeight+'px','left':capsuleBarRight+'px','bottom':gap+'px'}"
			</input>
	</view>
</template>

<script>
	export default {
		name: "xui-navigation-bar",
		props: {
			//导航栏高度
			navBarHeight: {
				type: Number,
				default: 0
			},
			//胶囊按钮高度
			capsuleBarHeight: {
				type: Number,
				default: 0
			},
			//胶囊最右侧距屏幕边框距离
			capsuleBarRight: {
				type: Number,
				default: 0
			},
			//胶囊距离状态栏间距
			gap: {
				type: Number,
				default: 0
			}
		}
	}
</script>

<style lang="scss" scoped>
	.nav-bar {
		position: fixed;
		width: 100%;
		top: 0;
		color: #fff;
		background: #000;
	}

	.nav-bar .search {
		width: 60%;
		color: #333;
		font-size: 14px;
		background: #fff;
		position: absolute;
		border-radius: 50px;
		background: #ddd;
		padding-left: 14px;
	}
</style>