const app = getApp();
const db = wx.cloud.database();
Page({
  data: {
    collect :[],
    windex: "2",

  },

  onLoad: function (options){
    const that = this;
    const openid = app.globalData.userInfo.openId;
    db.collection('collect').where({
      _openid: openid,
      collect:true,
    }).get({
      success: function (res) {
        console.log(res)
        that.setData({
          collect : res.data
        })
      }
    })
  },

  collect_jump:function(event){
    console.log(event)
    const index = event.currentTarget.id
    const ISBN_ISBN = this.data.collect[index].ISBN;
    console.log(ISBN_ISBN)
    wx.navigateTo({
      url: '../../pages/book/book?isbn=' + ISBN_ISBN +"&windex=" + this.data.windex ,
    })
  }

})