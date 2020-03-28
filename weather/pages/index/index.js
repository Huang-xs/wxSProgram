// pages/index/index.js
var that;
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
        key: 'G3DBZ-IWT3X-3LC4S-7O5WT-MS4BS-WQFPN' // 必填
});
Page({

        /**
         * 页面的初始数据
         */
        data: {
                ipt_value: "",
                //是否将数据存储到缓存中
                flag: false
        },

        finish: function(res) {
                console.log(res.detail.value);

                if (res.detail.value.indexOf("市") != -1 || res.detail.value.indexOf("区") != -1) {
                        wx.showToast({
                                title: '城市名称不要带市和区',
                        })
                } else {
                        that.getOneWeather(res.detail.value);
                        that.getAllWeather(res.detail.value);
                }

                that.setData({
                        ipt_value: ""
                })
        },
        // 逆地址解析
        get_city: function() {
                qqmapsdk.reverseGeocoder({
                        success: res => {
                                that.setData({
                                        flag: true
                                })

                                var city = res.result.address_component.district.slice(0, -1);
                                that.getOneWeather(city);
                                that.getAllWeather(city);
                        },
                        fail: err => {
                                wx.showModal({
                                        title: '小程序需要定位权限',
                                        content: '你的位置信息将用于获取当前城市的天气',
                                        cancelText: "不需要",
                                        confirmText: "去授权",
                                        success: function(res) {
                                                // 用户不给权限
                                                if (res.cancel) {
                                                        that.get_city()
                                                } else {
                                                        wx.openSetting({
                                                                complete: () => {
                                                                        that.get_city()
                                                                }
                                                        })
                                                }
                                        }
                                })
                        }
                })
        },
        getOneWeather: function(c) {
                wx.request({
                        url: "https://tianqiapi.com/api",
                        method: "GET",
                        data: {
                                appid: 82724474,
                                appsecret: "hrtg9YNe",
                                version: "v6",
                                city: c
                        },
                        dataType: "json",
                        success: res => {
                                console.log(res);

                                if (that.data.flag) {

                                        // 缓存的过期时间
                                        wx.setStorage({
                                                key: "out_time",
                                                data: Date.parse(new Date()) + 1800000
                                        })

                                        // 实况天气
                                        wx.setStorage({
                                                key: "oneweather",
                                                data: res.data
                                        })
                                        // that.setData({
                                        //         flag: false
                                        // })
                                } else {
                                        that.setData({
                                                one: res.data
                                        })
                                }
                        },
                        complete: () => {
                                if(that.data.flag){
                                that.getOneStorage();
                                }
                        }

                });

        },
        // 七日天气
        getAllWeather: function(c) {
                wx.request({
                        url: 'https://tianqiapi.com/api',
                        method: "GET",
                        data: {
                                appid: 86682744,
                                appsecret: "iUfXN1be",
                                version: "v1",
                                city: c
                        },
                        dataType: "json",
                        success: res => {
                                console.error("请求七日天气")
                                console.log("七日天气=>", res);
                                if (that.data.flag) {

                                        wx.setStorage({
                                                key: 'allweather',
                                                data: res.data,
                                        })

                                        // that.setData({
                                        //         flag: false
                                        // })
                                }else{
                                        that.setData({
                                               all:res.data
                                        })  
                                }
                        },
                        complete: () => {
                                if (that.data.flag) {
                                        that.getAllStorage();
                                } else {

                                }
                                
                        }
                })
        },

        // 判断天气缓存是否过期了
        init: function() {
                // 获取缓存信息
                wx.getStorage({
                        key: "out_time",

                        // 有过期时间缓存, res.data是缓存中的过期时间
                        success: res => {
                                // 获取当前时间
                                var nowTime = Date.parse(new Date());
                                if (res.data - nowTime <= 0) {
                                        console.log("缓存过期");
                                        // 重新缓存
                                        // that.getOneWeather();
                                        // that.getAllWeather();
                                        // 逆地址解析
                                        that.get_city();
                                } else {
                                        console.log("获取缓存中的数据");

                                        // 获取缓存中的数据
                                        that.getAllStorage();
                                        that.getOneStorage();
                                }
                        },
                        // 没有过期时间缓存
                        fail: err => {
                                // 重新缓存
                                // that.getOneWeather();
                                // that.getAllWeather();

                                that.get_city()
                        }
                })
        },

        // 拿到缓存中的数据，并且存到data里面
        // 获取一天缓存
        getOneStorage: function() {
                wx.getStorage({
                        key: 'oneweather',
                        success: function(res) {
                                that.setData({
                                        one: res.data
                                })
                                console.log("data中的实况天气 =>", that.data.one);
                        },
                })
        },

        // 获取七天缓存
        getAllStorage: function() {
                wx.getStorage({
                        key: 'allweather',
                        success: function(res) {
                                that.setData({
                                        all: res.data,
                                        date: res.data.update_time.substring(5, 16),
                                        flag:false
                                })

                                // 停止下拉动作
                                wx.stopPullDownRefresh();
                                console.log("data中的7日天气 =>", that.data.all);
                        },
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
                that = this;
                // that.getOneWeather();
                that.init();
                // that.get_city()
                // 调用天气预报
                // that.getOneWeather();
                // that.getAllWeather();
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function() {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function() {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function() {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function() {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function() {
                that.get_city();
        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function() {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function() {

        }
})