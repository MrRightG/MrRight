// join/join.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    joinId : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    
    var that = this;
    const index = options.index;
    const pages = getCurrentPages()
    const indexPage = pages[0];
    const joinid = indexPage.data.activity;
    const joinId = joinid[index]._id;

  
    
    //this.onSubmitEvent(activID);
   
  },

  
  onSubmitEvent: function (event) {
   
   const name = event.detail.value.name
    const class1 = event.detail.value.class1
    const number = event.detail.value.number 
    
    const joinId = this.data.joinId
    console.log(joinId);



    db.collection("hdadd").doc(joinId).update({
    data: {
      "user": name
      
    },

    success: res => {
      console.log(res);
      const _id = res._id;
      if (_id) {
        wx.hideLoading();
        wx.showToast({
          title: '发送成功',
        });

        setTimeout(function () {
          wx.navigateBack({})
        }, 800)
      } else {
        wx.showToast({
          title: '发送失败',
        })
      }
    }
  })
  }
  })
