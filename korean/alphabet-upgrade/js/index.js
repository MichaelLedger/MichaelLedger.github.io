'use strict';
(function($){
    $(function(){
        var page3UiFlag = 0;
        $('.wrapper').fullpage({
            slidesNavigation:false,
            css3:true,
            touchSensitivity: 20,
            loopHorizontal:false,
            controlArrows:false,
            scrollingSpeed: 300,
            afterSlideLoad:function(anchorLink, index, slideIndex, direction){
                $('.common_nav li').removeClass('active');
                $('.common_nav li').eq(slideIndex).addClass('active');
                if(slideIndex==3){
                    $('#page3_scroll').show();
                    if(page3UiFlag == 0){
                        krBase.page3Ui();
                        page3UiFlag = 1;
                    }
                }
            },
            onSlideLeave:function(anchorLink, index, slideIndex, direction){
                if(slideIndex==3){
                    $('#page3_scroll').hide();
                }
            }
        });

        var krBase = {
            resizePage:function(){
                var pageHeight = parseInt(document.documentElement.clientHeight); 
                var pageWidth = parseInt(document.documentElement.clientWidth); 
                var baseSize;

                $('.weixin_share_show').hide();
                if((pageWidth/pageHeight)>(2/3)){ 
                    baseSize = pageHeight/6; 
                    $('html').css('font-size',baseSize); 
                } 
                else{ 
                    baseSize = pageWidth/4; 
                    $('html').css('font-size',baseSize); 
                }

                $('.wrapper').show();
            },
            bottomNav:function(){
                $('.common_nav li').click(function(){
                    var navIndex = $(this).index();
                    $.fn.fullpage.moveTo(0, navIndex);
                    $('.common_nav li').removeClass('active');
                    $(this).addClass('active');
                });
            },
            shareAbout:function(){
                var wx_data = {
                    title: '韩语发音表在线版全新上线！零基础韩语入门必备！',
                    desc:  '',
                    link: 'http://channel.hujiang.com/ch_click.aspx?ch_source=df_share_weixin&page=' + encodeURIComponent('http://' + location.host + location.pathname + '?ch_source=ch_fayinbiao_wechat'),
                    imgUrl: 'https://i2.w.hjfile.cn/news/201504/2015042810270558895.jpg',
                    success: function(res) {
                        location.href = "http://st.hujiang.com/0jckorean/";
                    },
                    cancel: function(res) {
                    }
                },
                clickUrl = 'http://channel.hujiang.com/ch_click.aspx',
                channel1 = encodeURIComponent(clickUrl + '?ch_source=m_share_d_weibo&page=http://' + location.host + location.pathname + '?ch_source=ch_fayinbiao_weibo'),
                url1 = 'http://service.weibo.com/share/share.php?url=' + channel1 + '&type=icon&language=zh_cn&title=' + encodeURIComponent(wx_data.title) + '&searchPic=true&style=simple';

                var UA = window.navigator.userAgent.toLowerCase(),
                    isWeixin = UA.indexOf('micromessenger') > -1 ? true : false;

                if (isWeixin) {
                    window.wxshare.config();
                    window.wxshare.reset(wx_data);
                }

                $('.share_normal').click(function(){
                    if($(this).siblings('.share_btn').hasClass('active')){
                        // $(this).find('img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/share_normal.png').css('background', '');
                        $(this).find('img').attr('src', 'img/share_normal.png').css('background', '');
                        $(this).siblings('.share_btn').removeClass('active');
                    }
                    else{
                        // $(this).find('img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/share_active.png').css('background', '#5c2c26');
                        $(this).find('img').attr('src', 'img/share_active.png').css('background', '#5c2c26');
                        $(this).siblings('.share_btn').addClass('active');
                        if(!isWeixin){
                            $('.share_btn').css('overflow','inherit');
                            $('.share_btn.active').css('width','0.9rem');
                            $('.share_weixin').hide();
                        }
                        
                        return false;
                    }
                });
                $('.share_weixin').click(function(){
                    $('.weixin_share_show').show();
                    return false;
                });
                $('.share_weibo').click(function(){
                    window.location.href = url1;
                    return false;
                });
                $('.weixin_share_show').click(function(){
                    $(this).hide();
                });
                $('.page1,.page2,.page3').click(function(){
                    // $('.share_normal').find('img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/share_normal.png').css('background', '');
                    $('.share_normal').find('img').attr('src', 'img/share_normal.png').css('background', '');
                    $('.share_btn').removeClass('active');
                });
            },
            pageFont:function(){
                var hideGif;

                $('.page_font').click(function(){
                    var _this = $(this),
                        parentBox = $(this).parent('.page_font_box'),
                        boxFontCode = parentBox.data('font'),
                        imgHTML,
                        imgShowTime = parseInt(parentBox.data('fonttime'))*1000;

                    clearTimeout(hideGif);

                    if(parentBox.hasClass('page1_font_box')){
                        // imgHTML = '<div class="page1_font_img page_font_img"><img src="' + urlPrifix + '/m/zt/kr/zt_fayinbiao/img/gif/fu/' + boxFontCode + '.gif?v=' + Math.random() + '" /></div>';
                        imgHTML = '<div class="page1_font_img page_font_img"><img src="' + 'img/gif/fu/' + boxFontCode + '.gif?v=' + Math.random() + '" /></div>';
                    }
                    if(parentBox.hasClass('page2_font_box')){
                        // imgHTML = '<div class="page2_font_img page_font_img"><img src="' + urlPrifix + '/m/zt/kr/zt_fayinbiao/img/gif/yuan/' + boxFontCode + '.gif?v=' + Math.random() + '" /></div>';
                        imgHTML = '<div class="page2_font_img page_font_img"><img src="' + 'img/gif/yuan/' + boxFontCode + '.gif?v=' + Math.random() + '" /></div>';
                    }

                    $('.page_font_box').removeClass('active');
                    $('.page_font_box').find('.page_font_img').remove();
                    parentBox.addClass('active');
                    parentBox.append(imgHTML);
                    parentBox.find('.page_font_img').show();

                    hideGif = setTimeout(function(){
                        _this.parent('.page_font_box').removeClass('active').find('.page_font_img').remove();
                    },imgShowTime);

                    if(_this.hasClass('page1_font')){
                        return;
                    }

                    // $('#read_font').attr('src',urlPrifix + '/m/zt/kr/zt_fayinbiao/audio/'+boxFontCode+'.mp3');
                    $('#read_font').attr('src', 'audio/'+boxFontCode+'.mp3');
                    $('#read_font').get(0).play();
                });
            },
            page3Ui:function(){
                var leftScrollChoose,rightScrollChoose;

                var krRule=[
                    ['a1','a2','a3','a4','a5','a6','a7','a8','a9','a10','a11','a12','a13','a14','a15','a16','a17','a18','a19','a20','a21'],
                    ['b1','b2','b3','b4','b5','b6','b7','b8','b9','b10','b11','b12','b13','b14','b15','b16','b17','b18','b19','b20','b21'],
                    ['c1','c2','c3','c4','c5','c6','c7','c8','c9','c10','c11','c12','c13','c14','c15','c16','c17','c18','c19','c20','c21'],
                    ['d1','d2','d3','d4','d5','d6','d7','d8','d9','d10','d11','d12','d13','d14','d15','d16','d17','d18','d19','d20','d21'],
                    ['e1','e2','e3','e4','e5','e6','e7','e8','e9','e10','e11','e12','e13','e14','e15','e16','e17','e18','e19','e20','e21'],
                    ['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12','f13','f14','f15','f16','f17','f18','f19','f20','f21'],
                    ['g1','g2','g3','g4','g5','g6','g7','g8','g9','g10','g11','g12','g13','g14','g15','g16','g17','g18','g19','g20','g21'],
                    ['h1','h2','h3','h4','h5','h6','h7','h8','h9','h10','h11','h12','h13','h14','h15','h16','h17','h18','h19','h20','h21'],
                    ['i1','i2','i3','i4','i5','i6','i7','i8','i9','i10','i11','i12','i13','i14','i15','i16','i17','i18','i19','i20','i21'],
                    ['j1','j2','j3','j4','j5','j6','j7','j8','j9','j10','j11','j12','j13','j14','j15','j16','j17','j18','j19','j20','j21'],
                    ['k1','k2','k3','k4','k5','k6','k7','k8','k9','k10','k11','k12','k13','k14','k15','k16','k17','k18','k19','k20','k21'],
                    ['l1','l2','l3','l4','l5','l6','l7','l8','l9','l10','l11','l12','l13','l14','l15','l16','l17','l18','l19','l20','l21'],
                    ['m1','m2','m3','m4','m5','m6','m7','m8','m9','m10','m11','m12','m13','m14','m15','m16','m17','m18','m19','m20','m21'],
                    ['n1','n2','n3','n4','n5','n6','n7','n8','n9','n10','n11','n12','n13','n14','n15','n16','n17','n18','n19','n20','n21'],
                    ['o1','o2','o3','o4','o5','o6','o7','o8','o9','o10','o11','o12','o13','o14','o15','o16','o17','o18','o19','o20','o21'],
                    ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14','p15','p16','p17','p18','p19','p20','p21'],
                    ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16','q17','q18','q19','q20','q21'],
                    ['r1','r2','r3','r4','r5','r6','r7','r8','r9','r10','r11','r12','r13','r14','r15','r16','r17','r18','r19','r20','r21'],
                    ['s1','s2','s3','s4','s5','s6','s7','s8','s9','s10','s11','s12','s13','s14','s15','s16','s17','s18','s19','s20','s21']
                ];

                //左侧滚动
                var leftScrollInside = $('.page3 .left_scroll ul'),
                    leftScrollInsideHTML = leftScrollInside.html(),
                    leftScrollItemHeight = $('.page3 .left_scroll li').height();

                $('.left_scroll ul').append(leftScrollInsideHTML).append(leftScrollInsideHTML);

                $('.page3 .left_scroll li').height(leftScrollItemHeight);
                $('.page3 .left_scroll ul').height(leftScrollItemHeight*3*19);

                var newLeftScrollInside = leftScrollInside.height()/3,
                    newLeftScrollItemHeight = $('.page3 .left_scroll li').height();

                var leftScroll = new IScroll('.page3 .left_scroll', {
                    momentum:false, 
                    bounce:false,
                    disableMouse:true,
                    disablePointer:true,
                    startY:-(newLeftScrollInside)+2*newLeftScrollItemHeight
                });

                leftScroll.on('scrollStart',function(){
                    $('.page3_tip').addClass('hide');
                });

                leftScroll.on('scrollEnd', function () {

                    var scrollTrueItem = Math.round(Math.abs(this.y/newLeftScrollItemHeight));  //数组长度 从0开始
                    var leftChooseDom = leftScrollInside.find('li').eq(scrollTrueItem+2);  //选中dom
                    var scrollTrueItemY = -newLeftScrollItemHeight*scrollTrueItem;  //正确的y轴

                    if(Math.abs(scrollTrueItemY)>(newLeftScrollInside)&&Math.abs(scrollTrueItemY)<2*(newLeftScrollInside)){
                        scrollTrueItemY = scrollTrueItemY;
                    }else if(Math.abs(scrollTrueItemY)>=(2*(newLeftScrollInside))){
                        scrollTrueItemY = scrollTrueItemY+(newLeftScrollInside);
                    }else if(Math.abs(scrollTrueItemY)<=((newLeftScrollInside))){
                        scrollTrueItemY = scrollTrueItemY-(newLeftScrollInside);
                    }

                    leftScroll.scrollTo(0, scrollTrueItemY,0);
                    
                    leftScrollChoose = leftChooseDom.index()%19;
                    
                    if(!!rightScrollChoose){
                        // $('.result_font img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/pindu/' + krRule[leftScrollChoose][rightScrollChoose] + '.png');
                        $('.result_font img').attr('src', 'img/pindu/' + krRule[leftScrollChoose][rightScrollChoose] + '.png');
                    }else{
                        // $('.result_font img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/pindu/' + krRule[leftScrollChoose][0] + '.png');
                        $('.result_font img').attr('src', 'img/pindu/' + krRule[leftScrollChoose][0] + '.png');
                    }

                    $('.scroll_result').attr('readCodeLeft',leftChooseDom.attr('readCode'));
                    return false;
                });


                //右侧滚动
                var rightScrollInside = $('.page3 .right_scroll ul'),
                    rightScrollInsideHTML = rightScrollInside.html(),
                    rightScrollItemHeight = $('.page3 .right_scroll li').height();

                $('.right_scroll ul').append(rightScrollInsideHTML).append(rightScrollInsideHTML);

                $('.page3 .right_scroll li').height(rightScrollItemHeight);
                $('.page3 .right_scroll ul').height(rightScrollItemHeight*3*21);

                var newRightScrollInside = rightScrollInside.height()/3,
                    newRightScrollItemHeight = $('.page3 .right_scroll li').height();
                

                var rightScroll = new IScroll('.page3 .right_scroll', {
                    momentum:false, 
                    bounce:false,
                    disableMouse:true,
                    disablePointer:true,
                    checkDOMChanges:true,
                    startY:-(newRightScrollInside)+2*newRightScrollItemHeight
                });

                rightScroll.on('scrollStart',function(){
                    $('.page3_tip').addClass('hide');
                });

                rightScroll.on('scrollEnd', function () {

                    var scrollTrueItem = Math.round(Math.abs(this.y/newRightScrollItemHeight));  //数组长度 从0开始
                    var rightChooseDom = rightScrollInside.find('li').eq(scrollTrueItem+2);  //选中dom
                    var scrollTrueItemY = -newRightScrollItemHeight*scrollTrueItem;  //正确的y轴

                    if(Math.abs(scrollTrueItemY)>(newRightScrollInside)&&Math.abs(scrollTrueItemY)<2*(newRightScrollInside)){
                        scrollTrueItemY = scrollTrueItemY;
                    }else if(Math.abs(scrollTrueItemY)>=(2*(newRightScrollInside))){
                        scrollTrueItemY = scrollTrueItemY+(newRightScrollInside);
                    }else if(Math.abs(scrollTrueItemY)<=((newRightScrollInside))){
                        scrollTrueItemY = scrollTrueItemY-(newRightScrollInside);
                    }

                    rightScroll.scrollTo(0, scrollTrueItemY,0);
                    
                    rightScrollChoose = rightChooseDom.index()%21;
                    
                    if(!!leftScrollChoose){
                        // var imgSrc = urlPrifix + '/m/zt/kr/zt_fayinbiao/img/pindu/' + krRule[leftScrollChoose][rightScrollChoose] + '.png';
                        // $('.result_font img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/pindu/' + krRule[leftScrollChoose][rightScrollChoose] + '.png');
                        $('.result_font img').attr('src', 'img/pindu/' + krRule[leftScrollChoose][rightScrollChoose] + '.png');
                    }else{
                        // $('.result_font img').attr('src', urlPrifix + '/m/zt/kr/zt_fayinbiao/img/pindu/' + krRule[0][rightScrollChoose] + '.png');
                        $('.result_font img').attr('src', 'img/pindu/' + krRule[0][rightScrollChoose] + '.png');
                    }

                    $('.scroll_result').attr('readCodeRight',rightScrollChoose+1);
                    return false;
                });

                $('.scroll_result').click(function(){
                    var pinduLeft = $(this).attr('readCodeLeft');
                    var pinduRight = $(this).attr('readCodeRight');
                    // $('#read_font').attr('src',urlPrifix + '/m/zt/kr/zt_fayinbiao/audio/'+pinduLeft+pinduRight+'.mp3');
                    $('#read_font').attr('src', 'audio/'+pinduLeft+pinduRight+'.mp3');
                    $('#read_font').get(0).play();
                })
            },
            faseClick:function(){
                Origami.fastclick($('.common_nav').get(0));
                // Origami.fastclick($('.page1_content').get(0));
                // Origami.fastclick($('.page2_content').get(0));
                Origami.fastclick($('.result_font').get(0));
                // Origami.fastclick($('.page1 .share_normal').get(0));
                // Origami.fastclick($('.page2 .share_normal').get(0));
                // Origami.fastclick($('.page3 .share_normal').get(0));
                // Origami.fastclick($('.page1 .share_weibo').get(0));
                // Origami.fastclick($('.page2 .share_weibo').get(0));
                // Origami.fastclick($('.page3 .share_weibo').get(0));
            },
            init:function(){
                krBase.resizePage();
                krBase.bottomNav();
                krBase.shareAbout();
                krBase.pageFont();
                krBase.faseClick();
            }
        };
        krBase.init();

        $(window).resize(function(){
            location.reload();
        });

        window.krBase =krBase;
    });
})(window.$);