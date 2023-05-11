<template>
	<view class="container relative">
		<tui-wing-blank size="large">
			<view class="notice">
				<text class="text-2xl text-bold text-black">绑定银行卡</text>
				<text class="inline-block text-sm thorui-error__color">请绑定银行卡一类卡</text>
				<text class="inline-block text-sm thorui-error__color">绑定非一卡,可能会因转账额度限制导致转账失败</text>
			</view>
			<view class="my-30">
				<tui-form ref="form">
					<tui-form-item :labelWidth="180" background="#FFFFFF000" label="持卡人姓名">
						<input class="tui-input" backgroundColor="#FFFFFF000" placeholder="请输入持卡人姓名"
							placeholder-style="color:#ccc" v-model="form.name" />
					</tui-form-item>
					<tui-form-item :labelWidth="180" background="#FFFFFF000" label="身份证号码">
						<input class="tui-input" backgroundColor="#FFFFFF000" placeholder="请输入身份证号码"
							placeholder-style="color:#ccc" v-model="form.id" />
						<template v-slot:right>
							<!-- <ocr-navigator @onSuccess="sweepCard(0,$event)" certificateType="idCard" :opposite="false">
								<tui-icon name="sweep"></tui-icon>
							</ocr-navigator> -->
							<tui-icon name="sweep" :index="0" @click="sweepCard"></tui-icon>
						</template>
					</tui-form-item>
					<tui-form-item :labelWidth="180" background="#FFFFFF000" label="银行卡号">
						<input class="tui-input" backgroundColor="#FFFFFF000" placeholder="请输入银行卡号"
							placeholder-style="color:#ccc" v-model="form.bankCardNum" />
						<template v-slot:right>
							<!-- <ocr-navigator @onSuccess="sweepCard(1,$event)" certificateType="bankCard"
								:opposite="false">
								<tui-icon name="sweep"></tui-icon>
							</ocr-navigator> -->
							<tui-icon name="sweep" :index="1" @click="sweepCard"></tui-icon>
						</template>
					</tui-form-item>
					<tui-form-item :labelWidth="180" background="#FFFFFF000" label="验证码">
						<input class="tui-input" backgroundColor="#FFFFFF000" placeholder="请输入验证码"
							placeholder-style="color:#ccc" v-model="form.code" />
						<template v-slot:right>
							<!-- 							<tui-button type="gray-primary" width="200rpx" height="64rpx" :size="30"
								bold>获取验证码</tui-button -->
							<tui-countdown-verify color="#07c160" borderColor="#07c160" text="获取验证码"
								:successVal="successVal" @send="send" :params="phone"></tui-countdown-verify>
						</template>
					</tui-form-item>
				</tui-form>
				<view class="text-center mt-40">
					<tui-button margin="0 auto" type="green" width="85%" height="80rpx" @click="submit">绑定</tui-button>
					<text class="inline-block text-xs my-15">银行卡一类卡,该银行个人开通的第一张银行卡</text>
				</view>
			</view>
		</tui-wing-blank>
		<tui-dialog :maskClosable="false" :buttons="buttons" :show="dialogShow" :title="dialogTitle"
			@close="closeDialog" @click="buttonTap">
			<template v-slot:content>
				<view>
					<block v-if="curOcrType==='IDCardOCRFront'">
						<view class="my-15">
							<tui-input padding="10rpx 20rpx" isFillet inputBorder v-model="form.name"></tui-input>
						</view>
						<view class="my-15">
							<tui-input padding="10rpx 20rpx" isFillet inputBorder v-model="form.id"></tui-input>
						</view>
					</block>
					<block v-else>
						<text class="text-bold text-center text-2xl">{{bankName}}</text>
						<view class="my-15">
							<tui-input label="银行卡号" padding="10rpx 20rpx" isFillet inputBorder
								v-model="form.bankCardNum"></tui-input>
						</view>
					</block>
				</view>
			</template>
		</tui-dialog>
		<ocr-plugin :show="ocrShow" :ocrType="curOcrType" :ocrOption="option" :autoMode="false" :fixedSecret="true"
			:getAuthorization="getAuthorization" @success="successCallback" @fail="failCallback" @error="errorCallback"
			:showCancel="true" @cancel="cancelCallback"></ocr-plugin>
	</view>
</template>

