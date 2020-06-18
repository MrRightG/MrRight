// pages/book/isbn.js
Page({
  // 页面初始数据
  data: {
    page: 1,
    lenth: '',
    isloading: false,
    havemorebooks: true,
    searchtext: '',
    issearch: false,
    inputValue: '',
  },

  // 页面加载
  onLoad: function(options) {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          lenth: ((res.screenHeight - (res.screenHeight % 85)) / 85)
        })
      },
    })
    this.loading()
  },

  // -----------------------------正常模式------------------------------
  // 加载书籍方法
  loading: function() {
    this.data.isloading = true
    var that = this
    var page = this.data.page
    var lenth = this.data.lenth
    var booklist = this.data.booklist
    wx.request({
      url: 'https://robotwizard.site/api.php/pageBooks/' + page + '/' + lenth,
      success: function(res) {
        // console.log(res.data)
        console.log(res.data.length)
        console.log(lenth)
        if (res.data.length != lenth)
          that.data.havemorebooks = false
        if (that.data.page == 1) {
          that.setData({
            booklist: res.data
          })
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
          // 停止下拉动作
          wx.stopPullDownRefresh();
        } else
          that.setData({
            booklist: booklist.concat(res.data)
          })
      }
    })
    // 隐藏加载框
    wx.hideLoading()
    this.data.isloading = false
  },

  // --------------------------转变为查询模式--------------------------

  // 取得输入框内容
  oninputEvent: function(event) {
    // console.log(event.detail.value)
    this.setData({
      searchtext: event.detail.value
    })
  },

  // 转变页面规则
  onSelect: function() {
    if (this.data.searchtext == '') {
      wx.showToast({
        title: '请输入搜索内容',
        icon: 'none'
      })
      return false
    }
    if (this.data.isloading == true)
      return false
    this.data.issearch = true
    // console.log(this.data.searchtext)
    this.data.page = 1
    this.data.havemorebooks = true
    wx.showLoading({
      title: '玩命加载中',
    })
    this.searchloading()
  },

  // 加载书籍方法
  searchloading: function() {
    this.data.isloading = true
    var that = this
    var searchtext = this.data.searchtext
    var page = this.data.page
    var lenth = this.data.lenth
    var booklist = this.data.booklist
    // console.log('https://robotwizard.site/api.php/isbnSelBoNa/' + searchtext + '/' + page + '/' + lenth)
    wx.request({
      url: 'https://robotwizard.site/api.php/isbnSelBoNa/' + searchtext + '/' + page + '/' + lenth,
      success: function(res) {
        console.log(res.data)
        if (res.data.length != lenth)
          that.data.havemorebooks = false
        if (that.data.page == 1) {
          that.setData({
            booklist: res.data
          })
          // 隐藏导航栏加载框
          wx.hideNavigationBarLoading();
        } else
          that.setData({
            booklist: booklist.concat(res.data)
          })
      }
    })
    wx.hideLoading()
    this.data.isloading = false
  },





  // 跳转书籍详情页
  onJumpBookIndex: function(event) {
    console.log(event)
    let isbn = event.currentTarget.dataset.isbn
    wx.navigateTo({
      url: `/pages/book/book?isbn=${isbn}`
    })
  },

  // 下拉刷新操作
  onPullDownRefresh: function() {
    var that = this
    wx.showNavigationBarLoading()
    this.data.page = 1
    this.data.havemorebooks = true
    this.data.issearch = false
    this.data.inputValue = ''
    this.loading()
  },

  // 上拉加载操作
  onReachBottom: function() {
    var that = this
    var issearch = this.data.issearch
    if (that.data.isloading == true || that.data.havemorebooks == false)
      return;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    this.data.page = this.data.page + 1
    // console.log(this.data.page)
    // 判断查询模式是否启动
    if (issearch == false)
      this.loading()
    else
      this.searchloading()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

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

  }



})