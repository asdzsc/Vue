function wxstart() {
    // var url = location.href; //分享的文章地址
    wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxb5cb5dd960997e7a', // 必填，公众号的唯一标识
        timestamp: '1414587457', // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名，见附录1
        jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(function() {
        var shareData = {
            title: '政府牵头推动成立的惠民金融平台',
            desc: '政府牵头推动成立的惠民金融平台',
            imgUrl: 'http://file.puhuijinfu.com/imgLoader/test/phjf/img/2018/10/11/xyswkVTROKdq1xBzEYMB.jpeg'
        };
        wx.onMenuShareAppMessage(shareData);
        wx.onMenuShareTimeline(shareData);
        wx.onMenuShareQQ(shareData);
        wx.onMenuShareWeibo(shareData);
    });
}