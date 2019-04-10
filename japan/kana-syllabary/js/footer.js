!function(t) {
    function n(o) {
        if (e[o])
            return e[o].exports;
        var i = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    var e = {};
    n.m = t, n.c = e, n.i = function(t) {
        return t
    }, n.d = function(t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            configurable: !1,
            enumerable: !0,
            get: o
        })
    }, n.n = function(t) {
        var e = t && t.__esModule ? function() {
            return t["default"]
        } : function() {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function(t, n) {
        return Object.prototype.hasOwnProperty.call(t, n)
    }, n.p = "", n(n.s = 3)
}([function(t, n) {}, function(t, n, e) {
    function o(t) {
        return t.replace(/<div.*?>/, "").replace(/<\/div>$/g, "")
    }
    function i(t, n) {
        return t.className.match(new RegExp("(\\s|^)" + n + "(\\s|$)"))
    }
    function a(t, n) {
        n.hostname = location.hostname || "", n.isCC = -1 !== n.hostname.indexOf("cctalk.com") || -1 !== n.hostname.indexOf("cctalk.net") || -1 !== n.hostname.indexOf("xcommon.com"), n.isSK = -1 !== n.hostname.indexOf("shangkedu.com"), n.isXJ = -1 !== n.hostname.indexOf("yxb.hujiang.com") || -1 !== n.hostname.indexOf("xuejintech.com") || -1 !== n.hostname.indexOf("uxuepay.com");
        for (var e in c)
            t = t.replace(new RegExp("\\$\\$" + e + "\\$\\$", "g"), "function" == typeof c[e] ? c[e](n) : c[e]);
        return (n.isCC || n.isSK || n.isXJ) && (t = t.replace(/\s*<div class=".*?footer-ft-row">[\s\S]*?<\/div>\n/, "")), t
    }
    var r = {
            footerFt: "hui-footer-ft",
            footer: "hui-footer"
        },
        c = {
            year: function(t) {
                var n;
                if (!t)
                    return 2018;
                if (t.year && (n = t.year), "client" === t.timeMode) {
                    n = (new Date).getFullYear()
                }
                return isNaN(n) ? 2018 : n
            },
            PSB_filing_num: function(t) {
                var n = t.hostname,
                    e = {
                        "yxb.hujiang.com": "31011502007871"
                    },
                    o = {
                        "hujiang.com": "31011502000355",
                        "hjclass.com": "31011502000355",
                        "hjdns.com": "31011502000355",
                        "hjdns.net": "31011502000355",
                        "hjenglish.com": "31011502010355",
                        "hj.vc": "31011502010355",
                        "hjapi.com": "31011502010355",
                        "hjfile.cn": "31011502010355",
                        "yeshj.com": "31011502010355",
                        "hujia.org": "31011502007870",
                        "4008220220.com": "31011502007870",
                        "hitalk.com": "31011502007870",
                        "hjact.com": "31011502007870",
                        "hjdict.com": "31011502007870",
                        "hujia.com": "31011502007870",
                        "cctalk.com": "31011502007911",
                        "cctalk.net": "31011502007911",
                        "xcommon.com": "31011502007911",
                        "shangkedu.com": "31011502007872",
                        "xuejintech.com": "31011502007871",
                        "uxuepay.com": "31011502007871"
                    };
                for (var i in e)
                    if (-1 !== n.indexOf(i))
                        return e[i];
                for (var i in o)
                    if (-1 !== n.indexOf(i))
                        return o[i];
                return "31011502000355"
            },
            compInfo: function(t) {
                return t.isCC ? "上海享互网络科技有限公司" : t.isSK ? "上海尚刻教育科技有限公司" : t.isXJ ? "学金网络科技（上海）有限公司" : "沪江教育科技（上海）股份有限公司  021-61125678"
            },
            compName: function(t) {
                return t.isCC ? "享互" : t.isSK ? "尚刻" : t.isXJ ? "学金" : "沪江"
            }
        },
        s = e(2),
        f = {
            footerTpl: function() {
                return o(a(s, this.config))
            },
            init: function(t) {
                this.config = "object" == typeof t ? t : {}, this.renderFooter()
            },
            renderFooter: function() {
                var t = document.getElementById("footer-ft");
                if (!t)
                    return void console.log("Failed to retrieve the footer-ft element");
                i(t, r.footerFt) ? t.innerHTML = o(this.footerTpl()) : (t.className += "" === this.className ? r.footer : i(t, r.footer) ? "" : " " + r.footer, t.innerHTML = this.footerTpl())
            }
        };
    t.exports = f
}, function(t, n) {
    t.exports = '<div class="hui-footer">\n\t\n\n\n\t\n\n\n\n\n\n\n<div class="hui-footer-ft">\n\t\n\t<div class="hui-footer-ft-row">\n\t\t<p>\n\t\t\t\n\t\n\t\t\t<a href="//www.hujiang.com/about/" target="_blank">关于沪江</a>\n\t\t\n\t\t\t<b>|</b>\n\t\t\n\t\n\t\t\t<a href="//kefu.hujiang.com/" target="_blank">客服中心</a>\n\t\t\n\t\t\t<b>|</b>\n\t\t\n\t\n\t\t\t<a href="//jobs.hujiang.com/" target="_blank">诚聘英才</a>\n\t\t\n\t\t\t<b>|</b>\n\t\t\n\t\n\t\t\t<a href="//pass.hujiang.com/agreement" target="_blank">法律声明</a>\n\t\t\n\t\t\t<b>|</b>\n\t\t\n\t\n\t\t\t<a href="//www.hujiang.com/about/contact/" target="_blank">联系我们</a>\n\t\t\n\t\t\t<b>|</b>\n\t\t\n\t\n\t\t\t<a href="http://www.hujiang.com/zt/hystory/" target="_blank">沪友故事</a>\n\t\t\n\t\n\n\t\t</p>\n\t</div>\n\t\n\t<div class="hui-footer-ft-row">\n\t\t<p class="hui-footer-ft-oncall">\n\t\t\t<span>不良信息举报电话：4008-220-220&nbsp&nbsp&nbsp&nbsp</span>\n\t\t\t<span>夜间（00:00-09:00） 18930607725</span>\n\t\t</p>\n\t</div>\n\t<div class="hui-footer-ft-row">\n\t\t<p class="hui-footer-ft-contact">\n\t\t\t<span>$$compInfo$$&nbsp&nbsp&nbsp&nbsp</span><a href="http://www.miitbeian.gov.cn/" target="_blank">ICP认证：沪B2-20110096</a>\n\t\t</p>\n\t\t<p class="hui-footer-ft-copyright">\n\t\t\t<span>Copyright © $$year$$ $$compName$$ All Rights Reserved.</span>\n\t\t</p>\n\t</div>\n\t<div class="hui-footer-ft-row hui-footer-ft-row-icon">\n\t\t<p class="hui-footer-ft-icon">\n\t\t\n\t\t\t<a class="hui-footer-ft-icon-1" href="http://report.12377.cn:13225/toreportinputNormal_anis.do" title="网上有害信息举报专区" target="_blank">\n\t\t\t\t<i></i> \n\t\t\t\t<span>网上有害信息举报专区</span>\n\t\t\t</a>\n\t\t\n\t\t\t<a class="hui-footer-ft-icon-3" href="http://www.shjbzx.cn/" title="上海互联网举报中心" target="_blank">\n\t\t\t\t<i></i> \n\t\t\t\t<span>上海互联网举报中心</span>\n\t\t\t</a>\n\t\t\n\t\t\t<a class="hui-footer-ft-icon-4" href="http://www.sgs.gov.cn/lz/licenseLink.do?method=licenceView&amp;entyId=20120514145658342" title="工商网监电子标识" target="_blank">\n\t\t\t\t<i></i> \n\t\t\t\t<span>工商网监电子标识</span>\n\t\t\t</a>\n\t\t\n\t\t\t<a class="hui-footer-ft-icon-5" href="http://www.cyberpolice.cn/wfjb/" title="上海网络报警平台" target="_blank">\n\t\t\t\t<i></i> \n\t\t\t\t<span>上海网络报警平台</span>\n\t\t\t</a>\n\t\t\n\t\t\t<a class="hui-footer-ft-icon-2" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=$$PSB_filing_num$$" title="沪公网安备 $$PSB_filing_num$$号" target="_blank">\n\t\t\t\t<i></i> \n\t\t\t\t<span>沪公网安备 $$PSB_filing_num$$号</span>\n\t\t\t</a>\n\t\t\n\t\t</p>\n\t</div>\n</div>\n</div>'
}, function(t, n, e) {
    e(0), e(1).init()
}]);

