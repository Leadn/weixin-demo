Page({
    data: {
        score: "评分",
        director: "导演",
        summary: "摘要",
        cast: "主演",
        list: []
    },
    onLoad(params) {
        const _this = this;
        const _utl = 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getDetail';
        // var key = 'item' + params.id;
        var common = require('../common/common.js');
        wx.showToast({
                title: '数据加载中...',
                icon: 'loading',
                duration: 1000
            }),
            common.getdetail(params.id, _this, _utl)
    },
    onReady() {
        wx.setNavigationBarTitle({
            title: '电影列表《电影详情'
        })
    }
})
