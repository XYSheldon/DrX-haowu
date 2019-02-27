//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'X医生的实验性小程序~',
    msg: '点我看看~',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  localunlock()
  {
    wx.request({
      url: 'http://192.168.10.10:8080/cgi-bin/web2ser?18', // 仅为示例，并非真实的接口地址
      method:'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log(res.data);
        if (res.data.match('GPIO')=='GPIO')
        {
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000,
            mask: true
          })
        };
      }
    })
  },
  clickMe() {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        wx.vibrateShort(),
          wx.showToast({
            title: '指纹成功弹窗测试~',
            icon: 'success',
            duration: 2000
          })
      }
    });
    if (this.data.msg == '点我看看~') {
      this.setData({
        msg: '好玩吗？'
      });
    } else {
      this.setData({
        msg: '点我看看~'
      });
    };
    wx.cloud.callFunction({
      name: 'test',
      complete: res => {
        console.log('callFunction test result: ', res)
      }
    })
  },
  clickMe2() {
    wx.navigateTo({
      url: '../ble/ble'
    })
  },
  wifibutton() {
    wx.navigateTo({
      url: '../wifi/wifi'
    })
  },
  accbutton() {
    wx.navigateTo({
      url: '../acc/acc'
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    wx.cloud.init({
      traceUser: true
    });
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})