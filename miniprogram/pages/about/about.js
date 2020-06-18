// about/about.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'cloud://sxbc.7378-sxbc-1300946422/imgUrls/10ffd8c97fa1cdb945c8c9ec5fc96f0.jpg',
      'cloud://sxbc.7378-sxbc-1300946422/imgUrls/de59e333028d2489219b2b14d60bfeb.jpg',
      'cloud://sxbc.7378-sxbc-1300946422/imgUrls/fbe40280e714dce8ba7c4b15ee33bc5.jpg',
     
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s
    book: [],
  
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this;
    wx.cloud.callFunction({
      name: "login",
      success: res => {

        console.log(res)
        const openId = res.result.openid;
        app.globalData.userInfo.openId = openId;


      }
    })
    
    //请求热门图书数据
     
      wx.request({
        url: 'https://robotwizard.site/api.php/homePage',
        success: function (res) {
          console.log(res)
          var book = res.data;
          that.setData({
            book : book,
            'book[0].ISBN_image_S': 'https://robotwizard.site' + book[0].ISBN_image_S,
            'book[1].ISBN_image_S': 'https://robotwizard.site' + book[1].ISBN_image_S,
            'book[2].ISBN_image_S': 'https://robotwizard.site' + book[2].ISBN_image_S,
            'book[3].ISBN_image_S': 'https://robotwizard.site' + book[3].ISBN_image_S,
           
            
          })
        }
          })



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

  },

  

  newactTap: function (event) {
    
  }
  })
