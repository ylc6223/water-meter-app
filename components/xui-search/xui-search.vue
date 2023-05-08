<template>
	<view class="search-container" :style="{backgroundColor: backgroundColor}">
		<view class="search-box" :class="{'transition':isFocus}"
			:style="{'width':isFocus?'70%':'100%','padding':padding,'border-radius':radius}">
			<view class="search-input">
				<icon :style="{ color: searchColor }" class="search-icon" type="search" size="20"></icon>
				<input :class="{ 'input-focus': isFocus }" type="text" class="search-field"
					:style="{'height':height,'font-size':font+'rpx',backgroundColor: inputBgColor}"
					:placeholder="placeholder" :value="searchText" :focus="isFocus" confirm-type="search"
					@blur="inputBlur" @focus="inputFocus" @input="inputChange" @confirm="search" />
			</view>
		</view>
		<view class="search-btn" :class="{'search-btn-focus':isFocus,'transition':isFocus}" @tap="search">
			<text>{{placeholder}}</text>
		</view>
	</view>
</template>
<script>
	export default {
		name: "xui-search",
		emits: ['focus', 'blur', 'click', 'input', 'search'],
		data() {
			return {
				searchText: "",
				isFocus: false,
				searchState: false,
			};
		},
		props: {
			//输入框高度
			height: {
				type: String,
				default: '50rpx'
			},
			//padding
			padding: {
				type: String,
				default: '10rpx 22rpx'
			},
			//设置圆角
			radius: {
				type: String,
				default: '50rpx'
			},
			//输入框背景色
			inputBgColor: {
				type: String,
				default: '#fff'
			},
			//搜索栏背景色
			backgroundColor: {
				type: String,
				default: '#ededed'
			},
			//搜索关键词
			placeholder: {
				type: String,
				default: '搜索'
			},
			//搜索按钮文本颜色	
			searchColor: {
				type: String,
				default: '#5677fc'
			},
			//字体大小
			font: {
				type: Number,
				default: 32
			},
			value: {
				type: String,
				default: ''
			},
			//获取焦点
			focus: {
				type: Boolean,
				default: false
			},
		},
		created() {
			this.searchText = this.value;
			this.isFocus = this.focus;
			if (this.focus || this.searchText.length > 0) {
				this.searchState = true;
			}
		},
		watch: {
			value(val) {
				this.searchText = val;
			}
		},
		methods: {
			inputFocus(e) {
				this.isFocus = true;
				this.$emit('focus', e.detail);
			},
			inputBlur(e) {
				this.isFocus = false;
				this.$emit('blur', e.detail);
			},
			inputChange(e) {
				console.log('@@@');
				this.searchText = e.detail.value;
				this.$emit('input', e.detail);
				console.log('111');
			},
			search() {
				console.log('搜索');
				this.$emit('search', {
					value: this.searchText
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.search-container {
		position: relative;
		display: flex;
		align-items: center;
		overflow: hidden;
		max-width: 300px;
	}

	.search-box {
		width: 100%;
		border: 1px solid #ccc;
		transition: all .2s ease-in-out;
		box-sizing: border-box;
	}

	.transition {
		transition: all .2s ease-in-out;
	}

	.search-input {
		position: relative;
	}

	.search-icon {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		color: #ccc;
	}

	.search-field {
		box-sizing: border-box;
		border: none;
		outline: none;
		font-size: 32rpx;
		padding-left: 30px;
		width: 100%;
		height: 100%;
	}

	.search-btn {
		position: absolute;
		z-index: 2000;
		right: 0;
		width: 180rpx;
		height: 100%;
		line-height: 100%;
		transition: all .3s ease-in-out;
		transform: translateX(100%);
		text-align: center;

		text {
			position: absolute;
			left: 20%;
			top: 50%;
			transform: translate(-20%, -50%);
		}
	}

	.search-btn-focus {
		right: calc(-10%);
		margin-left: 20rpx;
		transform: translateX(0);
		transition: all .3s ease-in-out;
	}
</style>