Page({
	data:{
		indicatorDots:false,
		autoplay:false,
        imgUrls:[]
	},
	toLink:function(e){
		  wx.redirectTo({ url: '../board/board' })
	},
	onLoad(){
		 const that = this;
         var limit=5;
        wx.request({
            url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getslide',
            data: {limit:limit,type:"coming_soon"},
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
               that.setData({
                imgUrls:res.data
               })
            }
        })
	}
})