<script>
	const credential = {
		secretId: 'AKIDINBj01tVqviETR8XfW6PQAajbCWZLq3z',
		secretKey: 'g5D4exzkFTQ6WeV5OQBfspVv5yavzmIX',
	}
	// 校验规则
	const rules = [{
			name: "name",
			rule: ["required", "minLength:2", "maxLength:16"],
			msg: ["请输入持卡人姓名", "用户名必须2个或以上字符", "姓名不能超过16个字符"]
		}, {
			name: "id",
			rule: ["required", "isIdCard"],
			msg: ["请输入身份证号码", "请输入正确身份证号"]
		},
		{
			name: "bankCardNum",
			rule: ["required"],
			msg: ["请输入银行卡号"],
			validator: [{
				msg: "请输入正确的银行卡号",
				method: (value) => {
					const regex = /^([1-9]{1})(\d{15}|\d{18})$/
					return regex.test(value)
				}
			}]
		},
		{
			name: "code",
			rule: ["required"],
			msg: ["请输入验证码"]
		}
	]
	export default {
		data() {
			return {
				ocrShow: false, //OCR识别窗口
				curOcrType: 'IDCardOCRFront', //当前选择的识别类型
				buttons: [{
					text: '取消'
				}, {
					text: '确定',
					color: '#586c94'
				}],
				dialogShow: false, //确认信息弹框
				form: {
					name: '',
					id: '',
					bankCardNum: '',
					code: '',
				},
				bankName: '',
				phone: '18022439002',
				successVal: 0,
				resetVal: 0,
				color: '#07c160',
			};
		},
		computed: {
			option() {
				let idOption = {
					Config: {
						CropIdCard: true,
					}
				}
				let bankOption = {}
				return this.curOcrType === 'IDCardOCRFront' ? idOption : bankOption
			},
			dialogTitle() {
				return this.curOcrType === 'IDCardOCRFront' ? '请核实您的身份证信息' : '请核实银行卡账号是否正确'
			},
		},
		methods: {
			//表单提交
			submit() {
				this.$refs.form.validate(this.form, rules).then(res => {
					this.$g.tui.toast({
						text: '校验通过！'
					})
				}).catch(errors => {
					console.log(errors)
				})
			},
			//短信验证码
			send(e) {
				//给用户绑定的手机号发短信
				let params = Number(e.params);
				const regex = /^(?:(?:\+|00)86)?1\d{10}$/
				params && (this.color = '#999')
				if (!regex.test(params)) {
					setTimeout(() => {
						this.resetVal++;
						this.$g.tui.toast({
							text: '未正确获取到手机号'
						});
					}, 200);
					return;
				} else {
					//此处写发送短信请求逻辑
					this.$g.tui.toast({
						text: '短信发送成功'
					})
					this.successVal++;
				}
			},
			//扫描回调
			sweepCard({
				index
			}, e, ) {
				console.log(index);
				this.curOcrType = !index ? 'IDCardOCRFront' : 'BankCardOCR'
				this.ocrShow = true
				// console.log(e.detail);
			},
			closeDialog() {

			},
			buttonTap({
				index,
				item
			}) {
				this.showPopup = false
				if (!index) {
					this.dialogShow = false
					return
				}
				this.dialogShow = false
			},
			getAuthorization() {
				return new Promise((resolve, reject) => {
					resolve({
						secretId: credential.secretId,
						secretKey: credential.secretKey,
					});
				});
			},
			successCallback(e) {
				console.log(e.detail);
				if (this.curOcrType === 'IDCardOCRFront') {
					this.dialogShow = true
					this.form.name = e.detail.result.Name
					this.form.id = e.detail.result.IdNum
				} else {
					this.dialogShow = true
					this.bankName = e.detail.result.BankInfo
					this.form.bankCardNum = e.detail.result.CardNo
				}
				//关闭ocr
				this.ocrShow = false
			},

			failCallback(e) {
				console.log(e.detail);
				uni.showModal({
					title: '识别失败，结果是',
					content: JSON.stringify(e.detail),
					showCancel: false,
				});
				this.ocrShow = false
			},

			errorCallback(e) {
				console.log(e);
				uni.showModal({
					title: '识别出错',
					content: JSON.stringify(e.detail),
					showCancel: false,
				});
				this.ocrShow = false
			},

			cancelCallback(e) {
				uni.showModal({
					title: '识别取消',
					showCancel: false,
				});
				this.ocrShow = false
			},
		},
		onLoad() {}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		overflow: hidden;
	}

	.notice {
		display: flex;
		flex-direction: column;
		padding-left: 30rpx;
	}

	.mt-40 {
		margin-top: 40rpx;
	}
</style>