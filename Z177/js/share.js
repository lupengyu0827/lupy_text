

//引入微信文件
document.write("<script src='https://res.wx.qq.com/open/js/jweixin-1.0.0.js'></script>");
//记录分享信息

//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
    if (result == null || result.length < 1) {
        return "";
    }
    return result[1];
}
function _AddPageView(App, URL, OpenID, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        GUID: _GUID,
        URL: document.URL,
        UrlReferrer: document.referrer,
        Src: getQueryStringByName("src"),
        Remark: Remark
    });

    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            //alert(textStatus);
        }
    });
}
//JS操作cookies方法!
//写cookies
function setCookie(name, value) {
    var Days = 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null
}
//生成guid
function CreateGUID() {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}

//记录日志的URL
_LogURL = "https://wx.fractalist.com.cn/fractalist/systemcommon/log"
_PVURL = "https://wx.fractalist.com.cn/fractalist/systemcommon/pageview";
// 改
_App = "奔驰填色值";
_GUID = getCookie("_GUID");
console.log("_GUID:" + _GUID);
if (_GUID == "" || _GUID == null) {
    //生成一个guid
    _GUID = CreateGUID();
    //保存到cookie中
    setCookie("_GUID", _GUID);
}
//没有openid 的时可以使用guid 作为用户id 统计uv
_OpenID = getCookie("_OpenID");
//_OpenID = _GUID;
_Mobile = "",
_Type = "";
_SubType = "";
_Method = "";
_Parameter = document.URL;
_Content = "";
_Remark = "";
//记录pv_uv
_AddPageView(_App, _PVURL, _OpenID, _Remark);


function _Log(URL, App, OpenID, Mobile, Type, SubType, Method, Parameter, Content, Remark) {

    var paras = $.param({
        App: App,
        OpenID: OpenID,
        Guid: _GUID,
        Mobile: Mobile,
        Type: Type,
        SubType: SubType,
        Method: Method,
        Parameter: Parameter,
        Content: Content,
        Remark: Remark
    });
    $.ajax({
        type: "post",
        url: URL,
        data: paras,
        dataType: "json",
        success: function (data) {
            if (data.Success) {
                console.log(true);
            } else {
                console.log(false);
            }
        },
        error: function (xhr, textStatus) {
            console.log(xhr);
            //alert(textStatus);
        }
    });
}
//分享后记录数据
function RecordShare(type, remark) {
    _SubType = type;
    _Remark = remark;
    _Log(_LogURL, _App, _OpenID, _Mobile, "分享", _SubType, _Method, _Parameter, _Content, _Remark);
}

//朋友圈分享
function share(pengyouquanTitle, wxtitle, wxdesc, wxlink, wximgUrl) {
    pengyouquanTitle = pengyouquanTitle;
    wxtitle = wxtitle;
    wxdesc = wxdesc;
    wxlink = wxlink;
    wximgUrl = wximgUrl;
    onloadFun();
}

$(function () {

//	var score = getCookie('score');
//	var min = getCookie('min');
//	var sec = getCookie('sec');
	if( score <= 360 && score >=0 ){
		pengyouquanTitle = "秀出真实水平而已，和全球色差大师PK的机会是我的！";
		wxlink = "http://wx.fractalist.com.cn/benzweb/html/color/shareIndex.html?minute="+min+"&second="+sec;
		wxtitle = "秀出真实水平而已，和全球色差大师PK的机会是我的！";
	}else if( score > 360 ){
		pengyouquanTitle = "太难了！我觉得我的双眼还能再抢救一下";
		wxlink = "http://wx.fractalist.com.cn/benzweb/html/color/shareIndex.html?minute="+min+"&second="+sec;
		wxtitle = "太难了！我觉得我的双眼还能再抢救一下";
	}else{
		pengyouquanTitle = "你说的红是什么红？大神级的色差挑战了解一下～";
		wxlink = "http://wx.fractalist.com.cn/benzweb/api/benz/color";
		wxtitle = "你说的红是什么红？大神级的色差挑战了解一下～";
	}
    wxdesc = "够出色，就上榜！";
//  wxlink = "https://zw.benz.wx.fractalist.com.cn/html/color/index.html";
    wximgUrl = "http://wx.fractalist.com.cn/benzweb/html/color/images/share.jpg";
    share(pengyouquanTitle, wxtitle, wxdesc, wxlink, wximgUrl);
});
function onloadFun() {
    $.ajax({
        async: false,
        url: 'https://benz.wx.fractalist.com.cn/wxapi/wxjsconfig?Url=' + encodeURIComponent(window.location.href.split('#')[0]),
        type: "GET",
        dataType: 'json',
        timeout: 5000,
        beforeSend: function () {
        },
        success: function (json) {
            console.log(json);
            wx.config({
                debug: false,
                appId: json["appId"],
                timestamp: json["timestamp"],
                nonceStr: json["nonceStr"],
                signature: json["signature"],
                jsApiList: [
                       'checkJsApi',
                       'onMenuShareTimeline',
                       'onMenuShareAppMessage',
                       'scanQRCode'
                ]
            });

            wx.ready(function () {
                wx.onMenuShareAppMessage({
                    title: wxtitle,
                    desc: wxdesc,
                    link: wxlink,
                    imgUrl: wximgUrl,
                    trigger: function (res) {

                    },
                    success: function (res) {
                        RecordShare("好友", JSON.stringify(res));

                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                    }
                });

                wx.onMenuShareTimeline({
                    title: pengyouquanTitle,
                    link: wxlink,
                    desc: wxdesc,
                    imgUrl: wximgUrl,
                    trigger: function (res) {
                    },
                    success: function (res) {
                        RecordShare("朋友圈", JSON.stringify(res));
                    },
                    cancel: function (res) {
                        // alert("cancel");
                    },
                    fail: function (res) {
                        // alert("fail");
                    }
                });





            });
        },
        complete: function (XMLHttpRequest, textStatus) {

        },
        error: function (xhr, textStatus) {
            // alert(textStatus);
            console.info(xhr);
        }
    });
}
