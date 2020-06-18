// component/stars.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },


lifetimes: {

  //生命周期函数

  attached: function() {

    var that = this //定义全局变量

    var rate = that.properties.rate

    //console.log(rate)

    var intRate = parseInt(rate)

    //星星个数

    var light = parseInt(intRate / 2)

    //半个星星个数

    var half = intRate % 2

    //灰色星星个数

    var gray = 5 - light - half

    var lights = []

    var halfs = []

    var grays = []

    for (var index = 1; index <= light; index++) {

      lights.push(index)

    }

    for (var index = 1; index <= half; index++) {

      halfs.push(index)

    }

    for (var index = 1; index <= gray; index++) {

      grays.push(index)

    }

    var rateText = rate && rate > 0 ? rate.toFixed(1) : "未评分"



    that.setData({

      rateText: rateText,

      lights: lights,

      halfs: halfs,

      grays: grays

    })

  },

},


})