import { getUUID, getExt } from "../../utils/util.js";
const app = getApp();
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempImages: [],
    activity:[],
    datesb:[],
    datesf:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    this.initImageSize();

  },

  onSubmitEvent: function (event){
    console.log(images)
    const that = this;
    const name = event.detail.value.name;
    const activContent = event.detail.value.activContent;
    const classN = event.detail.value.classN;
    const phone = event.detail.value.phone;
    const datesb = that.data.datesb;
    const datesf = that.data.datesf;
    const activName = event.detail.value.activName;
    const images = this.data.tempImages;
    const systemInfo = wx.getSystemInfoSync();
    let model = systemInfo.model;
    const device = model.replace(/<.">/, "")
    
    
       wx.showLoading({
        title: '正在发送',
      });
      //1.上传到云服务器
    const fileIDList = [];
    if (that.data.tempImages.length > 0) {
      const images = event.images;
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      that.data.tempImages.forEach((value, index) => {
        const cloudPath = "ActivityImages/" + year + "/" + month + "/" + day + "/" + getUUID() + "." + getExt(value);
        wx.cloud.uploadFile({
          filePath: value,
          cloudPath: cloudPath,
          success: res => {
            console.log(res);
            fileIDList.push(res.fileID);
            const images = res.fileID;
            db.collection("addhd").add({
              data: {name: name,
              activContent: activContent,
              classN: classN,
              phone: phone,
                datesb: datesb,
                datesf: datesf,
              activName: activName,
              images: images,
              create_time: db.serverDate(),
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
            if (fileIDList.length == that.data.tempImages.forEach) {

            }
          }
        })
      });
    }
    

   
  },



  initImageSize: function () {
    const windowWidth = wx.getSystemInfoSync().windowWidth;
    const containerWidth = windowWidth - 60;
    const imageSize = (containerWidth - 2.5 * 3) / 3;
    this.setData({
      imageSize: imageSize
    });
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
  onRmoveBtnTap: function (event) {
    console.log(event);
    const index = event.target.dataset.index;
    const tempImages = this.data.tempImages;
    tempImages.splice(index, 1),
      this.setData({
        tempImages: tempImages
      })
  },
  //预览
  onImageTap: function (event) {
    const that = this;
    const index = event.target.dataset.index;
    const current = that.data.tempImages[index];
    wx.previewImage({
      urls: that.data.tempImages,
      current: current
    })
  },
  bindDateChangeb: function (e) {

    console.log(e.detail.value)

    this.setData({

      datesb: e.detail.value

    })

  },
  bindDateChangef: function (e) {

    console.log(e.detail.value)

    this.setData({

      datesf: e.detail.value

    })

  },


})