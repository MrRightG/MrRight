const app = getApp();
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据,可以为空
   */
  data: {
    images: [1,2,3,4,5,6,7,8,9],
    hasmore : true,
    fbSxbc: [],
    mask: false,
    
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    console.log(options)
    const that = this;
    this.loadSxbc()
  },

/**
   *加载真实数据  上拉
   */

onPullDownRefresh: function(event){
  
  this.loadSxbc(0);
},


  /**
   *加载真实数据  下拉
   */
  loadSxbc:function(start=0){
    const that = this;
   
    
   wx.cloud.callFunction({
     name:"fbSxbc",
     data: {
       start: start
     }
     }).then(res => {
       console.log(res);
   const fbSxbc = res.result.fbSxbc;
   let hasmore = true;
   if(fbSxbc.length == 0){
     hasmore = false
   }
   let newfbSxbc = [];
   if(start > 0){
     newfbSxbc = that.data.fbSxbc.concat(fbSxbc);
   }else{
     newfbSxbc = fbSxbc;
   }
  
      
   //console.log(fbSxbc);
   that.setData({
     fbSxbc: newfbSxbc, //weibos
     hasmore: hasmore
   });
 })
  }, 
 

  onReachBottom: function (event) {
    this.loadSxbc(this.data.fbSxbc.length);
  },


  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 40;
    const twoImageSize = (containerWidth - 2.5 ) / 2;
    const threeImageSize = (containerWidth - 2.5*2) / 3;
    this.setData({
      twoImageSize: twoImageSize,
      threeImageSize: threeImageSize
    });
  },

  onWriteSxbcTap: function (event) {
  
          
         
             wx.navigateTo({
               url: '../fb1/fb1'
             })
           
          
      
  
  },


//点赞

  onPraiseTap: function (event) {
    console.log(event)
    const that = this;
    const sxbcIndex = event.currentTarget.dataset.sxbc;
    const sxbc = that.data.fbSxbc[sxbcIndex];
    const openId = app.globalData.userInfo.openId;
    const fbSxbc = that.data.fbSxbc;
    /*let isPraised = false;
    if(sxbc.praises){
      sxbc.praises.forEach((value,index) =>{
        if(value == openId){
          isPraised = true;
        }
      })
    }*/
    if(!sxbc.isPraised){
    wx.cloud.callFunction({
      name:"praise",
      data:{
        sxbcId: sxbc._id,
        praise: true,
      },
      success:res => {
       if(!sxbc.praises){
         sxbc.praises= [openId];

       }else{
         sxbc.praises.push(openId);
       }
      sxbc.isPraised = true;
       fbSxbc[sxbcIndex] = sxbc;
       that.setData({
         fbSxbc : fbSxbc
       })
      }

    })
  }else{ //取消点赞
    wx.cloud.callFunction({
      name: "praise",
      data:{
        sxbcId: sxbc._id,
        praise:false
      }
    }).then(res => {
      const newPraises = [];
      sxbc.praises.forEach((praise,index) => {
        if(praise != openId){
          newPraises.push(praise);
        }
      })
      sxbc.praises = newPraises;
      sxbc.isPraised = false;
      
      fbSxbc[sxbcIndex] = sxbc;
      that.setData({
        fbSxbc: fbSxbc
      })
    })
  }
    
  },

/*
  //搜索
  oninputEvent: function(event){
    var value = event.detail.value;
    var that = this
    db.collection('fb').where({
      //使用正则查询，实现对搜索的模糊查询
      contentbookName: db.RegExp({
        regexp: value,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => { 
        
        console.log(res)
        that.setData({
          
          fbSxbc: res.data
        })
      }
    })
  },*/

  

    
})