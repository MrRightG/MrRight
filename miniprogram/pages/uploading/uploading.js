// pages/uploading/uploading.js
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    putaway_book:[],

  },

 


onLoad: function (options) {
  const that = this;
  const openid = app.globalData.userInfo.openId;
  /*db.collection("ISBNadd").where({
    open_id: openid,

  }).get().then(res => {
    
    const putaway_book = res.data;
    this.setData({
      putaway_book: putaway_book
    })
  })*/
  wx.request({
    url: 'https://robotwizard.site/api.php/bookSelOpId/' + openid, //仅为示例，并非真实的接口地址

    
    success: function (res) {
      console.log(res);
      const putaway_book = res.data;
      that.setData({
        putaway_book: putaway_book
      }) 
    }
  })
},

/**
  * 提交按钮的事件
  */
onSubmitEvent: function(event) {
 const that = this;
  const openid = app.globalData.userInfo.openId;
  console.log(openid)
  const ISBN_ISBN = event.detail.value.ISBN_ISBN;
  const contentbookname = event.detail.value.contentbookname;
  const book_damage = event.detail.value.book_damage;
  const Sxbc = {
    open_id: openid,
    ISBN_ISBN: ISBN_ISBN,
    book_status: "1",
    content_bookname: contentbookname,
    book_damage: book_damage
  }
  wx.showLoading({
    title: '正在发送',
  });

  /*db.collection("ISBNadd").add({
    data: Sxbc,
    success: res => {
      console.log(res);
      const _id = res._id;
      if (_id) {
        wx.hideLoading();
        wx.showToast({
          title: '上传成功',
        });

        setTimeout(function () {
          wx.navigateBack({})
        }, 800)
      } else {
        wx.showToast({
          title: '上传失败',
        })
      }
    }
  })*/

  //1.上传到云服务器

  
    wx.request({
      url: "https://robotwizard.site/api.php/bookIns",
            method: 'POST',       
      header: {
        "content-type": "application/x-www-form-urlencoded" // 默认值       
                       }, 
      data: {
        book_id: [],
        open_id: openid,
        ISBN_ISBN: ISBN_ISBN,
        book_name: contentbookname,
        book_damage: book_damage,
        book_status: "1",
      },   
         success: (res) => {       
         console.log(res.data)       
        if(res.error){        
         wx.showToast({          
         title: res.data.msg,       
          icon: 'none',        
           duration: 2000     
            })        
           }else{       
             wx.showToast({    
            title: '添加成功',   
            icon: 'success',    
            duration: 2000     
            })   
          setTimeout(function () {
            wx.navigateBack({})
          }, 800)    
         }  
      } 
     }) 
     that.onLoad();
   } ,
  onWriteSxbcTap: function (event) {
    const that = this;
    const openid = app.globalData.userInfo.openId;
    console.log(event);
    const index = event.currentTarget.id
    const pitchon_book = this.data.putaway_book[index];
    const _id = pitchon_book._id;
   const book_id = this.data.putaway_book[index].book_id;
    if (pitchon_book.book_status == "1"){
      wx.showActionSheet({
        itemList: [ '下架'],
        success: res => {
          console.log(res)
          const tapIndex = res.tapIndex;
          if (tapIndex == 0) {
            const _id = pitchon_book._id
            
            wx.request({
              url: 'https://robotwizard.site/api.php/bookUpd/',
              method: 'POST',
              //header: {
                //"content-type": "application/x-www-form-urlencoded" // 默认值       
//},
              data: {
                book_id: book_id,
                //open_id: pitchon_book.openid,
                //ISBN_ISBN: pitchon_book.ISBN_ISBN,
                //book_damage: pitchon_book.book_damage,
                book_status: "0",
              },
              success: (res) => {
                console.log(res)
                if (res.error) {
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'none',
                    duration: 2000
                  })
                } else {
                  wx.showToast({
                    title: '下架成功',
                    icon: 'success',
                    duration: 2000
                  })
                }
              }
            }) 

            /*db.collection("ISBNadd").doc(_id).update({
              data: {
                book_status: "2",
              }
            }).then(res => {
              console.log("审核")

              this.onLoad();
            })*/
          }
        }
      })

    }else{wx.showActionSheet({   
        itemList: ['上架'],
        success: res => {
          console.log(res)
          const tapIndex = res.tapIndex;
          if (tapIndex == 0) {
          wx.request({
            url: 'https://robotwizard.site/api.php/bookUpd/',
            method: 'POST',

            data: {
              book_id: pitchon_book.book_id,
              //open_id: pitchon_book.openid,
              //ISBN_ISBN: pitchon_book.ISBN_ISBN,
             // book_name: pitchon_book.book_name,
              //book_damage: pitchon_book.book_damage,
              book_status: '1',
            },
            success: function (res) {
              console.log('1')
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

              this.onLoad();
              
          } 
        }
      })
    }
  },





 
})