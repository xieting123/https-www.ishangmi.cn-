function getScript() {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js',
        dataType: "script",
        cache: true
    }).done(function () {
        resolve(window.wx)
    }).fail(function (error) {
        reject(error);
    });
})
}

function act() {
    return new Promise((resolve, reject) => {
        $.ajax({
        url: "https://web.ishangmi.cn/share/wx/ticket",
        type: "POST",
        async: true,
        data: {'url': location.href.split('#')[0]},
        cache: false,
        dataType: "json"
    }).done(function (data) {
        resolve({
            // debug: true,
            appId: data.appId,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature
        })
    }).fail(function (ret) {
        reject(ret);
    })
})
}

function wechatShare(data) {
    return new Promise(async function (resolve, reject) {
        try {
            //设置默认值
            data.link = location.href;
            // if (data.imgUrl == null) {
            data.imgUrl = 'https://www.ishangmi.cn/static/images/logostrokewhite.png';
            // }
            if (data.title == null) {
                data.title = '商蜜互动交友';
            }
            if (data.desc == null) {
                data.desc = '商蜜互动交友';
            }
            data.title = '商蜜 | ' + data.title;
            /*let isWechat=navigator.userAgent.indexOf('MicroMessenger')>-1 //判断为微信浏览器
            if(!isWechat){
                //qq/wb
                if(data.imgUrl != null){
                    $('meta[itemprop=image]').attr('content',data.imgUrl);//图片
                }
                $('title').text(data.title);//标题
                $('meta[itemprop=name]').attr('content',data.title);//标题
                $('meta[name=description]').attr('content',data.desc);//内容
                // return resolve('not weichat')
            }*/

            $('title').text(data.title);//标题
            $('meta[itemprop=image]').attr('content', data.imgUrl);//图片
            $('meta[itemprop=name]').attr('content', data.title);//标题
            $('meta[itemprop=description]').attr('content', data.desc);//内容

            if (!window.wx) {
                await
                getScript();
            }

            let ret = await
            act();
            wx.config($.extend({
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'showOptionMenu',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeiBo',
                    'onMenuShareQZone'
                ]
            }, ret));

            //增加转发数量
            var success = function () {
                var url = location.href;
                if (url.contains('moments')) {
                    url = "https://api.ishangmi.cn/moments/forward?momentId=";
                    //商道//商报//商讯
                } else if (url.contains('news_dao') || url.contains('news_bao') || url.contains('news_xun')) {
                    url = "https://api.ishangmi.cn/news/forward?id=";
                } else if (url.contains('fund')) {
                    url = "https://api.ishangmi.cn/fund/forward?id=";
                } else if (url.contains('doctor_advice') || url.contains('legal_advice')) {
                    return;
                    // url = "https://api.ishangmi.cn/advice/forward?id=";
                } else if (url.contains('doctor_bleachery') || url.contains('legal_bleachery')) {
                    url = "https://api.ishangmi.cn/bleachery/forward?id=";
                } else if (url.contains('goods')) {
                    return;
                    // url = "https://api.ishangmi.cn/goods/forward?id=";
                }

                $.ajax({
                    url: url + getUrlParam('id'),
                    type: "get",
                    dataType: "json"
                }).done(function (data) {
                }).fail(function (ret) {
                })
            };

            wx.ready(function () {
                wx.onMenuShareTimeline({
                    title: data.desc,
                    desc: '',
                    link: data.link,
                    imgUrl: data.imgUrl,
                    dataUrl: '',
                    success: success,
                    cancel: function () {
                    },
                    fail: function (res) {
                    }
                });
                wx.onMenuShareAppMessage({
                    title: data.title,
                    desc: data.desc,
                    link: data.link,
                    imgUrl: data.imgUrl,
                    dataUrl: '',
                    success: success,
                    cancel: function () {
                    },
                    fail: function (res) {
                    }
                });
                wx.onMenuShareQQ({
                    title: data.title,
                    desc: data.desc,
                    link: data.link,
                    imgUrl: data.imgUrl,
                    dataUrl: '',
                    success: success,
                    cancel: function () {
                    },
                    fail: function (res) {
                    }
                });
                // 分享到QQ空间
                wx.onMenuShareQZone({
                    title: data.title,
                    desc: data.desc,
                    link: data.link,
                    imgUrl: data.imgUrl,
                    dataUrl: '',
                    success: success,
                    cancel: function () {
                    },
                    fail: function (res) {
                    }
                });
                // 分享到WeiBo
                wx.onMenuShareWeiBo({
                    title: data.title,
                    desc: data.desc,
                    link: data.link,
                    imgUrl: data.imgUrl,
                    dataUrl: '',
                    success: success,
                    cancel: function () {
                    },
                    fail: function (res) {
                    }
                });

            })
        } catch (error) {
            reject(error);
        }
    })

}