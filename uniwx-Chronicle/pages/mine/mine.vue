<template>
	<view>
		<view class="header">
			<view class="item avatarImg">
				<view v-if="JSON.stringify(userInfo) === '{}'">
					<van-loading style="margin-left:9px; margin-top: 9px;" type="spinner" color="#1989fa"/>
				</view>
				<image v-if="JSON.stringify(userInfo) != '{}'"  :src="userInfo.avatarUrl"  class="auto-img"></image>					
			</view>
			<view class="item userName">
				{{userInfo.nickName}}
			</view>
		</view>
		<view style="padding: 10px; ">
			“日程”，是对一天中计划安排的记录。在这个日程小程序中，可以根据一天的天气情况进行安排每日计划，还可以通过搜索某个地址的天气情况，查看计划中的地址的天气情况，可以协助客户确定该计划是否能顺利进行。
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				userInfo:{}
			}
		},
		onLoad() {
			// 获取当前操作所需要的服务商
			// uni.getProvider({
			// 	service:"oauth",
			// 	success:function(data){
			// 		console.log(data);
			// 	}
			// })
			
			// // 登录
			// uni.login({
			// 	provider: "weixin",
			// 	success: function(authResult) {
			// 		console.log(authResult)
			// 		if (authResult.code) {
			// 			uni.request({
			// 				url:"https://api.weixin.qq.com/sns/jscode2session",
			// 				data:{
			// 					appid:"wxedc3e37730c854a7",
			// 					secret:"6338da0be84fbb45318cb7e9569499c1",
			// 					js_code:authResult.code,
			// 					grant_type:"authorization_code"
			// 				},
			// 				success:function(obj){
			// 					 console.log(obj)
			// 				}
			// 			})
			// 		}
			// 	}
			// })
			let that = this;
			uni.getUserInfo({
				success:function(result){
					console.log(result)
					that.userInfo = result.userInfo
				}
			})
		}
		
		
	}
</script>

<style lang="scss">
	.auto-img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.header{
		display: flex;
		width: 100%;
		height: 100px;
		padding: 20px 0;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid #C0C0C0;
		background-color: rgba(0,0,0,0.1);
		.item{
			// flex: auto;
		}
		.avatarImg{
			width: 60px;
			height: 60px;
			border-radius: 100%;
			overflow: hidden;
			border: 1px solid #333333;
		}
	}
</style>
