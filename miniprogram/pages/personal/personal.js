// pages/information/information.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData:[],
    userinformation: [],
    openid: [],
    modification:[],
    returned_value:[],
    _id:[],
    sex:[],
    user_sex:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    wx.cloud.callFunction({
      name: "login",
      success: res => {

        console.log(res)
        const openId = res.result.openid;
        app.globalData.userInfo.openId = openId;


      }
    })
   
    if (!app.globalData.userInfo){
      that.setData({
         
        openid: "-1"
      })
    }else{
      const openid = app.globalData.userInfo.openId;
      console.log(openid)
wx.request({
  url: 'https://robotwizard.site/api.php/userSelOpId/' + openid,
  method: 'GET',
  dataType: 'json',
  success: function(res) {
    console.log(res)
    const userinformation = res.data
    


    if (userinformation.user_name) {
      that.setData({
        returned_value: true
      })
    }

    if (userinformation.user_sex == 1) {
      const user_sex = "男"
      that.setData({
        user_sex: user_sex
      })
    } 
    
    if (!userinformation.user_sex == 1){
      const user_sex = "女"
      that.setData({
        user_sex: user_sex
      })
      
    }
    
    that.setData({
      openid: openid,
      userinformation: userinformation,
    })
  },
  fail: function(res) {},
  complete: function(res) {},
})
      console.log(this.data.user_sex)
     
      /*db.collection("UserInformation").where({
        _openid: openid
      }).get().then(res => {
        console.log(res)
        const userinformation = res.data[0]
        console.log(userinformation)
        if (userinformation.name){
          that.setData({
          returned_value: true
          })
        }
        that.setData({
          openid: openid,
          userinformation: userinformation,
          _id: userinformation._id
        })
      }) */
    }
    
    

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
    this.modificbtn()
  },

 

  onSubmitEvent: function (event) {
    console.log(event);
    const that = this;
    var _id = that.data._id;
    console.log(_id);
    const age = event.detail.value.age;
    if (event.detail.value.sex == "男"){
      const sex = "1";
      that.setData({
        sex: sex
      })
    }else{
      const sex = "0";
      that.setData({
        sex: sex
      })
    }
    console.log(that.data.sex)
  const sex = that.data.sex
    const studentnumber = event.detail.value.studentnumber;
    const _openid = app.globalData.userInfo.openId;
    const name = event.detail.value.name;
    const number = event.detail.value.number;
    const classname = event.detail.value.classname;
    const domitory = event.detail.value.domitory;
    const del = false ;
    const systemInfo = wx.getSystemInfoSync();
    let model = systemInfo.model;
    const device = model.replace(/<.">/, "")
  
    wx.showLoading({
      title: '正在上传',
    });

    if (this.data.returned_value == true){

      wx.request({
        url: 'https://robotwizard.site/api.php/userUpd/',
        method:'POST',
        data: {
          open_id: _openid,
          user_name: name,
          user_age: age,
          user_sex: sex,
          user_location: domitory,
          user_sid: studentnumber,
          user_class: classname,
          user_phoneNumber: number
        },
        success: function (res) {
          console.log(res)
          if (res.error) {
            wx.showToast({
              title: '修改失败',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 2000
            })
          that.onLoad();
          }
        }
      })

     

     /* db.collection('UserInformation').doc(_id).update({
        data: {
          domitory: domitory,
          departmentname: departmentname,
          number: number,
          name: name,
          studentnumber: studentnumber,
          sex: sex,
          grade: grade,
        }
      }).then(res => {
        console.log(res)
        if (res.stats.updated == 1) {
          wx.hideLoading();
          wx.showToast({
            title: '修改成功',
          });

          setTimeout(function () {
            wx.navigateBack({})
          }, 800)
        } else {
          wx.showToast({
            title: '修改失败',
          })
        }
      
      })*/
      /*db.collection("UserInformation").where({ 
        _openid:this.data.openid
        }).remove().then(res =>{
          console.log(res)
        }).catch(res => {
          console.log(res)
        })
      db.collection("UserInformation").add({
        data: Sxbc,

        success: res => {
          console.log(res);
          const _id = res._id;
          if (_id) {
            wx.hideLoading();
            wx.showToast({
              title: '修改成功',
            });

            setTimeout(function () {
              wx.navigateBack({})
            }, 800)
          } else {
            wx.showToast({
              title: '修改失败',
            })
          }
        }
      })*/
    }else{

      wx.request({
        url: "https://robotwizard.site/api.php/userIns",
        method: 'POST',
        header: {
           // 默认值       
        },
        data: {
          open_id: _openid,
          user_name: name,
          user_age: age,
          user_sex: sex,
          user_location: domitory,
          user_sid: studentnumber,
          user_class: classname,
          user_phoneNumber: number
        },
        success: (res) => {
          console.log(res.data)
          if (res.error) {
            wx.showToast({
              title: '添加失败',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '添加成功',
              icon: 'success',
              duration: 2000
            })
            that.onLoad();
          }
        }
      }) 

    /*db.collection("UserInformation").add({
      data: Sxbc,

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
    })*/
    }
  },

  modificbtn: function(event){
    this.setData({
      userinformation: [],
      modification: true
    })
  }


})