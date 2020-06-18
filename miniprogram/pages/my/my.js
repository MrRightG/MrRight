const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    motto: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorage({
      key: 'test00',
      data: 'value00',
    })
  },

  // 事件处理函数：跳转到登陆页
  bindUserLogin: function () {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onLoad: function () {
  },
  // onShow中的代码作用：在登陆页获取到用户新消息后，个人中西页进行判断，有用户信息就把信息添加到<block>对应的位置，没有用户信息就不显示
  onShow: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  collect:function(event){
   
    wx.navigateTo({
      url: '../collect/collect',
     
    })
  },



  order: function (event) {

    wx.navigateTo({
      url: '../order/order',

    })
  },


  information: function (event) {
   
    
    wx.navigateTo({
      url: '../personal/personal' 

    })
  },

  uploading: function (event) {

    wx.navigateTo({
      url: '../uploading/uploading',

    })
  }


})