const app = getApp()
Page({

  data: {
    x: 0,
    y: 0,
    z: 0,
    rotate: 0,
    img: '../../image/arrow.png'
  },
  start() {
    var _this = this;
    console.info("加速度计开启 ui间隔");
    wx.startAccelerometer({
      interval: 'ui',
      complete: function(res) {
        wx.onAccelerometerChange(function (res) {
          /*  console.log(res.x)
            console.log(res.y)
            console.log(res.z) */
          var r = res;
          _this.animation.rotate((res.y) * 90).step({
            duration: 200,

          })
          _this.setData({
            animation: _this.animation.export()
          })
          _this.setData({
            x: res.x,
            y: res.y,
            z: res.z,
            //rotate: res.y * 90
          })
        })
      },

    })

  },
  stop() {
    wx.stopAccelerometer({
      success: function(res) {
        console.info("加速度计终止");
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onUnload() {
    this.stop();
  },
  onReady: function() {
    this.stop();
    var _this = this;
    _this.animation = wx.createAnimation();
  }
})