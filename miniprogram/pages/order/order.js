const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    borrow_record: [],
    timg:"-1",
    lend: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const openid = app.globalData.userInfo.openId;
    wx.request({
      url: 'https://robotwizard.site/api.php/lend/' + openid,
      data:{

      },
      method: 'GET',
      success: function (res) {
        console.log(res)
        console.log("1")
        that.setData({
          borrow_record : res.data,
          lend:true,
        })
      }
      })

    
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  lend_on:function(event){
    var that = this;
    that.onLoad();
  },

  lend_in:function(event){
    const that = this;
    const openid = app.globalData.userInfo.openId;
      wx.request({
        url: 'https://robotwizard.site/api.php/borrow/' + openid,
        method: 'GET',
        success: function (res) {
          console.log(res)
          console.log("2")

          that.setData({
            borrow_record: res.data,
            lend: false,
          })
        }
       
      })
    
  },
  confirm_return:function(event){
    const that = this;
    const index = event.currentTarget.id;
    const borrow_record = that.data.borrow_record[index];
    console.log(borrow_record)
    if(that.data.lend == true){
    wx.showActionSheet({
      itemList: ['联系对方'],
    success: res => {
      console.log(res)
      const tapIndex = res.tapIndex;
    
    if (tapIndex == 0) { //重新上架
      wx.request({
        url: 'https://robotwizard.site/api.php/userSelOpId/' + borrow_record.open_id,
        method: 'GET',
        dataType: 'json',
        success: function (res) {
          console.log(res)   
              console.log("点击电话 res：", res)
                wx.makePhoneCall({
                  phoneNumber: borrow_record.user_phoneNumber,
                  success: function (res_makephone) {
                    console.log("呼叫电话返回：", res_makephone)
                  }
                })  
        },
        
      }) 
    
    }
     
    }
    })
    }
    if (that.data.lend == false){
      wx.showActionSheet({
        itemList: ['联系对方'],
        success: res => {
          console.log(res)
          const tapIndex = res.tapIndex;
          if (tapIndex == 0) { //重新上架
            wx.request({
              url: 'https://robotwizard.site/api.php/userSelOpId/' + borrow_record.open_id,
              method: 'GET',
              dataType: 'json',
              success: function (res) {
                console.log(res)
                console.log("点击电话 res：", res)
                wx.makePhoneCall({
                  phoneNumber: borrow_record.user_phoneNumber,
                  success: function (res_makephone) {
                    console.log("呼叫电话返回：", res_makephone)
                  }
                })
              },

            })

          }
        }
        })
    }
  }
})