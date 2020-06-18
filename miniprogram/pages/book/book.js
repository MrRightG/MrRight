const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:[],
    image:[],
    ISBN_ISBN:[],
    borrow_click: false,
    c_loan:[],
    windex: [],
    collecT:[],
    collect:false,
    _id:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      ISBN_ISBN: options.isbn,
      windex: options.windex
      })
    const that = this;
    that.loadComments();
    that.collecT();
    wx.request({
      url: 'https://robotwizard.site/api.php/isbnSelIsbn/' + options.isbn,
      success: function (res) {
        console.log(res)
        that.setData({
          book: res.data,
          'book.ISBN_image_S': 'https://robotwizard.site' + res.data.ISBN_image_S,
        })
        
      }
    })
  
  },

  onShow: function () {
    const that = this;
  },

  loadComments: function (event) {
   
    const that = this;
    db.collection("comment").where({
      sxbcid: that.data.ISBN_ISBN
    }).orderBy("create_time", "desc").get().then(res => {
      console.log(res)
      const comments = res.data;
      comments.forEach((comment, index) => {
        comment.create_time = comment.create_time.getTime()
      })
      that.setData({
        comments: comments
      })
    })
  },

  onFocusEvent: function (event) {
    this.setData({
      mask: true
    })
  },

  onBlurEvent: function (event) {
    this.setData({
      mask: false
    })
  },

  onConfirmEvent: function (event) {
    const that = this;
    const content = event.detail.value;
    db.collection("comment").add({
      data: {
        content: content,
        author: app.globalData.userInfo,
        create_time: db.serverDate(),
        sxbcid: that.data.book.ISBN_ISBN
      }
    }).then(res => {
      console.log(res)
      const comment = {
        "_id": res._id,
        "content": content,
        "author": app.globalData.userInfo,
        "create_time": (new Date()).getTime()
      }
      const comments = that.data.comments;
      comments.splice(0, 0, comment);
      that.setData({
        comments: comments
      })
    })
  },


  borrow:function(event){
    const that = this;
    const ISBN_ISBN = that.data.ISBN_ISBN
    console.log(event)
    
    if (that.data.borrow_click == false){
    that.setData({
      borrow_click: true,
    })
      wx.request({
        url: 'https://robotwizard.site/api.php/bookSelIsbn/' + ISBN_ISBN,
        method: 'GET',
        success: function (res) {
          console.log(res)
          
            that.setData({
              c_loan: res.data
            })
          
            

        }
        })
        
    }else{
      that.setData({
        borrow_click: false,
      })
    }
  },

  book_borrow:function(event){

console.log(event)
    wx.navigateTo({
    //  url: 'pages/book_borrow/book_borrow?',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  collecT: function (event) {
    const that = this;
    const openid = app.globalData.userInfo.openId;
  db.collection('collect').where({
    _openid: openid,
    ISBN: that.data.ISBN_ISBN,
  }).get({
    success: function (res) {
      console.log(res)
      if (res.data[0].ISBN){
        that.setData({
          collecT:true,
          collect: res.data[0].collect,
          _id: res.data[0]._id
        })
      }else{
        that.setData({
          collecT: false,
        })
      }

    }
    })   
      },


  collect:function(event){
    const that = this;
    const book = that.data.book;
    const openid = app.globalData.userInfo.openId;
    console.log(that.data.collecT)
    if (that.data.collecT == false) {
      db.collection('collect').add({
        data: {
          ISBN_bname: book.ISBN_bname,
          ISBN_image_S: book.ISBN_image_S,
          ISBN: book.ISBN_ISBN,
          collect: true,
        }
      }).then(res => {
        console.log(res)
        console.log("库中没有并收藏")
        if (res.error) {
          wx.showToast({
            title: '收藏失败',
            icon: 'none',
            duration: 2000
          })
        } else {
          that.setData({
            collecT : true,
            collect: true
          })
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 2000
          })
        }
        
      })
    }
   // db.collection('collect').where({
     // _openid: openid,
     // ISBN: book.ISBN_ISBN,
   // }).get({
    // success: function (res) {
    //    console.log(res)
       const _id = that.data._id;
        
        if (this.data.collect == true){
          //改false
          db.collection('collect').doc(_id).update({
            data: {
              collect: false,
            }
          }).then(res => {
            console.log(res)
            if (res.error) {
              wx.showToast({
                title: '取消收藏失败',
                icon: 'none',
                duration: 2000
              })
            } else {
              that.setData({
                collect:false,

              })
              wx.showToast({
                title: '取消收藏成功',
                icon: 'success',
                duration: 2000
              }) 
            }
          })
          } if (that.data.collect == false){
          //改true
          db.collection('collect').doc(_id).update({
            data: {
              collect: true,
            }
          }).then(res => {
            console.log(res)
            if (res.error) {
              wx.showToast({
                title: '收藏失败',
                icon: 'none',
                duration: 2000
              })
            } else {
              that.setData({
                collect: true,
              })
              wx.showToast({
                title: '收藏成功',
                icon: 'success',
                duration: 2000
              })
            }
          
          })
        } 
        
       
      
   //   }
   // })
    
  },

  jump_borrow:function(event){
console.log(event)
    const id = event.currentTarget.id;
    wx.navigateTo({
      url: '../../pages/book_borrow/book_borrow?index=' + "1" + '&windex=' + this.data.windex  + '&id=' + id,
    })
  }

})