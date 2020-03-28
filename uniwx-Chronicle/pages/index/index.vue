<template>
	<view class="content">
		<addTask :isShow="isShowAdd" @isShow="showAdd" @addThing="add" :resetValue="resetV" :resetIndex="resetI" ref="addTaskVal" @resetFinish="resetFinish" :isAddorReset="isAddorReset"></addTask>

		<view class="head">
			<image src="../../static/back1.jpg" class="auto-img"></image>
			<view class="dateWeather">
				<view class="item" >
					<view class="weatherIcon">
						<image :src='"../../static/cond-icon-heweather/" + (code==0 ? "100" : code) +".png"' class="auto-img">
					</view>
					<view class="date">
						{{new Date().getMonth()+1}}月{{new Date().getDate()}}日
					</view>
					<view class="ratebox">
						<van-rate class="rate" value="3" bind:change="onChange" size="6px" />
					</view>
					<view class="locatioin">
						<view class="icon">
							<van-icon name="location-o" color="#ff0000" />
						</view>
						<view class="text">
							{{nowLocation.province}}{{nowLocation.city}}
						</view>
					</view>
				</view>
				<view class="item weather">
					<view class="temperature">
						{{getWeather.data.HeWeather6[0].now.tmp}}&#176;
					</view>
					<view class="w">
						天气&nbsp;&nbsp;{{getWeather.data.HeWeather6[0].now.cond_txt}}
					</view>
					<view class="f">
						{{getWeather.data.HeWeather6[0].now.wind_dir}}&nbsp;&nbsp;风力{{getWeather.data.HeWeather6[0].now.wind_sc}}级
					</view>
				</view>
			</view>
			<!-- <view class="percent">
				<view style="font-size: 14px;font-weight: 600;">
					完成度
				</view>
				<view class="percentNum">
					100%
				</view>
				<view></view>
			</view> -->

			<canvas  :class="isShowAdd?'canvas hide':'canvas show'" style="width: 60px; height: 60px;" canvas-id="firstCanvas" @click="showAdd">
			</canvas>

		</view>
		<view class="main">
			<h2>任务列表</h2>
		</view>
		<van-tabs animated type="card">
			<van-tab title="全部">
				<view style="padding: 15px;">
					<van-collapse :value="activeName" @change="onChange">
						<van-collapse-item v-for="(value,index) in todoList" :key="index"  >
							<view slot="title">{{value.text}}</view>
							<view slot="icon">
								<van-icon name="shop-o" :color="value.isComplete?'#06ff06':''"></van-icon>
							</view>
							<view>{{value.desc}}</view>
							<view class="funBtn">
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="primary" @click="complete(index)" :disabled="value.isComplete">{{value.isComplete?"已完成":"完成"}}</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="warning" @click="reset(value,index)" :disabled="value.isComplete">修改</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="danger" @click="del(index)">删除</van-button>
							</view>
						</van-collapse-item>
					</van-collapse>
				</view>
			</van-tab>
			<van-tab title="已完成">
				<view style="padding: 15px;">
					<van-collapse :value="activeName" @change="onChange">
						<van-collapse-item v-for="(value,index) in todoList" :key="index"  :name="index" v-if="value.isComplete">
							<view slot="title">{{value.text}}</view>
							<view slot="icon">
								<van-icon name="shop-o" :color="value.isComplete?'#06ff06':''"></van-icon>
							</view>
							<view>{{value.desc}}</view>
							<view class="funBtn">
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="primary" @click="complete(index)" :disabled="value.isComplete">{{value.isComplete?"已完成":"完成"}}</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="warning" @click="reset(value,index)" :disabled="value.isComplete">修改</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="danger" @click="del(index)" >删除</van-button>
							</view>
						</van-collapse-item>
					</van-collapse>
				</view>
			</van-tab>
			<van-tab title="未完成">
				<view style="padding: 15px;">
					<van-collapse :value="activeName" @change="onChange">
						<van-collapse-item v-for="(value,index) in todoList" :key="index"  :name="index" v-if="!value.isComplete">
							<view slot="title">{{value.text}}</view>
							<view slot="icon">
								<van-icon name="shop-o" :color="value.isComplete?'#06ff06':''"></van-icon>
							</view>
							<view>{{value.desc}}</view>
							<view class="funBtn">
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="primary" @click="complete(index)" :disabled="value.isComplete">{{value.isComplete?"已完成":"完成"}}</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="warning" @click="reset(value,index)" :disabled="value.isComplete">修改</van-button>
								<van-button icon="https://img.yzcdn.cn/vant/logo.png" size="mini" type="danger" @click="del(index)" >删除</van-button>
							</view>
						</van-collapse-item>
					</van-collapse>
				</view>
			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	import addTask from "../../components/addTask.vue";
	import {
		getTemplateTimeString
	} from "../../tool.js";
	let that = this;
	export default {
		data() {
			return {
				title: 'Hello',
				todoList: [{
					desc: getTemplateTimeString(new Date().getTime(), 'yyyy/MM/dd hh:mm:ss'),
					text: "打球打球打球打球打球打球",
					isComplete: false
				}],
				isShowAdd: false,
				active: 2,
				activeName: ['1'],
				getWeather: {},
				nowLocation: {},
				code: 0,
				dur: {
					enter: 300,
					leave: 1000
				},
				resetV:"",
				resetI:0,
				isAddorReset:false
			}
		},
		components: {
			addTask
		},
		onReady:function(){
			console.log("onReady")
			this.draw()
		},
		onLoad() {
			console.log("onLoad")
			let that = this;
			
			// 获取当前定位
			this.getLocation().then(function(res) {
				// 获取和风天气的天气情况
				let loca = res.lat + "," + res.lng;
				uni.request({
					url: "https://api.heweather.net/s6/weather/now",
					data: {
						location: loca,
						key: "f6185842beea4a19882c397ce41b1c5e"
					},
					success: function(result) {
						that.code = Number(result.data.HeWeather6[0].now.cond_code);
						that.getWeather = result;
					}
				})
			})


			// 获取当前操作所需要的服务商
			// uni.getProvider({
			// 	service:"oauth",
			// 	success:function(data){
			// 		console.log(data);
			// 	}
			// })

			// 登录
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
		},
		onHide() {
			this.draw();
			console.log("onHide")
		},
		onShow() {
			console.log("onShow")
		},
		methods: {
			add(obj) {
				this.showAdd();
				this.todoList.push(obj);
			},
			complete(index) {
				console.log("index",index)
				this.todoList[index].isComplete = true; 
				console.log(this.todoList)
			},
			reset(value,index) {
				let that = this;
				this.resetValuePromise(value,index).then(function(){
					that.$refs.addTaskVal.changeChildVal();
					that.showAdd();
					that.isAddorReset = true;
				})
				
			},
			resetFinish(obj){
				this.showAdd();
				this.todoList[obj.index] = obj.obj
			},
			resetValuePromise(value,index){
				let that = this;
				return new Promise(function(resolve,reject){
						that.resetV = value.text;
						that.resetI = index
						resolve(that.resetV)
				})
			},
			del(currentIndex) {
			 this.todoList = this.todoList.filter(function(element,index){
					return currentIndex != index ? element : "";
				})
			this.activeName = [];
			},
			getWH(className) {
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().select(className).boundingClientRect(function(WH) {
						resolve(WH)
					}).exec();
				})
			},
			showAdd() {
				if (!this.isShowAdd) {
					this.isShowAdd = true;
					this.isAddorReset = false;
				} else {
					this.isShowAdd = false;
				}
			},
			getLocation() {
				let that = this;
				return new Promise(function(resolve, reject) {
					uni.request({
						url: "https://apis.map.qq.com/ws/location/v1/ip",
						data: {
							key: "G3DBZ-IWT3X-3LC4S-7O5WT-MS4BS-WQFPN"
						},
						success: function(result) {
							that.nowLocation = result.data.result.ad_info;
							resolve(result.data.result.location)
						}
					})
				})
			},
			onChange(e) {
				this.activeName = e.detail
			},
			draw() {
			let context = uni.createCanvasContext("firstCanvas");

			this.getWH(".canvas").then(function(data) {
				// 获取画布的大小
				let W = data.width;
				let H = data.height;
				console.log(W);
				console.log(H);

				let n = 0;

				// 初始化角度
				let initDeg = 180;

				// 半径
				let r = 25;

				// 百分比
				let percent = 1;

				function drawCanvas() {
					// 实心圆
					context.beginPath();
					context.setFillStyle("#333333");
					context.arc(30, 30, 20, 0, 2 * Math.PI, true)
					context.fill();
					context.closePath();
					// x线
					context.setStrokeStyle("#fff");
					context.setLineWidth(2);
					context.moveTo(17.5, 30);
					context.lineTo(42.5, 30);
					context.stroke();
					// y线
					context.setStrokeStyle("#fff");
					context.setLineWidth(2);
					context.moveTo(30, 17.5);
					context.lineTo(30, 42.5);
					context.stroke();

					// 动态圆
					context.beginPath();
					context.setStrokeStyle("#04d5fa");
					context.setLineWidth(9);
					// context.moveTo(55,30);
					// context.moveTo(W / 2 + Math.cos((initDeg + n) / 180 * Math.PI) * r + 25,H / 2 + Math.sin((initDeg + n) / 180 * Math.PI) * r)
					context.arc(30, 30, 25, initDeg / 180 * Math.PI, (initDeg + 180) / 180 * Math.PI, false);
					context.stroke();
					context.closePath()

					context.draw();
				}

				drawCanvas();

				// let timer = setInterval(function() {
				// 	n++;
				// 	if (initDeg + n == 360) {
				// 		console.log(n)
				// 		clearInterval(timer)
				// 	}
				// 	context.clearRect(0, 0, W, H);
				// 	drawCanvas();
				// }, 10);
			})
		}
		}
	}
