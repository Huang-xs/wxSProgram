<template>
	<view>
		<van-search :value="value" placeholder="请输入搜索关键词" use-action-slot @change="onChange" @search="onSearch">
			<view slot="action" @tap="onClick">搜索</view>
		</van-search>
		<view class='tip' v-if="hearlyWeather.length == 0">
			暂无天气情况，请输入地址进行搜索！
		</view>

		<view v-if="hearlyWeather.length != 0">
			{{hearlyWeather[0].time.split(" ")[0]}}
			<van-grid square>
				<van-grid-item use-slot v-for="(value,index) in hearlyWeather" :key="index" v-if="value.time.split(' ')[0] === hearlyWeather[0].time.split(' ')[0]">
					<view class="time">
						{{value.time.split(" ")[1]}}
					</view>
					<view>
						<image style="width: 28px; height: 28px;" :src="`../../static/cond-icon-heweather/${value.cond_code}.png`" />
					</view>
					<view style="font-size: 12px;">
						{{value.tmp}}&#176;&nbsp;&nbsp;{{value.cond_txt}}
					</view>
				</van-grid-item>
			</van-grid>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: "",
				hearlyWeather: []
			}
		},
		methods: {
			onChange(e) {
				this.value = e.detail;
			},
			onSearch() {
				let that = this
				uni.request({
					url: "https://api.heweather.net/s6/weather/hourly",
					data: {
						location: this.value,
						key: "f6185842beea4a19882c397ce41b1c5e"
					},
					success: function(result) {
						console.log(result)
						that.hearlyWeather = result.data.HeWeather6[0].hourly;
					}
				})
			},
			onClick() {
				let that = this
				uni.request({
					url: "https://api.heweather.net/s6/weather/hourly",
					data: {
						location: this.value,
						key: "f6185842beea4a19882c397ce41b1c5e"
					},
					success: function(result) {
						console.log(result)
						that.hearlyWeather = result.data.HeWeather6[0].hourly;
					}
				})
			}
		}
	}
</script>

<style>
	.tip {
		text-align: center;
	}
</style>
