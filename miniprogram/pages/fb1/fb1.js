
import {getUUID,getExt}from"../../utils/util.js";
const app =  getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImages: [],
    images: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.initImageSize();
  },

 

  /**
 * 初始化图片尺寸的
 */
  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 60;
    const imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    });
  },
 
  /**
    * 提交按钮的事件
    */
  onSubmitEvent: function(event) {
    console.log(event);
    const that = this;
    const content = event.detail.value.content;
    const contentbookName = event.detail.value.contentbookName;
    const author = app.globalData.userInfo;
    //const images = that.data.tempImages;

    const systemInfo = wx.getSystemInfoSync();
    let model = systemInfo.model;
   const  device = model.replace(/<.">/, "")
    const Sxbc = {
      content: content,
      contentbookName: contentbookName,
      author: author,
      //images: images,
      device: device,
      create_time: db.serverDate()
    }
   wx.showLoading({
     title: '正在发送',
   });
    
   //1.上传到云服务器
   const fileIDList=[];
   if(that.data.tempImages.length > 0){
     const images = event.images;
     const today = new Date();
     const year = today.getFullYear();
     const month = today.getMonth() + 1;
     const day = today.getDate();
     that.data.tempImages.forEach((value,index) => {
       const cloudPath = "fbImages/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + getExt(value);
        wx.cloud.uploadFile({
          filePath: value,
          cloudPath: cloudPath,
          success: res =>{
            that.data.images.push(res.fileID);
            console.log(that.data.images)
            db.collection("fb").add({
              data: {
                content: content,
                contentbookName: contentbookName,
                author: author,
                device: device,
                create_time: db.serverDate(),
                images: that.data.images
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

            fileIDList.push(res.fileID);
            if (fileIDList.length == that.data.tempImages.forEach){
              
            }
          }
        })
     });
   }
   
    
},

//图片添加
  onAddImageTap: function (event) {
    console.log(event)
    const that = this;
    wx.chooseImage({
      success: function (res) {
        console.log(res)

        const tempImages = res.tempFilePaths;
        const oldImages = that.data.tempImages;
        const newImages = oldImages.concat(tempImages);
        that.setData({
          tempImages: newImages
        })
      },
    }) 
  },

//照片删除按钮
onRmoveBtnTap: function(event){
console.log(event);
const index = event.target.dataset.index;
  const tempImages = this.data.tempImages;
  tempImages.splice(index,1),
  this.setData({
    tempImages: tempImages
  })
  },
//预览
  onImageTap:function(event){
    const that = this; 
    const index = event.target.dataset.index;
    const current = that.data.tempImages[index];
    wx.previewImage({
      urls: that.data.tempImages,
      current: current
    })
  }

 
})