!function(n) {
    function t(a) {
        if (s[a])
            return s[a].exports;
        var i = s[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return n[a].call(i.exports, i, i.exports, t), i.l = !0, i.exports
    }
    var s = {};
    t.m = n, t.c = s, t.i = function(n) {
        return n
    }, t.d = function(n, s, a) {
        t.o(n, s) || Object.defineProperty(n, s, {
            configurable: !1,
            enumerable: !0,
            get: a
        })
    }, t.n = function(n) {
        var s = n && n.__esModule ? function() {
            return n.default
        } : function() {
            return n
        };
        return t.d(s, "a", s), s
    }, t.o = function(n, t) {
        return Object.prototype.hasOwnProperty.call(n, t)
    }, t.p = "", t(t.s = 24)
}([, , function(n, t, s) {
    "use strict";
    function a(n) {
        return n && n.__esModule ? n : {
            default: n
        }
    }
    s(19), s(11), s(20);
    var i = s(9),
        e = a(i),
        o = s(10),
        r = a(o);
    window.transceiver = r.default, r.default.events = {
        USER_TRIGGER: "triggerUserGet",
        USERINFO_GET: "getUserInfo"
    };
    var c = r.default.events,
        l = c.USER_TRIGGER,
        u = c.USERINFO_GET;
    ({
        init: function() {
            this.initPassport()
        },
        initPassport: function() {
            var n = this;
            r.default.on(l, function() {
                n.getUserinfo()
            }), r.default.on(u, function(n) {})
        },
        getUserinfo: function() {
            $.ajax({
                url: "/api/userinfo",
                success: function(n) {
                    n && 0 === n.status ? r.default.emit(u, n.data) : r.default.emit(u, null), e.default.init({
                        user: n.data,
                        lang: "jp"
                    })
                },
                error: function(n) {
                    r.default.emit(u, null)
                }
            })
        }
    }).init(), $(function() {
        r.default.emit(l)
    })
}, , , , , , function(n, t, s) {
    !function(t, s) {
        n.exports = s()
    }(0, function() {
        return function(n) {
            function t(a) {
                if (s[a])
                    return s[a].exports;
                var i = s[a] = {
                    i: a,
                    l: !1,
                    exports: {}
                };
                return n[a].call(i.exports, i, i.exports, t), i.l = !0, i.exports
            }
            var s = {};
            return t.m = n, t.c = s, t.i = function(n) {
                return n
            }, t.d = function(n, s, a) {
                t.o(n, s) || Object.defineProperty(n, s, {
                    configurable: !1,
                    enumerable: !0,
                    get: a
                })
            }, t.n = function(n) {
                var s = n && n.__esModule ? function() {
                    return n.default
                } : function() {
                    return n
                };
                return t.d(s, "a", s), s
            }, t.o = function(n, t) {
                return Object.prototype.hasOwnProperty.call(n, t)
            }, t.p = "", t(t.s = 2)
        }([function(n, t, s) {
            "use strict";
            s(1);
            var a = {
                    apisite: "https://api-site.hujiang.com",
                    hjclass: "//class.hujiang.com",
                    cctalk: "//www.cctalk.com",
                    ting: "//t.hujiang.com",
                    app: "//app.hujiang.com",
                    pass: "//pass.hujiang.com",
                    account: "//my.hujiang.com",
                    pay: "//pay.hujiang.com"
                },
                i = function(n) {
                    return '<li class="top-li">\n      <div class="top-a">\n          <a href="javascript:;">\n              我的订单\n              <span class="triangle"></span>\n              <span class="tuan-quantity"></span>\n          </a>\n      </div>\n      <div class="pass-sub pass-sub-cart">\n          <div class="sub-cart-list" id="cartList">\n              <p class="sub-cart-links cf">\n                  <a href="' + a.hjclass + '/course?cate=11132&source=804" rel="nofollow">\n                      <b class="cart-icon-schedule"></b>\n                      <span>选课</span>\n                  </a>\n                  <a href="' + a.hjclass + '/app/question/" rel="nofollow">\n                      <b class="cart-icon-help"></b>\n                      <span>答疑</span>\n                  </a>\n                  <a href="' + a.cctalk + '" rel="nofollow">\n                      <b class="cart-icon-course"></b>\n                      <span>公开课</span>\n                  </a>\n              </p>\n          </div>\n      </div>\n  </li>\n  <li class="top-li">\n      <div class="top-a">\n          <a target="_blank" href="' + a.account + "/pc/" + n.id + '/" class="top-user" rel="nofollow">\n              <img src="' + n.avatar + '" alt="' + n.name + '" /> <span class="triangle"></span>\n          </a>\n      </div>\n      <div class="pass-sub pass-sub-user">\n          <ul>\n              <li>\n                  <a target="_blank" href="' + a.account + "/pc/" + n.id + '/" rel="nofollow">\n                      <span>个人中心</span>\n                  </a>\n              </li>\n              <li>\n                  <a target="_blank" href="' + a.pay + '/order/web/init" rel="nofollow">\n                      <span>我的账户</span>\n                  </a>\n              </li>\n              <li>\n                  <a target="_blank" href="' + a.account + '/account/" rel="nofollow">\n                      <span>帐号设置</span>\n                  </a>\n              </li>\n              <li>\n                  <a href="javascript:;" rel="nofollow" class="btn-pass-logout">\n                      <span>退出登录</span>\n                  </a>\n              </li>\n          </ul>\n      </div>\n  </li>'
                },
                e = {
                    lang: "",
                    user: {
                        id: 0,
                        name: "",
                        avatar: ""
                    },
                    passSource: "portal"
                },
                o = function() {
                    var n = "pass",
                        t = window.location.hostname;
                    return /^(local|beta|dev|qa|(\w+)2)/.test(t) && (n = "qapass"), /^yz/.test(t) && (n = "yzpass"), n
                }(),
                r = {
                    init: function(n) {
                        $.extend(e, n), this.$el = $(".hj-passport"), this.isLogin = e.user.id && 0 !== e.user.id, this.initStatusDom(), this.bindEvent(), $(function() {
                            r.initHJPass()
                        })
                    },
                    bindEvent: function() {
                        $(document).on("click", ".btn-pass-logout", r.logout)
                    },
                    initHJPass: function() {
                        window.HJPassport && (window.HJPassport.init({
                            API_SLD: "https://" + o,
                            source: e.passSource,
                            businessDomain: e.businessDomain || "yyy_menhu"
                        }), $(document).on("click", ".fastLogin", function() {
                            window.HJPassport.show("login")
                        }).on("click", ".fastRegister", function() {
                            window.HJPassport.show("register")
                        }))
                    },
                    initStatusDom: function() {
                        if (this.isLogin) {
                            var n = i(e.user);
                            this.$el.find(".user-right").append(n).find(".top-user img").attr({
                                src: e.user.avatar,
                                title: e.user.name
                            }), this.asyncCourseDom()
                        } else
                            this.$el.find(".user-right").append('<li class="top-li">\n    <div class="top-a-single">\n        <a href="javascript:;" class="fastLogin">\n            <span>登录</span>\n        </a>\n    </div>\n</li>\n<li class="top-li">\n    <div class="top-a-single">\n        <a href="javascript:;" class="fastRegister">\n            <span>免费注册</span>\n        </a>\n    </div>\n</li>')
                    },
                    logout: function() {
                        var n = /hjenglish/.test(window.location.hostname) ? "hjenglish" : "hujiang";
                        window.location.href = "https://" + o + "." + n + ".com/uc/handler/logout.ashx?returnurl=" + window.location.href
                    },
                    asyncCourseDom: function() {
                        var n = this;
                        $.ajax({
                            type: "GET",
                            url: a.apisite + "/art/v1/user_classes",
                            data: {
                                pageIndex: 1,
                                pageSize: 8,
                                version: Math.random()
                            },
                            xhrFields: {
                                withCredentials: !0
                            },
                            dataType: "json",
                            contentType: "application/json",
                            success: function(t) {
                                var s = "";
                                if (n.isLogin) {
                                    if (s += "<ul>", 0 === t.status && t.data && t.data.items)
                                        for (var i = t.data.items, e = 0; e < i.length; e++) {
                                            var o = i[e];
                                            o.shortName && (s += '<li class="courseli"><a target="_blank" href="' + a.hjclass + "/" + o.classId + '/">' + o.shortName + "</a></li>")
                                        }
                                    s += "</ul>"
                                } else
                                    s += "您还没有报班或登录！马上报班";
                                $("#cartList").prepend(s)
                            }
                        })
                    }
                };
            n.exports = r
        }, function(n, t) {}, function(n, t, s) {
            n.exports = s(0)
        }])
    })
}, function(n, t, s) {
    s(12), n.exports = s(8)
}, function(n, t) {
    var s = {
        events: {},
        on: function(n, t) {
            return (this.events[n] || (this.events[n] = [])).push(t), this
        },
        off: function(n, t) {
            var s = this.events[n],
                a = s.indexOf(t);
            a > -1 || s.splice(a, 1)
        },
        emit: function(n) {
            var t = this.events[n] || [],
                s = Array.prototype.slice.call(arguments, 1);
            return t.forEach(function(n) {
                n.apply(this, s)
            }), this
        }
    };
    n.exports = s
}, function(n, t) {}, function(n, t) {}, , , , , , , function(n, t) {}, function(n, t) {}, , , , function(n, t, s) {
    n.exports = s(2)
}]);

