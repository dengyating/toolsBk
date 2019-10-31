export function Base64() {
    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
    // public method for encoding
    this.encode = function (input) {
      var output = "";
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0;
      input = _utf8_encode(input);
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
          enc4 = 64;
        }
        output = output +
          _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
          _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
      }
      return output;
    }
  
    // public method for decoding
    this.decode = function (input) {
      var output = "";
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      output = _utf8_decode(output);
      return output;
    }
  
    // private method for UTF-8 encoding
    var _utf8_encode = function (string) {
      string = string.replace(/\r\n/g, "\n");
      var utftext = "";
      for (var n = 0; n < string.length; n++) {
        var c = string.charCodeAt(n);
        if (c < 128) {
          utftext += String.fromCharCode(c);
        } else if ((c > 127) && (c < 2048)) {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        } else {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
  
      }
      return utftext;
    }
  
    // private method for UTF-8 decoding
    var _utf8_decode = function (utftext) {
      var string = "";
      var i = 0;
      var c = 0, c1 = 0, c2 = 0, c3 = 0;
      while (i < utftext.length) {
        c = utftext.charCodeAt(i);
        if (c < 128) {
          string += String.fromCharCode(c);
          i++;
        } else if ((c > 191) && (c < 224)) {
          c2 = utftext.charCodeAt(i + 1);
          string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = utftext.charCodeAt(i + 1);
          c3 = utftext.charCodeAt(i + 2);
          string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
      return string;
    }
}
export function RndNum(n) {
    var rnd = "";
    for (var i = 0; i < n; i++)
      rnd += Math.floor(Math.random() * 10);
    return rnd;

}
export function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "" || obj == "null") {
        return true;
    } else {
        return false;
    }
}
export function IsPC() {
    var userAgentInfo = navigator.userAgent;
    // alert(userAgentInfo)
    console.log(userAgentInfo)
    var Agents = ["Android", "iPhone",
      "SymbianOS", "Windows Phone",
      "iPad", "iPod", "webOS",
      "BlackBerry", "IEMobile",
      "Opera Mini", "Mobi"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    return flag;
}
//判断是否微信端
export function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if ((ua.match(/MicroMessenger/i) == 'micromessenger') && (ua.indexOf('mobile') > -1)) {
        return true;
    } else {
        return false;
    }
}
// 判断是否为QQ浏览器
export function isQQ() {
    var u = navigator.userAgent;
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/QQ\/[0-9]/i)) {
        console.log("qq内置浏览器")
        return true;
    } else if (ua.indexOf('mqqbrowser') > -1 && ua.indexOf(" qq") < 0) {
        console.log("qq浏览器")
        return "mqqbrowser";
    } else {
        return false;
    }
}
// 获取地址栏的参数
export function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.href;
    if (r.indexOf(name) > -1) {
        // debugger
        return r.split(name + '=')[1]
    } else {
        return null
    }
}
// 浏览器版本信息
export function getBrowserInfo() {
    var Sys = {};
    var ua = navigator.userAgent.toLowerCase();
    // console.log("浏览器的版本号",ua)
    var re = /(msie|firefox|chrome|opera|version|fxios|ucbrowser|crios|micromessenger|MicroMessenger|Mozilla).*?([\d.]+)/;
    var m = ua.match(re);
    if (isQQ()) {
        Sys.browser = "QQ";
        Sys.ver = 0;
    } else {
        Sys.browser = m[1].replace(/version/, "safari");
        Sys.ver = m[2];
    }
    return Sys;
}
// 年月日时分秒
export function format(time, format) {
    var t = new Date(time);
    var tf = function (i) {
        return (i < 10 ? '0' : '') + i
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (a) {
        switch (a) {
        case 'yyyy':
            return tf(t.getFullYear());
            break;
        case 'MM':
            return tf(t.getMonth() + 1);
            break;
        case 'mm':
            return tf(t.getMinutes());
            break;
        case 'dd':
            return tf(t.getDate());
            break;
        case 'HH':
            return tf(t.getHours());
            break;
        case 'ss':
            return tf(t.getSeconds());
            break;
        }
    })
}
// 判断设备是安卓还是ios
export function phonemodel() {
    // 判断安卓手机
    var u = navigator.userAgent;
    // 返回true为安卓手机   false为苹果手机
    if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
        return "Android";
    }
    if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
        return "ios";
    }
}
let toolsFun = {
    /*localStorage工具---start--*/
    DataSet: function (name, value) {
      let val;
      if (typeof (value) != 'string') {
        val = JSON.stringify(value)
      } else {
        val = value
      }
      if (window.localStorage) {
        window.localStorage.setItem(name, val);
      } else {
        setCookie(name, val)
      }
    },
    DataGet: function (name) {
      let val;
      // val=JSON.parse(window.localStorage.getItem(name));
      try {
        // val = JSON.parse(val)
        if (window.localStorage) {
          val = JSON.parse(window.localStorage.getItem(name));
          val = val.replace("\"", "").replace("\"", "")
        } else {
          val = getCookie(name)
        }
        return val
      } catch (error) {
        if (window.localStorage) {
          val = window.localStorage.getItem(name);
        } else {
          val = getCookie(name)
        }
        return val
      }
    },
    DataRmove: function (name) {
      window.localStorage.removeItem(name)
    },
    setCookie: function (name, value, exday) {
      //判断传入的参数是否至少为2个,return false otherwise
      if (value) {
        //如果传入了cookie过期时间exday就进入添加日期操作
        if (arguments[3]) {
          var exday = exday * 24 * 60 * 60 * 1000;
          document.cookie = name + "=" + value + ";expires=" + (new Date().setTime(new Date().getTime() + exday)).toGMTString();
          return document.cookie;
          //否则直接添加cookie的值
        } else {
          document.cookie = name + "=" + value;
          return document.cookie;
        }
      }
      return false;
    },
    getCookie: function (name) {
      var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
      if (result) {
        return result[2];
      } else {
        return false;
      }
    },
    /*localStorage工具---end--*/
    setSession: function (name, value) {
      let val;
      if (typeof (value) != String) {
        val = JSON.stringify(value)
      } else {
        val = value
      }
      window.sessionStorage.setItem(name, val);
    },
    getSession: function (name) {
      let val;
      val = JSON.parse(window.sessionStorage.getItem(name));
      return val
    },
    removeSession: function (name) {
      window.sessionStorage.removeItem(name)
    },
  }
export default toolsFun;   