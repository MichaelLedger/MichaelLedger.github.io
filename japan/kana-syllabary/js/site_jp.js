!function(n, e, t, c) {
    var o = Math.round(+new Date / 864e5),
        a = /^https?:$/.test(location.protocol) && location.protocol || "https:",
        s = function(n) {
            var e = document.createElement("script");
            e.type = "text/javascript", e.async = !0, e.src = n;
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        },
        i = encodeURIComponent(document.referrer);
    if (window.ht && window.ht.__bi && "681f945a-080c-48c3-afad-a7775de88e27" === window.ht.__bi)
        return s(a + "//track.hujiang.com/event?siteid=1&p=redundance@" + n), void console.warn("oops, BI Track file [site_jp.js] is included twice.");
    var d = window.ht || {};
    d.__bi = "681f945a-080c-48c3-afad-a7775de88e27", d.__cache = [], d.sendEvent = function() {
        d.__cache.push(["sendEvent", arguments])
    }, d.sendCustomEvent = function() {
        d.__cache.push(["sendCustomEvent", arguments])
    }, d.sendEventCb = function() {
        d.__cache.push(["sendEventCb", arguments])
    }, d.sendCustomEventCb = function() {
        d.__cache.push(["sendCustomEventCb", arguments])
    }, d.sendAopEvent = function() {
        d.__cache.push(["sendAopEvent", arguments])
    }, d.sendAopCustomEvent = function() {
        d.__cache.push(["sendAopCustomEvent", arguments])
    }, d.sendTrack = function() {
        d.__cache.push(["sendTrack", arguments])
    }, d.getIDs = function() {
        return {}
    }, window.ht = d, d.useParentDomain = t, d.isSupportTrackEvent = c, window._gaq = window._gaq || [], window._siteid = n, s(a + "//trackcommon.hujiang.com/analytics/ht/ht.min.webpack.js?v=" + o), e && s(a + "//trackcommon.hujiang.com/analytics/ht/ht.dsp.min.js?v=" + o), s(a + "//track.hujiang.com/log?siteid=" + n + "&urlref=" + i + "&hj_t=" + +new Date)
}(20, !1, !0, !0);

