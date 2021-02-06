function isMobile() {
    const sUserAgent = navigator.userAgent.toLowerCase();
    return /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/.test(sUserAgent);
}

export default isMobile;