<!-- 富文本 -->
<template>
	<view class="rich-wrap">
		<view class="content_box">
			<uParse :content="richText || ''" />
		</view>
	</view>
</template>

<script>
	import marked from '@/components/uni/marked/index.js'
	import uParse from '@/components/uni/uParse/src/wxParse'
	export default {
		components: {
			uParse
		},
		data() {
			return {
				richText: `<div class=WordSection1>

<h1 class=MsoTitle style="text-align:center;margin-top:0"><span lang=ZH-CN>充值协议</span></h1>

<p class=MsoNormal style='text-indent:22.0pt;line-height:115%'><span
lang=ZH-CN>欢迎您使用泽尔智能水表小程序平台提供的软件及服务！</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>为使用益华数字科技有限公司（以下简称</span>“<span lang=ZH-CN>益华数字</span>”<span
lang=ZH-CN>或</span>“<span lang=ZH-CN>益华</span>”<span lang=ZH-CN>）提供的泽尔智能水表小程序平台（以下简称</span>“<span
lang=ZH-CN>本平台</span>”<span lang=ZH-CN>或</span>“<span lang=ZH-CN>泽尔智能水表管家</span>”<span
lang=ZH-CN>）软件及服务（以下简称</span>“<span lang=ZH-CN>本服务</span>”<span lang=ZH-CN>），您应当阅读并遵守《泽尔智能水表管家充值协议》（以下简称</span>“<span
lang=ZH-CN>本协议</span><span lang=ZH-CN>）。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>请您务必审慎阅读、充分理解各条款内容，特别是免除或限制责任的相应条款，并选择接受或不接受。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>除非您已阅读并接受本协议所有条款，否则您无权使用本平台及相关服务。您的立即充值或立即支付行为即视为您已阅读并同意上述协议的约束。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>本协议下的条款可由益华数字科技随时变更，用户须定期审阅本协议。协议条款一旦发生变动，益华数字科技将会在本页面进行更新，并在泽尔智能水表管家相关的页面上提示变更内容。变更后的协议一经公布即有效代替原来的协议。用户如不同意益华数字科技对本协议所作的任何变更，应立即停止使用益华数字科技提供的泽尔智能水表管家软件及服务。如用户在本协议变更后继续使用泽尔智能水表管家软件及服务，即视作用户已完全同意变更后的协议。用户可随时在本页面查阅最新的充值规则。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>本协议是您与益华数字科技之间关于您在泽尔智能水表管家中使用包含但不限于查看、充值等功能的相关事宜所订立的协议。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>您有违反本协议的任何行为时，益华数字科技有权依照违反情况，随时单方限制、中止或终止向您提供本服务，并有权追究您的相关责任。</span></p>

<h2 style='margin-left:23.1pt;text-indent:-23.1pt'>一、<span style='font:7.0pt "Times New Roman"'>&nbsp;&nbsp;
</span><span lang=ZH-CN>定义</span></h2>

<p class=MsoNormal style='text-indent:22.0pt'>1.1 <span lang=ZH-CN>泽尔智能水表管家：是指泽尔智能水表管家的开发者益华数字科技向用户提供的水量或余额的充值工具，同时为用户提供包括但不限于抄表、查看数据、充值等功能的服务软件。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>1.2 <span lang=ZH-CN>用户：是指启用、浏览数据或充值的用户，在本协议中更多的称为</span>“<span
lang=ZH-CN>您</span>”<span lang=ZH-CN>。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>1.3 <span lang=ZH-CN>管理员是指启用、浏览数据、充值或管理的用户，在本协议中更多的称为</span>“<span
lang=ZH-CN>供水方”。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>1.4 <span lang=ZH-CN>充值金额：您通过泽尔智能水表管家充值水量丶或余额向供水方实际支付的金额</span>(<span
lang=ZH-CN>人民币</span>)<span lang=ZH-CN>。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>1.5 <span lang=ZH-CN>代币金额：您在泽尔智能水表管家充值水量丶支付或显示的虚拟代币余额，代币由供水方充值获得，用户无法直接充值代币。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>1.6 <span lang=ZH-CN>服务费：您在充值时需要承担的服务费，服务费为</span>0.6%<span
lang=ZH-CN>由微信丶支付宝或第三方服务平台收取。</span></p>

<h2><span lang=ZH-CN>二、充值规则</span></h2>

<h3>2<span lang=ZH-CN>．</span>1<span lang=ZH-CN>充值</span></h3>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.1 <span lang=ZH-CN>用户理解并同意，充值的金额或代币可用于支付绑定在本平台上的水表对应的供水方的水量，但不可用于转移、转赠。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.2 <span lang=ZH-CN>用户理解并同意充值的金额或代币不支持七天无理由退换，充值一旦成功，充值即确定完成，益华数字科技将不提供任何更改、修正服务。代币余额未使用部分，不能直接通过本平台退款，需要用户和供水方在线下协商退款，然后通过供水方在本平台的管理端清零代币余额。由供水方发起的代币清零，益华数字科技不提供任何的更改、修正服务，需要用户与供水方自行协商。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.3 <span lang=ZH-CN>当用户在本平台进行充值时，您若对充值的金额、代币，支付购买供水方的水量存有异议和问题，请您根据具体实际情况并提供相关证据，直接联系供水方进行线下协商处理，此类事件与泽尔智能水表管家运营方益华数字科技无关。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.4 <span lang=ZH-CN>用户必须仔细确认自已充值的水表信息（包含但不限于水表名称、安装位置、单价等）是否正确，若因为用户自身操作不当、不了解或未充分了解充值计费方式等因素造成充错水表或错选充值种类等情形而损害自身权益，不得因此要求益华数字科技作任何补偿或赔偿。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.5 <span lang=ZH-CN>用户在充值水量或余额时，立即支付后需要在第三方支付企业提供的支付完成页面上点击</span>“<span
lang=ZH-CN>完成</span><span lang=ZH-CN>或</span>“<span lang=ZH-CN>返回</span>&quot;<span
lang=ZH-CN>按钮，确保水量或余额成功的充值到该水表里。因用户没有点击第三方企业提供的支付完成页面上点击</span>“<span
lang=ZH-CN>完成</span><span lang=ZH-CN>或</span>“<span lang=ZH-CN>返回</span><span
lang=ZH-CN>按钮，以及充值后直接退出泽尔智能水表管家导致水量或余额没有成功充值到该水表里造成的损失益华数字科技不承担任何补偿或赔偿。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.6 <span lang=ZH-CN>用户在充值时使用第三方支付企业提供的服务时，应当遵守与该第三方的各项协议及其服务规则；在使用第三方支付服务过程中，用户应当妥善保管个人信息，包括但不限于银行卡账号、密码、验证码等；用户同意并确认，益华数字科技对因第三方支付服务产生的纠纷不承担任何责任，且不承担任何补偿或赔偿。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.7 <span lang=ZH-CN>若因违反本协议条款，导致账号被冻结及</span>/<span
lang=ZH-CN>或终止使用的用户，不得因此要求益华数字科技作任何补偿或赔偿，也不得追益华数字科技任何责任。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.7 <span lang=ZH-CN>若因本平台充值系统自身充值故障原因，造成用户充值失实，在益华数字科技恢复丶存有有效数据和用户提供台法有效凭证的情况下，益华数字科技将根据以上证据，尽力配合用户充值情况作出变动及补救措施，但益华数字科技不就此做出保证。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.8 <span lang=ZH-CN>若因本平台充值系统自身故障原因，造成系统充值金额大于用户实际充值额的，益华数字科技有权追回差额。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.9 <span lang=ZH-CN>代币是在本平台专用的虚拟币，用于供水方的水量服务。鉴于本平台提供的服务性质特殊，因此使用代币在本平台上买供水方的水量属于不宜退货的种类，不适用无理由退换规定。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.10 <span lang=ZH-CN>本平台支付系统会在不通知您的情况下，不定时更新发布其他支付工具，包括但不限于</span>“<span
lang=ZH-CN>代币</span>'<span lang=ZH-CN>。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.1.11 <span lang=ZH-CN>充值后对于需要开具发票的用户，需向供水方索要发票，用户充值金额直接到供水方账户，本平台没有开具发票的义务。</span></p>

<h3>2<span lang=ZH-CN>．</span>2<span lang=ZH-CN>充值方式</span></h3>

<p class=MsoNormal style='text-indent:22.0pt'>2.2.1<span lang=ZH-CN>线上充值：您通过本平台在线直接充值。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'>2.2.2<span lang=ZH-CN>线下充值：您通过供水方线下支付现金，由供水方直接对水表充值金额。或由供水方充值代币，然后您通过泽尔智能水表管家代币余额，再进行水表的充值。</span></p>

<h2><span lang=ZH-CN>三、业务应用范围</span></h2>

<p class=MsoNormal style='text-indent:22.0pt'>3.1 <span lang=ZH-CN>本平台提供的充值相关的服务仅适用于出租房、公寓、小区、宿舍等场景的水表预付费活动，对应着充值金额的水量数值，一旦进入对应充值的水表后，本平台不负责会对具体用水人员或者设备，做任何的辨别和控制。因此本平台提供的服务不适合其他业务场景，包括但不限于</span>___<span
lang=ZH-CN>等。若因为用户自身使用不当、不了解或充分了解本平台所能提供的服务场景等情形而损害自身权益，不得因此要求益华数字科技作任何补偿或赔偿。</span></p>

<p class=MsoNormal style='text-indent:22.0pt'><span lang=ZH-CN>同时本平台也不对设备本身的出厂数值、水量快慢、误差、精度等负责，如出现此类问题，用户或管理员需直接联系水表等设备的生产厂家或提供方，进行解决。由此等情形而损害自身权益，不得因此要求益华数字科技作任何补偿或赔偿。</span></p>

<h2><span lang=ZH-CN>四、保证与承诺</span></h2>

<p class=MsoNormal style='text-indent:22.0pt'>4.1 <span lang=ZH-CN>您完全理解并同意本平台提供的充值相关的服务活动仅适用于正当、台法使用我们服务的用户。一旦发现您的用户账号存在任何利用前述规则开展涉及洗钱、诈骗、赌博等违法及</span>/<span
lang=ZH-CN>或违约行为，以获得不正当经济利益的情形，益华数字科技有权冻结或关闭您的用户账号以及任何其他与违法及违约行为相关的用户账号、追回因违法及</span>/<span
lang=ZH-CN>或违约行为取得的所有不正当的经济利益，并且益华数字科技保留停止向您提供泽尔智能水表管家的软件及服务，以及根据法律或违约行为的严重程度进一步追究法律责任的权利。</span></p>

</div>`,
				id: '',
			};
		},
		onLoad(options) {
			this.id = options.id
			// options.id && this.getRichText();
		},
		methods: {
			getRichText() {
				this.$g.tui.request('common.richText', {
					id: this.id
				}).then(res => {
					if (res.code === 1) {
						this.richText = res.data;
						uni.setNavigationBarTitle({
							title: res.data.title
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	.content_box {
		background: #fff;
		padding: 0 30rpx 30rpx;
	}
	 /* Font Definitions */
	 @font-face
		{font-family:"Cambria Math";
		panose-1:2 4 5 3 5 4 6 3 2 4;}
	@font-face
		{font-family:DengXian;
		panose-1:2 1 6 0 3 1 1 1 1 1;}
	@font-face
		{font-family:"\@DengXian";
		panose-1:2 1 6 0 3 1 1 1 1 1;}
	@font-face
		{font-family:Monaco;
		panose-1:0 0 0 0 0 0 0 0 0 0;}
	 /* Style Definitions */
	 p.MsoNormal, li.MsoNormal, div.MsoNormal
		{margin-top:3.0pt;
		margin-right:0in;
		margin-bottom:3.0pt;
		margin-left:0in;
		line-height:130%;
		layout-grid-mode:char;
		font-size:11.0pt;
		font-family:DengXian;
		color:#333333;}
	h1
		{margin:0in;
		line-height:170%;
		page-break-after:avoid;
		layout-grid-mode:char;
		font-size:18.0pt;
		font-family:DengXian;
		color:#1A1A1A;}
	h2
		{margin:0in;
		line-height:170%;
		page-break-after:avoid;
		layout-grid-mode:char;
		font-size:16.0pt;
		font-family:DengXian;
		color:#1A1A1A;}
	p.MsoTitle, li.MsoTitle, div.MsoTitle
		{margin:0in;
		text-align:center;
		line-height:170%;
		page-break-after:avoid;
		layout-grid-mode:char;
		font-size:24.0pt;
		font-family:DengXian;
		color:#1A1A1A;
		font-weight:bold;}
	.MsoChpDefault
		{font-family:DengXian;
		color:#333333;}
	.MsoPapDefault
		{margin-top:3.0pt;
		margin-right:0in;
		margin-bottom:3.0pt;
		margin-left:0in;
		line-height:130%;
		layout-grid-mode:char;}
	 /* Page Definitions */
	 @page WordSection1
		{size:595.25pt 841.9pt;
		margin:68.05pt 70.85pt 68.05pt 70.85pt;}
	div.WordSection1
		{page:WordSection1;}
	 /* List Definitions */
	 ol
		{margin-bottom:0in;}
	ul
		{margin-bottom:0in;}

</style>