// components/sxbc/sxbc.js
const app = getApp();
const db = wx.cloud.database();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    detailurl: {
        type: String,
        value:null
      },
      sxbc:{ 
        type: Object,
        value: {}
      },
      handle:{
        type: Boolean,
        value: true
      },
      tapIndex:{
        type: Object,
        value:{}
      },
    praises :{
      type: Number,
      value:0
    }
    
    
  },

  /**
   * 组件的初始数据
   */
  data: {
    images: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    hasmore: true,
    fbSxbc: []
  },
  
  /**
   * 组件的方法列表
   */
  methods: {


    onPraiseTap: function (event) {
      const that = this;
      const sxbcIndex = event.currentTarget.dataset.sxbc;
      const sxbc = that.data.fbSxbc[sxbcIndex];
      wx.cloud.callFunction({
        name:"praise",
        data:{
          sxbcId: event.currentTarget.dataset.sxbc._id
        },
        success: res =>{
            console.log(res)

        }
      })
     
    }
  },



 /* onPraiseTap: function (event) {
    
    
    var sxbc = event.currentTarget.dataset.sxbc 
     var detail = {"sxbc":sxbc} //detail对象，提供给事件监听函数
      var option = {}; // 触发事件的选项
       this.triggerEvent('onPraise',detail,option)
  console.log(event)
  }
  },*/

  lifetimes: {
    attached: function () {
      const windowWidth = wx.getSystemInfoSync().windowWidth;
      const containerWidth = windowWidth - 40;
      const twoImageSize = (containerWidth - 2.5) / 2;
      const threeImageSize = (containerWidth - 2.5 * 2) / 3;
      this.setData({
        twoImageSize: twoImageSize,
        threeImageSize: threeImageSize
      });
    },
    
  }
 
 
})
