(function(c) {
    function g(b) {
        var a = document.createElement("script");
        a.type = "text/javascript";
        a.src = b;
        document.getElementsByTagName("head")[0].appendChild(a)
    }
    function h(a, b) {
        var c = a.match(RegExp("[?&]" + b + "=(\\w+)"));
        return null != c ? c[1] : null
    }
    var e = {
            "hujiang.com": "",
            "www.hujiang.com": "aa6b628920225aa8723fe04b02129f18",
            "m.hujiang.com": "1fd6cac9b502ffd7525883ee0e87efb8",
            "m.yeshj.com": "0f7c67882ee6c24ff968ec6bb86b5eb4",
            "www.hjenglish.com": "d4f3d19993ee3fa579a64f42d860c2a7",
            "jp.hjenglish.com": "5194224aff58974c375757a880c82ff1",
            "fr.hujiang.com": "6483812c1e07996108dff4b32aa51e1d",
            "kr.hujiang.com": "696cf3d1d09511155d43ce1d79f62985",
            "es.hujiang.com": "5024f0b6df9615d67d589d394b1ed675",
            "de.hujiang.com": "355613ff7ead985fcd43eaa0f7d4d196",
            "th.hujiang.com": "829f44c25307a02a66810af815ba5e36",
            "ru.hujiang.com": "d5dfdca68f3d47dd6948df8170897323",
            "xyz.hujiang.com": "252ae26d4cfcc06190b33d9f5eb2184a",
            "cn.hujiang.com": "0ac1b92dcb27c20aa06067d17107142c",
            "cet.hjenglish.com": "d30c549bb4bc28967a964d861a248c48",
            "kaoyan.hjenglish.com": "da28fcf9183bfe5650bc54bbc90ef353",
            "tr.hjenglish.com": "ff176b298329cc8933bb8510457b3b9a",
            "ts.hjenglish.com": "bf83a52891f07e7cfaf1f58d722519bc",
            "ielts.hjenglish.com": "90d689c26b26d5033a52f66b6df92424",
            "music.hujiang.com": "866b5fa88e92f7cc40c18b29773600b5",
            "xiaoxue.hujiang.com": "92cbe08f811634e98138fae43614f17d",
            "zhongxue.hujiang.com": "dc72609901405b9beddf220a1fb260cf",
            "gaokao.hujiang.com": "fbba292394853b1a8aee07c7359808a2",
            "yuer.hujiang.com": "c13ad09abbf7256b8eb5d910e9f203ef",
            "liuxue.hujiang.com": "2148a25796cf164ccac20ea1f2529cb7",
            "bb.hujiang.com": "0d0efd951e5496319e840bc772af1a5b",
            "bulo.hujiang.com": "1c830ee111c1ea651b782ca14aec4ac3",
            "t.hujiang.com": "3a47e0a1c227a0294946cd9407d73bb8",
            "s.hujiang.com": "bbee18574dac1bd97af4cb972a2587e9",
            "app.hujiang.com": "53ce91887ab98ecaa2c397d1515896dd",
            "dict.hjenglish.com": "7ac87158ce7cd3c36bdfadb76b939020",
            "buy.hujiang.com": "9b26c79c38717489d3f3e554f4ee41c6",
            "tuan.hujiang.com": "9eae9d1d7b14bc7af83298dee3a69aeb",
            "cichang.hujiang.com": "285ce959fb996537013a51fe9112f592",
            "ting.hujiang.com": "0c1ba97b045b31515956d4c6d54e4291",
            "mc.hujiang.com": "3082cf319ae86926b5e1b5635d6726a5",
            "class.hujiang.com": "4084f6bcf1e86c618bddd27269a89108",
            "www.hjclass.com": "4084f6bcf1e86c618bddd27269a89108",
            "m.hjclass.com": "3082cf319ae86926b5e1b5635d6726a5"
        },
        b;
    a:
    {
        var a = /\/baidu_tongji.(\w+.)?js/;
        b = document.getElementsByTagName("script");
        for (var f = 0; f < b.length; f++) {
            var d = b[f];
            if (d.src && "true" != d.getAttribute("data-excuted") && a.test(d.src)) {
                d.setAttribute("data-excuted", "true");
                b = d;
                break a
            }
        }
        b = void 0
    }a = b.src;
    null != b.attributes["data-args"] && (a = b.attributes["data-args"].value);
    b = h(a, "id");
    a = h(a, "type");
    if (null == b || "add" == a) {
        a = location.hostname;
        if (0 == a.indexOf("dev.") || 0 == a.indexOf("yz.") || 0 == a.indexOf("local."))
            a = a.substring(a.indexOf(".") + 1);
        b = e[a]
    }
    if (null != b && b)
        if (e = "string" == typeof b ? b : b.id || "", /(www|jp)\.hjenglish\.com|(jp|kr|fr|www)\.hujiang\.com$/i.test(location.hostname))
            g("//hm.baidu.com/h.js?" +
            e);
        else {
            var j = "//hm.baidu.com/hm.js?" + e;
            c._hmt = c._hmt || [];
            c = function() {
                g(j)
            };
            "complete" == document.readyState ? window.setTimeout(c, 30) : window.addEventListener ? window.addEventListener("load", c, !1) : window.attachEvent("onload", c)
        }
})(this);