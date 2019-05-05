Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:'',
    today:{},
    todayInfo:[],
    index:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.loadInfo();
  },
  loadInfo:function(){
    var page =  this;
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        page.loadCity(latitude, longitude);
      },
    })
  },

  loadCity: function (latitude, longitude){
    var page = this;
    wx.request({
      url: 'http://api.map.baidu.com/geocoder/v2/?location='+latitude+','+longitude+'&output=json&pois=0&latest_admin=1&ak=OhfiNZ0y0srIj5IVKFT93YsTblMB6a6p', // 仅为示例，并非真实的接口地址

      success(res) {
        var city = res.data.result.addressComponent.city;
        city = city.replace('市','');
        page.setData({city:city});
        page.loadweter(city);
      }
    });
  },

  loadweter: function (city) {
    var page = this;
    wx.request({
      url: 'https://api.jisuapi.com/weather/query?appkey=b99d30033e1b0425&city='+city, // 仅为示例，并非真实的接口地址

      success(res) {
        var todayInfo = res.data.result.daily;
        var today = todayInfo.shift();
        today.week = res.data.result.week;
        today.temp = res.data.result.temp;
        today.weather = res.data.result.weather;
        today.winddirect = res.data.result.winddirect;
        today.windpower = res.data.result.windpower;
        var index = res.data.result.index;
        page.setData({today:today,index:index,todayInfo:todayInfo});
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})