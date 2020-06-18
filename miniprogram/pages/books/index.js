// pages/book/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that=this
    wx.request({
      url: 'https://robotwizard.site/api.php/isbnSelIsbn/' + options.isbn,
      success:function(res)
      {
        var book = res.data;
        console.log(book)

        that.setData({
          book: res.data,
          'book.ISBN_image_S': 'https://robotwizard.site' + book.ISBN_image_S,
         
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

  // 跳转书籍详情页
onJumpBookIndex: function (e) {
    let isbn = e.currentTarget.dataset.isbn
    wx.navigateTo({
      url: `/pages/book/book?isbn=${isbn}`
    })
  }
})