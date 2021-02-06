function toFloat(value) {

    value = Math.round(parseFloat(value) * 100) / 100;

    if (value.toString().indexOf(".") < 0) {

        value = value.toString() + ".00";

    }
    return value;
}

function getWeekDate() {
    let now = new Date();
    let day = now.getDay();
    let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return weeks[day];
}

function getScrollTop() {
    var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
    if (document.body) {
        bodyScrollTop = document.body.scrollTop;
    }
    if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
    }
    scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
    return scrollTop;
}

//文档的总高度

function getScrollHeight() {
    var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
    if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
    }
    if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
    }
    scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
    return scrollHeight;
}

//浏览器视口的高度

function getWindowHeight() {
    var windowHeight = 0;
    if (document.compatMode === "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
    } else {
        windowHeight = document.body.clientHeight;
    }
    return windowHeight;
}

function jumpUrl(url) {
    let ok = window.open(url, '_blank')
    if (!ok) {
        window.location.href = url;
    }
}


//是否是手机
function isMobile() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    return /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent);
}

//是否是平板
function isIpad() {
    let ua = navigator.userAgent.toLowerCase();
    return ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

}

function resetNoteVer(nowVer) {
    let exec = /^updateNote-v(\d+)$/ig.exec(nowVer);
    // console.log(exec);
    let n = parseInt(exec[1]);
    // console.log(n);
    for (let i = 0; i < n; i++) {
        localStorage.removeItem(nowVer.replace(n, i));
    }
}

exports.resetNoteVer = resetNoteVer;
exports.isIpad = isIpad;
exports.isMobile = isMobile;
exports.jumpUrl = jumpUrl;
exports.getWindowHeight = getWindowHeight;
exports.getScrollHeight = getScrollHeight;
exports.getScrollTop = getScrollTop;
exports.toFloat = toFloat;
exports.getWeekDate = getWeekDate;
