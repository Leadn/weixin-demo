Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
        index: 0,
        items: [{
                name: '0',
                value: '百度搜索'
            },
            { name: '1', value: '公众号推送' },
            { name: '2', value: '朋友圈推广' }
        ],
        area: 0,
        radio: 0,
        score: 0,
        switch: false
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            area: e.detail.value,
        })
    },
    radioChange: function(e) {
        console.log('radio发送选择改变，携带值为', e.detail.value)
        this.setData({
            radio: e.detail.value,
        })
    },
    sliderchange: function(e) {
        console.log('slider发送选择改变，携带值为', e.detail.value)
        this.setData({
            score: e.detail.value,
        })
    },
    switchChange: function(e) {
        console.log('switch发送选择改变，携带值为', e.detail.value)
        this.setData({
            switch: e.detail.value,
        })
    },
    formSubmit: function(e) {
    	var that=this;
        //    console.log('form发送选择改变，携带值为', e.detail.value)
        var form = e.detail.value;
        form.area = that.data.area;
        form.radio = that.data.radio;
        form.score = that.data.score;
        form.switch = that.data.switch;
        console.log('form发送选择改变，携带值为', form)
        wx.request({
            url: 'http://localhost/weicms/index.php?s=/addon/Feedback/Feedback/addfeedback', //仅为示例，并非真实的接口地址
            data: form,
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res)
            }
        })
    },
    onReady() {
        wx.setNavigationBarTitle({
            title: '个人《用户反馈'
        })
    }
})
