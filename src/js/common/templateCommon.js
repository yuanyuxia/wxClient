$(function () {
  isWX();
})
document.write("<script language=javascript src='./src/js/common/base64.js'></script>");
// 设置rem字体大小
/*让文字和标签的大小随着屏幕的尺寸做变话 等比缩放*/
var html = document.getElementsByTagName('html')[0];
/*取到屏幕的宽度*/
var width = window.innerWidth;
var fontSize = parseInt(20 / 750 * width);
/*设置fontsize*/
html.style.fontSize = fontSize + 'px';
// 点击切换tab栏
function switchover(obj) {
  $(obj.nav_parent).find(obj.nav_label).click(function () {
    $(this).addClass(obj.nav_class).siblings().removeClass(obj.nav_class);
    obj.index = $(this).index();
    if (obj.con_parent && !obj.con_class) {
      $(obj.con_parent).eq(obj.index).show().siblings().hide();
    }
    if (obj.con_parent && obj.con_class) {
      $(obj.con_parent).eq(obj.index).addClass(obj.con_class).siblings().removeClass(obj.con_class);
    }
  })
}
//调用
// switchover({
//   nav_parent:"nav ul",
//   nav_label:'li',
//   nav_class:'active',
//   con_parent:'.con ul li',
//   con_class:'show'
// });

function ajax_get(url, obj, fun) {
  var Ajaxapi = "http://116.196.70.218:10100/client-web-wx";
  $.ajax({
    type: "get",
    url: Ajaxapi + url,
    header: { "multiple": "Access-Control-Allow-Origin" },
    data: obj,
    dataType: "json",
    success: fun,
    error: function (e) {
      layer.msg("出现异常，请重新尝试")
    }
  })
}
function ajax_post(url, obj, fun) {
  var Ajaxapi = "http://116.196.70.218:10100/client-web-wx";
  $.ajax({
    type: "post",
    url: Ajaxapi + url,
    header: { "multiple": "Access-Control-Allow-Origin" },
    data: obj,
    dataType: "json",
    success: fun,
    error: function (e) {
      layer.msg("出现异常，请重新尝试")
    }
  })
}
var storage = {
  // 储存localStorage的值
  set: function (name, val) {
    val = JSON.stringify(val);
    if (window.localStorage.hasOwnProperty(name)) {
      window.localStorage[name] = val;
    } else {
      window.localStorage.setItem(name, val)
    }
  },
  //获取localStorage的值
  get: function (name) {
    if (window.localStorage.hasOwnProperty(name)) {
      return window.localStorage[name];
    } else {
      return null;
    }
  },
  //删除localStorage的值
  remove: function (name) {
    if (window.localStorage.hasOwnProperty(name)) {
      return window.localStorage.removeItem(name);
    }
  }
}
// cookie的使用
$.extend({
  GetRequest: function () {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  GetWXUserInfo: function () {
    var Request = new Object();
    Request = $.GetRequest();
    var code = Request["code"];
  },
  //设置cookie
  setCookie: function (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  //获取cookie
  getCookie: function (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  },
  //清除cookie 
  clearCookie: function (name) {
    $.setCookie(name, "", -1);
  }
})
// 减运算，避免数据相除小数点后产生多位数和计算精度损失。
function subtractNum(arg1, arg2) {
  return (arg1 * 1000 - arg2 * 1000) / 1000;
}
// 乘运算，避免数据相除小数点后产生多位数和计算精度损失。
function subNum(arg1, arg2) {
  return (arg1 * 1000) * (arg2 * 1000) / 1000000;
}
// 相加运算，避免数据相除小数点后产生多位数和计算精度损失。
function andNum(arg1, arg2) {
  return ((arg1 * 1000) + (arg2 * 1000)) / 1000;
}
// 除，避免数据相除小数点后产生多位数和计算精度损失。
function divideNum(arg1, arg2) {
  return ((arg1 * 1000) / (arg2 * 1000));
}
//获取地址栏参数值
function getUrlParms(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}

//设置body的高度最小为终端高度
function min_height() {
  if ($("html body").height() < $(window).height()) {
    $("html body").height($(window).height());
  }
}
/* 是否为微信浏览器 */
function isWX() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    initialize();
    return true;
  } else {
    initialize();
    $('body').html('<div style="text-align:center;margin-top:100px;font-size:14px">请在微信客户端打开</div>');
    return true;
  }
}
// 微信初始化状态
var token;
/* 微信初始化 */
function initialize() {
  var obj = { "url": "http://www.hexiao.com" };//网站地址
  ajax_get("/auth/wechat_pub/jsapi/config", obj, function (res) {
    if (res.code == 200) {
      console.log(res);
      token = res.code;
      statusName(token);
    } else {
      return false;
    }
  })
}
/* 获取用户绑定状态 */
function statusName(token) {
  ajax_get("/auth/wechat_pub/user/status", { "token": token }, function (res) {
    console.log(res);
    //未绑定用户
    if (res.data.status ==false) {
      // 已授权
      if (window.location.search.indexOf("auth_from") > -1) {
        var sessionId = getUrlParms("sessionId");
        storage.set("sessionId", sessionId);
        var state = getUrlParms("state");
        storage.set("state", state);
      }
      if (localStorage.hasOwnProperty('sessionId') && localStorage.hasOwnProperty('state')) {
        // 已登录
        if (getUrlParms("state") == "1") {
          window.location.href = "/";
        }
        //未登录
        if (getUrlParms("state") == "0") {
          window.location.href = "/home/login.html";
        }
      } else {
        // 初始进入页面的地址
        var initialUrl = window.location.href;
        // 授权地址
        var windowUrl = "www.hexiao.com";
        windowUrl = codeHandler.encode(windowUrl, 'base64');//base6编码
        var loginUrl = initialUrl + "?auth_from=" + windowUrl; //登录地址
        window.location.href = "http://116.196.70.218:10100/client-web-wx/auth/wechat_pub/redirect/url?uri=" + loginUrl + "&snsapi=userinfo";
      }
    };
    // 已绑定用户
    if (res.data.status == true) {
      return true;
    }
  })
}