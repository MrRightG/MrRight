import { getUUID, getExt } from "../../utils/util.js";
var util = require('../../utils/getTime.js');
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    c_loan:[],
    confirm:false,
    userinformation: [],
    dates:[],
    index:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    console.log(options)
    if (options.windex == "2"){
      that.setData({
        index: options.windex
      })
    }else{
      that.setData({
        index: options.index
      })
    }
    const id = options.id
   const index = that.data.index;
   console.log(index)
    const pages = getCurrentPages()
    console.log(pages)

    const indexPage = pages[index];
    console.log(indexPage)
    const c_loan1 = indexPage.data.c_loan;
    console.log(c_loan1)
    const c_loan = c_loan1[id];
    //console.log(c_loan)
    this.setData({
      c_loan: c_loan
    })

    
    wx.request({
      url: 'https://robotwizard.site/api.php/userSelOpId/' + c_loan.open_id,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        const userinformation = res.data
        
        that.setData({
          userinformation: userinformation,

        })
      },
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

  confirm:function(event){
    console.log(event)
    const confirm = true;
    const that = this;

    const borrow_id = getUUID();
    var return_time = that.data.dates;
    var borrow_time = util.formatTime(new Date());
    const book_id = that.data.c_loan.book_id;
    const open_id = app.globalData.userInfo.openId;
    that.setData({
      confirm: confirm
    })
  wx.request({
    url: 'https://robotwizard.site/api.php/borrIns',
    method:'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"  // 默认值       
    },
    data: {
      borrow_id: [],
      open_id: open_id,
      book_id: book_id,
      borrow_time: borrow_time,
      return_time: return_time
    },
    success: (res) => {
      that.book_status();
      console.log(res)
      if (res.error) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      } else {
        wx.showToast({
          title: '添加成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  })

  },

  book_status:function(event){
    const that = this;
    const c_loan = that.data.c_loan;
  wx.request({
    url: 'https://robotwizard.site/api.php/bookUpd/',
    method: 'POST',

    data: {
      book_id: c_loan.book_id,
      //open_id: pitchon_book.openid,
      //ISBN_ISBN: pitchon_book.ISBN_ISBN,
      // book_name: pitchon_book.book_name,
      //book_damage: pitchon_book.book_damage,
      book_status: '2',
    },
    success: function (res) {
      console.log('修改状态2')
      
    }
  }) 
  },

  viewClick01: function () {
    var that = this    //显示“呼叫”、“添加联系人”弹窗   
     wx.showActionSheet({    
         itemList: ['呼叫'],
       success: res => {        
              if (res.tapIndex == 0) {//直接呼叫         
                 wx.makePhoneCall({            
                   phoneNumber: that.data.userinformation.user_phoneNumber,           
                    success: function(res_makephone) {              
                      console.log("呼叫电话返回：", res_makephone)           
                       }
                       })        
                       }     
       }         
                                }) 
      
                                },
  

  bindDateChange: function (e) {

    console.log(e.detail.value)

    this.setData({

      dates: e.detail.value

    })

  },

  jumprecord:function(event){
      wx.navigateTo({
        url: '../../pages/order/order',
      })
  }
})