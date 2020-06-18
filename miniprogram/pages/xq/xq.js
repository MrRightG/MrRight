const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mask:false,
   fbSxbc:[]
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){

    const index = options.index;
    const pages = getCurrentPages()
    console.log(pages)
    const indexPage = pages[0];
    console.log(indexPage)
    const fbSxbc = indexPage.data.fbSxbc;
    console.log(fbSxbc)
    const sxbc = fbSxbc[index];
    console.log(sxbc)
    
    this.setData({
      sxbc:sxbc
    })
    this.loadComments();
  },

  loadComments: function(){
    const that = this;
    db.collection("comment").where({
      sxbcid: that.data.sxbc._id
      }).orderBy("create_time","desc").get().then(res => {
         const comments = res.data;
        comments.forEach((comment, index) => {
          comment.create_time = comment.create_time.getTime()
        })
         that.setData({
           comments: comments
         })
      })
  },
  
  onFocusEvent: function(event){
    this.setData({
      mask:true
    })
  },

  onBlurEvent: function(event){
    this.setData({
      mask: false
    })
  },

  onConfirmEvent: function(event){
    const that= this;
    const content = event.detail.value;
    db.collection("comment").add({
      data:{
        content:content,
        author:app.globalData.userInfo,
        create_time:db.serverDate(),
        sxbcid:that.data.sxbc._id
      }
    }).then(res =>{
      const comment = {
        "_id" : res._id,
        "content" : content,
        "author" : app.globalData.userInfo,
        "create_time": (new Date()).getTime()
      }
      const comments = that.data.comments;
      comments.splice(0,0,comment);
      that.setData({
        comments: comments
      })
    })
  },

  

})