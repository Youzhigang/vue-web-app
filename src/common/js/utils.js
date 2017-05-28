/**
 *
 * @param {any} date
 * @param {any} fmt     'yyyy-mm-dd HH:mm:ss'
 */
export function formatDate (date, fmt) {
    if ((/(y+)/).test(fmt)) {  // 匹配yyyy
        fmt = fmt.replace(RegExp.$1, ((date).getFullYear() + '').substr(4 - RegExp.$1.length)) // yyyy替换为2xxx年
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str))
        }
    }
    return fmt
}

/**
 * 9-->009 --> 09
 * 12 -->0012 -->12
 */
function padLeftZero (str) {
    return ('00' + str).slice(str.length)
}

/**
 * @private localStorage
 */
export function saveLocalItem (id, k, v) {
    // console.log(k)
    let __entry__ = {}
    __entry__[k] = v
    window.localStorage.setItem(id, JSON.stringify(__entry__))
}

export function getLocalItem (id, k) {
    let __seller__ = window.localStorage[id]
    if (__seller__) {
       return JSON.parse(__seller__.replace(/'/g, '"'))[k]
    } else {
        return false
    }
}

/**
 * @private args String
 * 解析url?a=b&c=d
 */
export function getUrlParam (k) {
   return decodeURI(window.location.search.slice(1))
    .split('&')
    .map(
        (item, index) => {
            if (item.split('=')[0] && item.split('=')[0] === k) {
                return item.split('=')[1]
            } else {
                return ''
            }
        }
    ).filter(
        i => i !== ''
    ).pop()
}
