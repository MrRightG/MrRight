//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
      
        traceUser: true,
      })
    }

    this.globalData = {}
    this.loadUserInfo();
    
    
  },

  loadUserInfo:function(){
    const that = this;
    wx.getSetting({
      success: res => {
        const isUserInfo = res.authSetting['scope.userInfo'];
        if(isUserInfo){
          wx.getUserInfo({ 
         success: res => {
           const userInfo = res.userInfo;
           that.globalData.userInfo = userInfo;
           console.log(res)
         }
        });
        wx.cloud.callFunction({
          name: "login",
          success: res => {
            
           const openId = res.result.openid;
           
           that.globalData.userInfo.openId = openId;
            
          }
        })
        }
      }
    })
  },

  is_login: function (){
    if(this.globalData.userInfo){
      return true;
    }else{
      return false;
    }
  },
    setUserInfo: function(userInfo){
      this.globalData.userInfo = userInfo;
    }
    
  
})
