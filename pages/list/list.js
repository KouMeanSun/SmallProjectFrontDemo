// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this;
    wx.request({
      url: 'http://127.0.0.1:8080/demo/superadmin/listarea',
      method: 'GET',
      data: {},
      success: function(res) {
        var list = res.data.areaList;
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          self.setData({
            list: list
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 添加区域信息
   */
  addArea: function() {
    wx.navigateTo({
      url: '../opreation/operation',
    })
  },
  /**
   * 删除区域信息
   */
  deleteArea: function(e) {
    var self = this;
    var areaId = e.target.dataset.areaid;
    var areaName = e.target.dataset.areaname;
    wx.showModal({
      title: '提示',
      content: '确定要删除[' + e.target.dataset.areaname + ']吗？',
      success: function(sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://127.0.0.1:8080/demo/superadmin/removearea',
            data: {
              "areaId": areaId
            },
            method: "GET",
            success: function(res) {
              var result = res.data.success;
              var toastText = "删除成功！";
              if (result != true) {
                toastText = "删除失败！";
              } else {
                self.data.list.splice(e.target.dataset.index, 1);
                self.setData({
                  list: self.data.list
                });
              }
              wx.showToast({
                title: toastText,
                icon: '',
                duration: 2000
              })
            }
          })
        }
      }
    })
  }
})