 const app = getApp();
const db = wx.cloud.database();
// pages/weekly/weekly.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  activity:[],
    userInformation: [],
    //attend:[]
  },
//删除方法
 remove: function(array,val){
   for (var i= 0; i<array.length; i++){
     if(array[i] == val ){
       array.splice(i,1);
     }
   }
   return -1;
 },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const openid = app.globalData.userInfo.openId;

    wx.request({
      url: 'https://robotwizard.site/api.php/userSelOpId/' + openid,
      method: 'GET',
      dataType: 'json',
      success: function (res) {
        console.log(res)
        const userInformation = res.data
        if (userInformation.user_name) {
          that.setData({
            returned_value: true
          })
        }
        that.setData({
          openid: openid,
          userInformation: userInformation,

        })
        
      },
      fail: function (res) { },
      complete: function (res) { },
    })
    db.collection('addhd').get({
      success: function (res) {
        const activity = res.data
        console.log(activity)
        const name = that.data.userInformation.name
        console.log(name)
        const Index = activity.index
        console.log(Index)
        console.log(activity)
        that.setData({
          activity: activity, //weibos


        })
      }
    })
   /* db.collection("UserInformation").where({
      _openid: openid
    }).get().then(res => {
      console.log(res)
      const userInformation = res.data[0]
      console.log(userInformation)
      
      that.setData({
        userInformation: userInformation,

      })
      db.collection('addhd').get({
        success: function (res) {
          const activity = res.data
          console.log(activity)
          const name = that.data.userInformation.name
          console.log(name)
          const Index = activity.index
          console.log(Index)
          console.log(activity)
          that.setData({
            activity: activity, //weibos


          })
        }
      })
    })*/
  },
  onShow: function () {
    this.onLoad();
  },

 
  
  onSubmitEvent: function (event) {
    console.log(event)
    const that = this;
    const _ = db.command;
    const userInformation = this.data.userInformation;
    const index = event.currentTarget.id
    const sxbc = that.data.activity[index];
    const name = that.data.userInformation.user_name
    const openId = app.globalData.userInfo.openId;
    const activity = that.data.activity;
    const sxbcId= sxbc._id
    console.log(sxbc.acTuser)
   



    if (!sxbc.acTuser){

      
     db.collection("addhd").doc(sxbcId).update({
        data: {
          "acTuser" : [name]
        }
      }).then( res =>{
        
        console.log("参加成功")
        sxbc.acTuser = [name]
        that.setData({
          activity: activity,
          attend : true
        })
        if (res.error) {
          wx.showToast({
            title: '参加失败',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '参加成功',
            icon: 'success',
            duration: 2000
          })
         
        }
        console.log(activity)
        })
       db.collection('hd_participator').add({
      data: {
        sxbcId: sxbcId,
        userInformation: userInformation,
      }
       }).then(res => {
         console.log("hd_participator添加")
       })

      }else{
      if (sxbc.acTuser.indexOf(name) == -1){
        console.log("数组中没有你的名字")
        db.collection("addhd").doc(sxbcId).update({
          data: {
            "acTuser": _.push(name)
          }
        }).then( res => {
          console.log(res)
        console.log("参加成功")
          sxbc.acTuser.push(name);
          that.setData({
            activity: activity,
             attend: true
          })
          if (res.error) {
            wx.showToast({
              title: '参加失败',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.showToast({
              title: '参加成功',
              icon: 'success',
              duration: 2000
            })

          }
          console.log(activity)
      })
        db.collection('hd_participator').add({
          data: {
            sxbcId: sxbcId,
            userInformation: userInformation,
          }
        }).then(res => {
          console.log("hd_participator添加")
        })

      } else {  //取消
       const praise = false;
        const res =  db.collection("addhd").doc(sxbcId).field({
          "acTuser": true
        }).get().then(res => {
          console.log(res)
         
        const acTuser = res.data.acTuser;
        const newacTuser = [];
          acTuser.forEach((praise ,index) => {
            
            if (praise != name) {
              newacTuser.push(praise)
            }
            
          })
        db.collection("addhd").doc(sxbcId).update({
          data: {
            acTuser: newacTuser
          }
        })
          const nameindex = sxbc.acTuser.name;
          console.log("取消参加")
          
            wx.showToast({
              title: '取消参加',
              icon: 'success',
              duration: 2000
            })

          
          console.log(activity)
          var array = sxbc.acTuser;
          var val = name;
          that.remove(array,val);
          that.setData({
            activity: activity,
             attend: false
        })
          })
        db.collection('hd_participator').where({
            sxbcId: sxbcId,
            _openid: openId,
        }).get().then(res => {
          const _id = res.data[0]._id
          console.log(_id)
          db.collection('hd_participator').doc(_id).remove(

          ).then(res => {
             console.log(res);
              })
          
        })
    }
      }
    
  },



   
  



 
  f0: function (event) {
    this.setData({
      currentIndex: this.data.activity.length - 1
    })
   

  },

  f1: function (event) {
    const that = this
  const joinId = that.data.activity[Index]._id
    console.log(joinId);
 
    wx:wx.navigateTo({
      url: '/pages/join/join?joinId=' + joinId
     
  })
  },

  f2: function (event) {

    var activID = event.currentTarget.dataset.movieId
    console.log(event);
    wx: wx.navigateTo({
      url: '/pages/newactivity/newactivity' 

    })
  }
})