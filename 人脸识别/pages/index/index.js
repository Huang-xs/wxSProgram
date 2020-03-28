// pages/index/index.js
var that;
Page({

        /**
         * 页面的初始数据
         */
        data: {
                flag: false
        },
        // 获取token
        get_token: function(base64) {
                wx.request({
                        url: 'https://aip.baidubce.com/oauth/2.0/token',
                        method: "GET",
                        data: {
                                "grant_type": "client_credentials",
                                "client_id": "k6P4GAUucixa7RNcTsFMwLRm",
                                "client_secret": "h2GpIznwpnvDqhX1llimHDmkVrdzQV8N"
                        },
                        dataType: "JSON",
                        success: function(res) {
                                console.log(JSON.parse(res.data).access_token);
                                that.faceId(JSON.parse(res.data).access_token, base64);

                        }
                })
        },
        faceId: function(token, imgUrl) {
                wx.request({
                        url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + token,
                        method: "POST",
                        header: {
                                "Content-Type": "application/json"
                        },
                        data: {
                                image: imgUrl,
                                image_type: "BASE64",
                                face_field: "age,beauty,expression,face_shape,gender,glasses,landmark,landmark150,race,quality,eye_status,emotion,face_type"
                        },
                        success: function(res) {

                                wx.hideLoading();


                                if (!res.data.error_code) {
                                        wx.showToast({
                                                title: '人脸识别成功！',
                                        })

                                        console.log(res)
                                        console.log("图像信息：", res.data.result);
                                        that.setData({
                                                // face_num: res.data.result.face_num,
                                                face_list: res.data.result.face_list[0],
                                                flag: true
                                        })

                                } else if (res.data.error_code == 222202){
                                        wx.showToast({
                                                title: '图片中不包含人脸',
                                                icon:"none"
                                        })
                                }else{
                                        wx.showToast({
                                                title: '人脸识别失败，错误码：'+ res.data.error_code,
                                        })
                                }

                        }
                })
        },
        click: function() {
                wx.chooseImage({
                        count: 1,
                        // 尺寸类型
                        sizeType: ["compressed", "original"],
                        success: function(res) {

                                wx.showLoading({
                                        title: '人脸识别......',
                                })

                                wx.getImageInfo({
                                        src: res.tempFilePaths[0],
                                        success:function(res){
                                                var number = 290 / res.width ;

                                                that.setData({
                                                        n : number
                                                })
                                        }
                                })
                                console.log(res.tempFilePaths[0])
                                var manager = wx.getFileSystemManager();

                                manager.readFile({
                                        filePath: res.tempFilePaths[0],
                                        encoding: "base64",
                                        success: function(res) {
                                                console.log(res);
                                                var src = "data:image/jpg;base64," + res.data;

                                                that.get_token(res.data);

                                                that.setData({
                                                        url: src
                                                })
                                        }
                                })
                        },
                })
        },
        /**
         * 生命周期函数--监听页面加载
         */
        onLoad: function(options) {
                that = this;
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