</script>

<style lang="scss">
	.content {
		.head {
			position: relative;
			width: 100%;
			height: 150px;
			z-index: 0;

			.canvas {
				position: absolute;
				bottom: -30px;
				right: 5px;
				border-radius: 100%;
				background-color: #fff;
				z-index: 8;
			}
			.hide{
				display:none;
			}
			.show{
				display: block;
			}
			.dateWeather {
				position: absolute;
				top: 0;
				left: 0;
				width: calc(100% - 65px);
				height: 150px;
				z-index: 80;
				display: flex;

				.item {
					flex: 1;
				}
			}

			.weatherIcon {
				width: 50px;
				height: 50px;
			}

			.date {
				font-size: 25px;
				color: #000000;
				text-align: center;
			}

			.weather {
				text-align: center;

				.temperature {
					font-size: 36px;
					margin-top: 38px;
					font-family: "微软雅黑";
				}

				.w {
					font-size: 15px;
				}

				.f {
					font-size: 9px;
				}
			}

			.locatioin {
				display: flex;
				width: 100%;
				font-size: 13px;
				justify-content: center;

				.icon {
					vertical-align: text-bottom;
					width: 13px;
					height: 17px;
				}
			}

			.ratebox {
				display: flex;
				justify-content: center;
			}

			.percent {
				position: absolute;
				display: flex;
				flex-direction: column;
				// width: 65px;
				width: 100%;
				height: 150px;
				top: 0;
				right: 0;
				background-color: rgba(255, 255, 255, 0.5);
				z-index: 8;

				view {
					flex: auto 1;
					margin-right: 9px;
					display: -webkit-box;
					display: -moz-box;
					display: -ms-flexbox;
					display: -webkit-flex;

					display: flex;
					-webkit-box-align: flex-end;
					/*旧版本*/
					-moz-box-align: flex-end;
					/*旧版本*/
					-ms-flex-align: flex-end;
					/*混合版本*/
					-webkit-align-items: flex-end;
					/*新版本*/
					align-items: flex-end;
					/*新版本*/
					justify-content: flex-end;
				}
			}

			.percentNum {
				font-size: 28px;
			}
		}

		.main {
			width: 100%;
			height: 30px;
			padding: 0 15px;
			line-height: 30px;
		}

		.funBtn {
			float: right;
			overflow: hidden;
			margin-bottom: 5px;

			van-button {
				margin-right: 5px;

				&:last-child {
					margin-right: 0px;
				}
			}

		}

		.van-tabs__nav--card {
			border-color: #4CD964;
		}

		.van-tabs__nav--card .van-tab {
			border-color: #4CD964;
			color: #000;
		}

		.van-tabs__nav--card .van-tab.van-tab--active {
			background-color: #4CD964;
		}

		.auto-img {
			width: 100% !important;
			height: 100% !important;
		}
	}

	.van-divider {
		margin: 0 !important;
	}

	.van-tabs__line {
		background-color: #4CD964 !important;
	}

	.van-cell {
		padding: 10px 0 !important;
	}
</style>
