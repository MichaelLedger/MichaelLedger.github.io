!function(i) {
    function t(e) {
        if (n[e])
            return n[e].exports;
        var r = n[e] = {
            i: e,
            l: !1,
            exports: {}
        };
        return i[e].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    t.m = i, t.c = n, t.i = function(i) {
        return i
    }, t.d = function(i, n, e) {
        t.o(i, n) || Object.defineProperty(i, n, {
            configurable: !1,
            enumerable: !0,
            get: e
        })
    }, t.n = function(i) {
        var n = i && i.__esModule ? function() {
            return i.default
        } : function() {
            return i
        };
        return t.d(n, "a", n), n
    }, t.o = function(i, t) {
        return Object.prototype.hasOwnProperty.call(i, t)
    }, t.p = "", t(t.s = 26)
}({
    21: function(i, t) {},
    26: function(i, t, n) {
        i.exports = n(4)
    },
    4: function(i, t, n) {
        "use strict";
        n(21);
        var e = window.$;
        e(function() {
            e("#pingWriteTab").bind("click", function() {
                e("#pingWriteTab").addClass("active"), e("#pianWriteTab").removeClass("active"), e("#pianWriteListContent").css("display", "none"), e("#pingWriteListContent").css("display", "block"), e("#writeShowImg").css("display", "none")
            }), e("#pianWriteTab").bind("click", function() {
                e("#pianWriteTab").addClass("active"), e("#pingWriteTab").removeClass("active"), e("#pingWriteListContent").css("display", "none"), e("#pianWriteListContent").css("display", "block"), e("#writeShowImg").css("display", "none")
            }), e("#pianWriteList li div .big_font").bind("click", function() {
                var i = e(this).parent().parent().find("img").attr("src"),
                    t = e(this).attr("data-font");
                e("#writeShowImg").attr("src", i), e("#writeShowImg").css("display", "block"), e("#pianWriteList li div .big_font").removeClass("active"), e(this).addClass("active"), e("#writeAudio").attr("src", "//res.hjfile.cn/pt/m/jp/50yin/audio/" + t + ".mp3"), e("#writeAudio")[0].play()
            }), e("#pingWriteList li div .big_font").bind("click", function() {
                var i = e(this).parent().parent().find("img").attr("src"),
                    t = e(this).attr("data-font");
                e("#writeShowImg").attr("src", i), e("#writeShowImg").css("display", "block"), e("#pingWriteList li div .big_font").removeClass("active"), e(this).addClass("active"), e("#writeAudio").attr("src", "//res.hjfile.cn/pt/m/jp/50yin/audio/" + t + ".mp3"), e("#writeAudio")[0].play()
            })
        })
    }
});

