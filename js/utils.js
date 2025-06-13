import {
  JSEncrypt
} from 'jsencrypt'
import md5 from "js-md5"
/**
 * 日期格式化
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  if (time == null) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      // 解析 ISO 8601 格式的字符串
      date = new Date(time)
    } else {
      if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
        time = parseInt(time)
      }
      if ((typeof time === 'number') && (time.toString().length === 10)) {
        time = time * 1000
      }
      date = new Date(time)
    }
    // 减去八小时
    date.setHours(date.getHours() - 8)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 获取纯数字随机字符串
 * @param {number} len
 * @returns {string}
 */
export function genNumberRandomString(len) {
  let rdmString = '';
  while (rdmString.length < len) {
    rdmString += parseInt(Math.random() * 10).toString();
  }
  return rdmString
}
/**
 * 截取URL参数
 * @param {string} name
 * @param {string} url
 * @returns {string}
 */
export function getUrlKey(name, url) {
  let href = url ? url : location.href
  return (
    decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(href) || [,
        ''
      ])[1].replace(/\+/g, '%20')
    ) || null
  )
}
/**
 * 生成UUID
 */
export function uuid() {
  var s = []
  var hexDigits = '0123456789ABCDEF'
  for (var i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'

  var uuid = s.join('')
  return uuid
}

/**
 * 拼接参数到url中
 */
export function addParams2Url(url, params) {
  let _str = ''
  for (let o in params) {
    if (params[o] && typeof (params[o]) != 'undefined') {
      _str += o + '=' + params[o] + '&'
    }
  }
  if (url.indexOf('?') >= 0) {
    _str = '&' + _str.substring(0, _str.length - 1)
  } else {
    _str = '?' + _str.substring(0, _str.length - 1)
  }
  return url + _str
}
//将阿拉伯数字转为汉字
export function convertToChineseNumeral(num) {
  if (num == 10) {
    return '十'
  } else if (num == 1) {
    return '一'
  }
  const digits = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千', '万'];
  let result = '';
  let numStr = num.toString();
  for (let i = 0; i < numStr.length; i++) {
    let digit = parseInt(numStr.charAt(i));
    let unit = units[numStr.length - i - 1];
    if (digit === 0) {
      // 当前数字为0时不需要输出汉字，但需要考虑上一个数字是否为0，避免出现连续的零
      if (result.charAt(result.length - 1) !== '零') {
        result += '零';
      }
    } else {
      result += digits[digit] + unit;
    }
  }
  // 对于一些特殊的数字，如10、100等，需要在最前面加上“一”
  if (result.charAt(0) === '一') {
    result = result.substr(1, result.length);
  } else if (result.charAt(0) === '百') {
    result = '一' + result;
  } else if (result.charAt(0) === '千') {
    result = '一' + result;
  }
  return result;
}
/**
 * file转base64
 * @param { * } file 图片文件
 * @return {base64}
 */
export const fileToBase64 = (blob, callback) => {
  // #ifdef H5
  let reader = new FileReader();
  reader.onload = function (e) {
    callback && callback(e.target.result)
  };
  reader.readAsDataURL(blob);
  // #endif
  // #ifdef APP-PLUS
  plus.io.resolveLocalFileSystemURL(blob, (entry) => {
    entry.file((file) => {
      let fileReader = new plus.io.FileReader();
      fileReader.onloadend = (e) => {
        callback && callback(e.target.result)
      };
      fileReader.readAsDataURL(file);
    })
  })
  // #endif
  // #ifdef MP-WEIXIN
  uni.getFileSystemManager().readFile({
    filePath: blob, //选择图片返回的相对路径
    encoding: 'base64', //编码格式
    success: res => { //成功的回调
      let base64 = res.data //不加上这串字符，在页面无法显示的哦 就不加 气死你
      callback && callback(base64)
    },
    fail: (e) => {
    }
  })
  // #endif
};

export const publicKey =
  "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMio/whyeFw0wHspkrh2x9t5mVzd4NSm\nbF0hj62eA5hlvS6//J9JDwwOHLJ1bv4A/C4yL3A8QdwZKTf3FS9pn/UCAwEAAQ==";


//密码加密RSA
export const rsa = (str, key = publicKey) => {
  const encryptor = new JSEncrypt();
  encryptor.setPublicKey(key);
  return encryptor.encrypt(str);
}
//密码加密MD5
export const MD5 = (str) => {
  return md5(str);
}
export const deepClone = (obj) => {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
export function randomn(n) {
  if (n > 21) return null
  var re = new RegExp("(\\d{" + n + "})(\\.|$)")
  var num = (Array(n - 1).join(0) + Math.pow(10, n) * Math.random()).match(re)[1]
  return num
}
export function formatName(name) {
  var newStr;
  if (name.length === 2) {
    newStr = name.substr(0, 1) + '*';
  } else if (name.length > 2) {
    var char = '';
    for (var i = 0, len = name.length - 2; i < len; i++) {
      char += '*';
    }
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  } else {
    newStr = name;
  }
  return newStr;
}

/**
 * 对比版本号，如需要，请自行修改判断规则
 * 支持比对	("3.0.0.0.0.1.0.1", "3.0.0.0.0.1")	("3.0.0.1", "3.0")	("3.1.1", "3.1.1.1") 之类的
 * @param {Object} v1
 * @param {Object} v2
 * v1 > v2 return 1
 * v1 < v2 return -1
 * v1 == v2 return 0
 */
export function compare(v1 = '0', v2 = '0') {
  v1 = String(v1).split('.')
  v2 = String(v2).split('.')
  const minVersionLens = Math.min(v1.length, v2.length);

  let result = 0;
  for (let i = 0; i < minVersionLens; i++) {
    const curV1 = Number(v1[i])
    const curV2 = Number(v2[i])

    if (curV1 > curV2) {
      result = 1
      break;
    } else if (curV1 < curV2) {
      result = -1
      break;
    }
  }

  if (result === 0 && (v1.length !== v2.length)) {
    const v1BiggerThenv2 = v1.length > v2.length;
    const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
    for (let i = minVersionLens; i < maxLensVersion.length; i++) {
      const curVersion = Number(maxLensVersion[i])
      if (curVersion > 0) {
        v1BiggerThenv2 ? result = 1 : result = -1
        break;
      }
    }
  }
  return result;
}


export function createBannerContainer() {
  return new Promise((resolve, reject) => {
    plus.bridge.exec('BannerView', 'createBannerContainer', [], function(res) {
      resolve(res);
    }, function(error) {
      reject(error);
    });
  });
}
