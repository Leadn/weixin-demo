Page({
    data: {
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        interval: 5000,
        duration: 1000,
        board:[
        {key:'in_theaters',movies:'正在热映',tle:"正在热映的电影"},
        {key:'coming_soon',movies:'即将上映',tle:"即将上映的电影"},
        {key:'top250',movies:'TOP250',tle:"电影TOP250"},
        ]
    },
    onLoad() {
        const that = this;
         var limit=5;
         var key;
         var imgbox=wx.getStorageSync(key);
         if(imgbox){
          that.setData({
            imgUrls:imgbox
          })
          return true;
         }
        wx.request({
            url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getslide',
            data: {limit:limit,type:"coming_soon"},
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
              var imgbox=res.data;
               that.setData({
                imgUrls:imgbox
               })
                wx.setStorageSync(key, imgbox)
            },
             fail:function(res){
                console.log("data is error")
             }
        })
    },
   onReady(){
                 wx.setNavigationBarTitle({
              title: '电影首页'
      })
    }
})
