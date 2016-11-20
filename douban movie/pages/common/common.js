function getdetail(id, obj, _utl) {
    var key = 'item' + id;
    var info = wx.getStorageSync(key);
    if (info) {
        obj.setData({
            list: info
        });
        console.log("data from localstorage")
        return true;
    }
    wx.request({
        url: _utl,
        data: { id: id },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            var info = res.data;
            obj.setData({
                list: info
            })
            wx.setStorageSync(key, info)
            console.log("data from server")
        },
        fail: function(res) {
            wx.showToast({
                    title: '数据加载失败...',
                    icon: 'loading',
                    duration: 1000
                }),
                wx.navigateBack()
                // }
        }
    })
}

function getlist(params, _utl, obj, lastId, limit, dist, isstart, key) {
   // var cmsList = wx.getStorageSync(key);
    // if (cmsList) {
    //     wx.showToast({
    //             title: '数据加载中...',
    //             icon: 'loading',
    //             duration: 1000
    //         }),
    //         obj.setData({
    //             list: cmsList,
    //             param: params,
    //             lastId: cmsList[cmsList.length - 1].id,
    //             dist: cmsList[cmsList.length - 1].id - cmsList.length + 1,
    //             title: params.title,
    //             // isstart: true
    //             isload: "当前网络异常，请稍后再试"
    //         })
    //     console.log("data from localstorage")
    //     return true;
    // }
    wx.request({
        url: _utl,
        data: { type: params.type, lastid: lastId, limit: limit, dist: dist },
        header: {
            'Content-Type': 'application/json'
        },
        success: function(res) {
            if (!res.data || ((dist == limit || dist < limit + 1) && isstart)) {
                obj.setData({ isload: "已经没有更多的数据了" });
                wx.showToast({
                    title: '加载完毕',
                    icon: 'success',
                    duration: 2000
                })
                return false;
            }
            var dataArr = obj.data.list;
            var newlist = dataArr.concat(res.data);
            if (lastId==1) {
              wx.setStorageSync(key, newlist)
            }
                //  }
            obj.setData({
                list: newlist,
                param: params,
                lastId: res.data[res.data.length - 1].id,
                dist: res.data[res.data.length - 1].id - res.data.length + 1,
                title: params.title,
                isstart: true
            })
            console.log("data from server")
        },
        fail: function(res) {
        	var cmsList = wx.getStorageSync(key);
        	if (cmsList) {
        		wx.showToast({
                title: '数据加载中...',
                icon: 'loading',
                duration: 1000
            }),
            obj.setData({
                list: cmsList,
                param: params,
                lastId: cmsList[cmsList.length - 1].id,
                dist: cmsList[cmsList.length - 1].id - cmsList.length + 1,
                title: params.title,
                // isstart: true
                isload: "当前网络异常，请稍后再试"
            })
        	}else{
        	    obj.setData({
                isload: "当前网络异常，请稍后再试"
            })
        	}
        }
    })
}
module.exports = {
    getdetail: getdetail,
    getlist: getlist
};
