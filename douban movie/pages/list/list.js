Page({
    data: {
        list: [],
        lastId: 1,
        param: {},
        dist: 0,
        isstart: false,
        isload: "加载更多",
        isshow: true,
        iswifi: true
    },
    loadData(lastId, params) {
        var limit = 2;
        var _this = this;
        var key='list'+params.type;
        if (!params) {
            params = _this.data.param;
        }
        const _utl = "http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList";
        var common=require('../common/common.js');
        wx.showToast({
                title: '数据加载中...',
                icon: 'loading',
                duration: 1000
            }),
            // wx.request({
            //     url: _utl,
            //     data: { type: params.type, lastid: lastId, limit: limit, dist: _this.data.dist },
            //     header: {
            //         'Content-Type': 'application/json'
            //     },
            //     success: function(res) {
            //         if (!res.data || ((_this.data.dist == limit || _this.data.dist < limit + 1) && _this.data.isstart)) {
            //             _this.setData({ isload: "已经没有更多的数据了" });
            //             wx.showToast({
            //                 title: '加载完毕',
            //                 icon: 'success',
            //                 duration: 2000
            //             })
            //             return false;
            //         }
            //         var dataArr = _this.data.list;
            //         var newlist = dataArr.concat(res.data);
            //         //  if(!_this.data.isstart){
            //         wx.setStorageSync(key, newlist)
            //             //  }
            //         _this.setData({
            //             list: newlist,
            //             param: params,
            //             lastId: res.data[res.data.length - 1].id,
            //             dist: res.data[res.data.length - 1].id - res.data.length + 1,
            //             title: params.title,
            //             isstart: true
            //         })
            //     },
            //     fail: function(res) {
            //         // if(!_this.data.isstart){
            //         var cmsList = wx.getStorageSync(key);
            //         if (cmsList != '') {
            //             wx.showToast({
            //                     title: '数据加载中...',
            //                     icon: 'loading',
            //                     duration: 1000
            //                 }),
            //                 _this.setData({
            //                     list: cmsList,
            //                     param: params,
            //                     lastId: cmsList[cmsList.length - 1].id,
            //                     dist: cmsList[cmsList.length - 1].id - cmsList.length + 1,
            //                     title: params.title,
            //                     // isstart: true
            //                     isload: "当前网络异常，请稍后再试"
            //                 })
            //         }else{
            //              _this.setData({
            //                 isload: "当前网络异常，请稍后再试"
            //              }) 
            //         }
            //     }
            // })
            // getlist(type,_utl, obj, lastId, limit, dist, isstart)
            common.getlist(params,_utl,_this,lastId,limit,_this.data.dist,_this.data.isstart,key)
    },
    loadMore: function(event) {
        var id = event.currentTarget.dataset.lastid;
        var pars = this.data.param;
        var that = this;
        if (!that.data.iswifi && that.data.isshow) {
            wx.showModal({
                content: '您当前不在wifi环境下,继续将产生流量费用',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        that.setData({
                            isshow: false
                        })
                    }
                }
            })
        }
        that.loadData(id, pars);
    },
    onLoad(par) {
        var _this = this;
        _this.loadData(1, par);
        _this.setData({
            param: par
        });
        wx.showToast({
                title: '数据加载中...',
                icon: 'loading',
                duration: 1000
            }),
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
