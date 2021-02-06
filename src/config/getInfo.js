function getUserInfo() {
    let d = localStorage.getItem('userInfo');
    return JSON.parse(d) || [];

}

function isMobile() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    return /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent);
}

exports.getUserInfo = getUserInfo();
exports.isMobile = isMobile();