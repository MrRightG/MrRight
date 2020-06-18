// pages/book/isbn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    isloading: false,
    havemorebooks: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = 1;
    this.loading()
  },

  // 加载书籍方法
  loading: function () {
    this.data.isloading = true
    var that = this
    var page = this.data.page
    var booklist = this.data.booklist
    wx.request({
      url: 'https://robotwizard.site/api.php/pageBooks/' + page,
      success: function (res) {
         console.log(res.data)
        // console.log(res.data.length)
        if (res.data.length != 6)
          that.data.havemorebooks = false
        if (that.data.page == 1)
          that.setData({
            booklist: res.data
          })
        else
          that.setData({
            booklist: booklist.concat(res.data)
          })
      }
    })
    wx.hideLoading()
    this.data.isloading = false
  },

  // 跳转书籍详情页
  onJumpBookIndex: function (e) {
    let isbn = e.currentTarget.dataset.isbn
    wx.navigateTo({
      url: `/pages/books/index?isbn=${isbn}`
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
    var that = this
    this.data.page = 1
    this.data.havemorebooks = true
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    this.loading()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    if (that.data.isloading == true || that.data.havemorebooks == false)
      return;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    this.data.page = this.data.page + 1
    // console.log(this.data.page)
    this.loading()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  
})