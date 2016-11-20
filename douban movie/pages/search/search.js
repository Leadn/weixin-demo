Page({
    data: {
        list: [],
        iswifi: true,
        isshow: true,
        isdown:false
    },
    post(event) {
        var postdata = event.detail.value;
        if (!postdata) {
            return false;
        }
        var that = this;
        var isdown = false;
        var _url = 'https://api.douban.com/v2/movie/search?q=';
        if (!that.data.iswifi && that.data.isshow) {
            wx.showModal({
                content: '您当前不在wifi环境下,继续将产生流量费用',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        that.setData({
                            isshow: false,
                            isdown:true
                        })
                        wx.showToast({
                                title: '数据加载中...',
                                icon: 'loading',
                                duration: 1000
                            }),
                            wx.request({
                                url: _url + postdata,
                                data: {},
                                header: {
                                    'Content-Type': 'application/json'
                                },
                                success: function(res) {
                                    that.setData({
                                        list: res.data.subjects
                                    })
                                    console.log(res.data.subjects)
                                }
                            })
                    }
                }
            })
        }
        if(!that.data.isshow&&that.data.isdown){
            wx.showToast({
                title: '数据加载中...',
                icon: 'loading',
                duration: 1000
            }),
            wx.request({
                url: _url + postdata,
                data: {},
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    that.setData({
                        list: res.data.subjects
                    })
                    console.log(res.data.subjects)
                }
            })
        }
        // wx.showToast({
        //         title: '数据加载中...',
        //         icon: 'loading',
        //         duration: 1000
        //     }),
        //     wx.request({
        //         url: _url + postdata,
        //         data: {},
        //         header: {
        //             'Content-Type': 'application/json'
        //         },
        //         success: function(res) {
        //             that.setData({
        //                 list: res.data.subjects
        //             })
        //             console.log(res.data.subjects)
        //         }
        //     })
    },
    focus(event) {
        this.setData({ list: [] })
    },
    onLoad() {
        var _this = this;
        wx.getNetworkType({
            success: function(res) {
                var networkType = res.networkType; // 返回网络类型2g，3g，4g，wifi
                if (networkType != "wifi") {
                    _this.setData({
                        iswifi: false
                    })
                }
            }
        })
    },
    onReady() {
        wx.setNavigationBarTitle({
            title: '电影首页《电影列表'
        })
    }
})
