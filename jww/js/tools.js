

function Log(data) {
    console.log(data);
}
//根据QueryString参数名称获取值
function getQueryStringByName(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", 'i'); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(encodeURIComponent(decodeURIComponent(r[2]))); return ""; //返回参数值
}
function replaceAll(str, oldstr, newstr) {
    alert(str.replace(new RegExp(oldstr, newstr), ''));
}
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//后台返回"/Date(1514973703550)/"格式化
//"yyyy-MM-dd hh:mm:ss"
function dataFormat(str, format) {
    return eval('new ' + str.substr(1, str.length - 2)).Format(format);
}
// 获取当前时间YYYY-MM-DD
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}
//var unixtime = 1358932051;
//unixtime to 普通时间
function unixtimetodate(time) {
    var unixtime = time
    var unixTimestamp = new Date(unixtime * 1000)
    let Y = unixTimestamp.getFullYear()
    let M = ((unixTimestamp.getMonth() + 1) > 10 ? (unixTimestamp.getMonth() + 1) : '0' + (unixTimestamp.getMonth() + 1))
    let D = (unixTimestamp.getDate() > 10 ? unixTimestamp.getDate() : '0' + unixTimestamp.getDate())
    let toDay = Y + '-' + M + '-' + D
    return toDay
}


//function isMobile(str) {
//    var patrn = /^1\d{10}$/;
//    if (!patrn.exec(str)) return false
//    return true
//}
function isMobile(str) {
    var patrn = /^1[3|4|5|8|7][0-9]\d{4,8}$/;
    if (!patrn.exec(str)) return false
    return true
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

function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };

        } else {
            script.onload = function () {
                callback();
            };

        }

    };

    script.src = url;
    //console.log(document.getElementsByTagName("body")[0]);
    document.body.appendChild(script);

}

loadScript("https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js", function () {

    //加载,并执行回调函数
    var debug = getQueryStringByName("debug");
    if (debug != "") {
        var vConsole = new VConsole();
    }
    console.log("vconsole load");

});
///ajax 请求
function ajax(url, params, success, error) {

    //请求数据，显示loading
   // var loading = layer.load(1, { shade: [0.01, '#fff'] });
    $.ajax({
        type: "post",
        url: url,
        //contentType: "application/json;charset=utf-8",
        data: params,
        dataType: "json",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("debug",getQueryStringByName("debug"));
        },
        success: function (res) {
            console.log(res);
            if (res.errcode != null && res.errcode == 403) {
                //alert("没有权限");
                location.href = res.data.url + "?backurl=" + location.href;
            } else {
                if (success != undefined) {
                    success(res);
                }
            }
            //完成加载后关闭loading
            //layer.close(loading);
        },
        error: function (xhr, textStatus) {
            if (error != undefined) {
                error(xhr, textStatus);
            }
        }
    });

}