export function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = c_name + "=" + escape(value) +
		((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
export function getCookie(cname){
    var name = cname + "="
    var ca = document.cookie.split(';')
    for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim()
        if (c.indexOf(name)==0) { return c.substring(name.length,c.length); }
    }
    return ""
}
export function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y+M+D+h+m+s
   }
