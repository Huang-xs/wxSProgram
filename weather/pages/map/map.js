// pages/map/map.js
var that ;
Page({

        /**
         * 页面的初始数据
         */
        data: {

        },
        click:function(){
                let plugin = requirePlugin('routePlan');
                let key = 'G3DBZ-IWT3X-3LC4S-7O5WT-MS4BS-WQFPN';  //使用在腾讯位置服务申请的key
                let referer = '天气预报定位';   //调用插件的app的名称
                let endPoint = JSON.stringify({  //终点
                        'name': ' ',
                        'latitude': that.data.location.latitude,
                        'longitude': that.data.location.longitude
                });
                wx.navigateTo({
                        url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint+'&navigation = 1'
                });
        },
        getMyLocation:function(){
            wx.getLocation({
                    success: function(res) {
                            console.log(res)
                            that.setData({
                                    location:res
                            })
                    },
                    fail:err=>{

                    }
            })    
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function (options) {
                that = this;
                that.getMyLocation();
        },

        /**
         * 生命周期函数--监听页面初次渲染完成
         */
        onReady: function () {

        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {

        },

        /**
         * 生命周期函数--监听页面隐藏
         */
        onHide: function () {

        },

        /**
         * 生命周期函数--监听页面卸载
         */
        onUnload: function () {

        },

        /**
         * 页面相关事件处理函数--监听用户下拉动作
         */
        onPullDownRefresh: function () {

        },

        /**
         * 页面上拉触底事件的处理函数
         */
        onReachBottom: function () {

        },

        /**
         * 用户点击右上角分享
         */
        onShareAppMessage: function () {

        }
})