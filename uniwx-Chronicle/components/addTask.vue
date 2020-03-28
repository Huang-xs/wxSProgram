<template>
	<van-transition :show="isShow" name="fade">
		<view class="contain">
			
			<van-cell-group>
				<van-field :value="value" center clearable autosize placeholder="请输入要添加的事件" border="false" use-button-slot left-icon="add-o"
				 @change="changeVal">
				</van-field>
			</van-cell-group>
			<van-cell title="请选择完成时间" icon="clock-o" :value="currentDate" is-link @click="showPopup" />
			<van-popup :show="show" position="bottom" custom-style="height: 100%;" >
				<van-datetime-picker type="datetime" :value="currentDate" :min-date="minDate" :max-date="maxDate" @input="onInput"
				@confirm="onClose"  @cancel="onClose" />
			</van-popup>

			<view class="btn">
				<van-button slot="button" size="small" type="primary" @click="confirm" :disabled="isAddorReset">添加</van-button>
				<van-button slot="button" size="small" type="info" @click="reset" :disabled="!isAddorReset">更新</van-button>
				<van-button slot="button" size="small" type="warning" @click="cancel">取消</van-button>
			</view>
			
			
		</view>
		<van-toast id="van-toast" />
	</van-transition>
</template>

<script>
	
	// import {getTemplateTimeString} from "../tool.js";
	import Toast from '@/wxcomponents/vant/dist/toast/toast';
	
	export default {
		props:["isShow","resetValue","resetIndex","isAddorReset"],
		data() {
			return {
				value: '',
				show: false,
				minDate:new Date().getTime(),
				maxDate:new Date(2025,10,1).getTime(),
				currentDate:new Date().getTime(),
			}
		},
		// watch:{
		// 	 currentDate(newVal){
		// 		this.currentDate =  getTemplateTimeString(newVal,'yyyy/MM/dd hh:mm');
		// 	}
		// },
		methods: {
			changeChildVal(){
				console.log(this.resetValue)
				this.value = this.resetValue
			},
			getValue() {
				console.log(this.value)
			},
			changeVal(e) {
				this.value = e.detail;
				console.log(this.value)
			},
			confirm(){
				console.log(this.resetValue)
				let thing = {
					text:this.value,
					desc:this.currentDate,
					isComplete: false,
					isDel: false
				};
				if(this.value == ""){
					Toast({
						message:'添加的内容或时间不能为空！',
						selector: '#van-toast',
						context:this
					});
					// Toast('添加内容或时间不能为空');
					return;
				}
				this.$emit("addThing",thing);
				this.value = ""
			},
			reset(){
				let obj = {
					text:this.value,
					desc:this.currentDate,
					isComplete: false,
					isDel: false
				}
				this.$emit("resetFinish",{index:this.resetIndex,obj:obj})
				this.value = "";
			},
			cancel() {
				this.$emit("isShow");
				this.value = ""
			},
			showPopup() {
				console.log(this.show)
				this.show = true;
			},
			onClose() {
				console.log(this.show)
				this.show = false;
			},
		    onInput(e){
				let time = e.detail;
				this.currentDate = time ;
				// this.currentDate = getTemplateTimeString(time,'yyyy/MM/dd hh:mm');
			}
		}
	}
</script>

<style lang="scss">
	.contain {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: #fff;
		z-index: 100 !important;
		padding: 0 10px;

		.btn {
			display: flex;
			justify-content: space-between;
			margin-top: 10px;

			van-button {
				flex: 0 0 1;
			}
		}
	}
</style>
