$(function () {
    "use strict";

    $(".carListWrap .tabArea .tab > .tabBtn").on("click", function (f) {
        if (!$(this).parent().hasClass("all")) {
            f.preventDefault();
            var d = $(this).attr("data-item");
            if ($("body").hasClass("pc")) {
                $(this).children(".carList").show();
                /*
                if (d) {
                    var c = Header.vehicleList.getProductList(d);
                    $(this).next(".carList").html(c);
                }
                */

                $(".gnbWrapFull").css({
                    overflow: "hidden"
                });
                $(".carListWrap .tabArea .tab").removeClass("on");
            }
            if (!$("body").hasClass("mobile")) {
                $(".carListWrap .tabArea .tab").removeClass("on");
                $(this).parent().addClass("on");
                var b = $(".carListWrap .on .carList").height() + 180;
                $(".gnbWrapFull").addClass("findCar").css("min-height", b);
                setTimeout(function () {
                    $(".gnbWrapFull").css({
                        overflow: "visible"
                    });
                }, 500);
            }

            if ($("body").hasClass("mobile")) {
                if (!$(this).parent().hasClass("on")) {
                    /*
                    if (d) {
                        var c = Header.vehicleList.getProductList(d);
                        $(this).next(".carList").html(c);
                    }

                    2018.04.16 dropdown animation fix
                    */
                    var g = $(this).parent();
                    g.find("> .carList").stop().slideDown(300); /* 2018.04.16 dropdown animation fix */
                    g.addClass("on"); /* 2018.04.16 dropdown animation fix */
                } else {
                    var g = $(this).parent();
                    g.find("> .carList").stop().slideUp(300, function () {
                        g.removeClass("on");
                    });
                }
            }
        }
    });
});
var Header = {};

//[2019.04.04:배장환] GT : Start - jeddah 요청사항으로 sourcee, pagesub 데이터 추가를 위한 parameter 변환
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
//[2019.04.04:배장환] GT : End - jeddah 요청사항으로 sourcee, pagesub 데이터 추가를 위한 parameter 변환
// Publish
function GnbResponsiveImages() {
    "use strict";
    var a = window.innerWidth;

    var gnbScrollBox = $(".gnbWrap .scrollBox");
    if (a > 1120) {
        //pc
        $("body").removeClass("mobile");
        $("body").removeClass("tablet");
        $("body").addClass("pc");
        $("meta[name='viewport']").remove();
        //galaxy tab issue
        //$("head").append('<meta name="viewport" content="width=1240, user-scalable=yes">');
        gnbScrollBox.show();
        gnbScrollBox.css("height", "auto");
        if ($(".gnbArea .dep1Wrap .dep1_a.on").length > 0) {
            $(".gnbGap").show();
            gnbGapAnimator();
        }
        $(".btnContentTop").show();

        // HMC_DATA_DEVICE = 'PC';
        // dataLayer.push({
        //     'HMC_DATA_DEVICE': HMC_DATA_DEVICE,
        // });
    } else if (a > 767) {
        // tablet
        $("body").removeClass("mobile");
        $("body").addClass("tablet");
        $("body").removeClass("pc");
        $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');
        gnbScrollBox.show();
        gnbScrollBox.css("height", "auto");
        if ($(".gnbArea .dep1Wrap .dep1_a.on").length > 0) {
            $(".gnbGap").show();
            gnbGapAnimator();
        }
        $(".btnContentTop").show();

        HMC_DATA_DEVICE = 'MOBILE';
        dataLayer.push({
            'HMC_DATA_DEVICE': HMC_DATA_DEVICE,
        });
    } else {
        // mobile
        $("body").addClass("mobile");
        $("body").removeClass("tablet");
        $("body").removeClass("pc");
        $("head").append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">');
        gnbScrollBox.css("height", $(window).height() - 55);
        $(".gnbGap").hide();
        $(".btnContentTop").show();//200618 modify

        HMC_DATA_DEVICE = 'MOBILE';
        dataLayer.push({
            'HMC_DATA_DEVICE': HMC_DATA_DEVICE,
        });
    }

    $("div, p, img, span").each(function () {
        if ($(this).is("[data-bgColor]")) {
            $(this).css("background-color", $(this).attr("data-bgColor"));
        }
        if ($(this).is("[data-color]")) {
            $(this).css("color", $(this).attr("data-color"));
        }
        if ($(this).is("[data-text-align]")) {
            $(this).css("text-align", $(this).attr("data-text-align"));
        }

        if ($(this).is("[data-bg]") && a > 767) {
            $(this).css({
                "background-image": "url('" + $(this).attr("data-bg") + "')"
            });
        } else {
            if ($(this).is("[data-mobile-bg]") && a < 767) {
                $(this).css({
                    "background-image": "url('" + $(this).attr("data-mobile-bg") + "')"
                });
            }
        }
    });

    $("img").each(function () {
        if (a > 767 && $(this).attr("data-media-pc") !== $(this).attr("src")) {
            $(this).attr("src", $(this).attr("data-media-pc"));
        }
        if (a <= 767 && $(this).attr("data-media-mobile") !== $(this).attr("src")) {
            $(this).attr("src", $(this).attr("data-media-mobile"));
        }
    });

    $(".gnbWrap .subMenu").css("max-height", $(window).height() - 55);

    if ($("body").hasClass("topBanner")) {
        if (a > 767) {
            $("body.topBanner .gnbWrapFull").css("top", $(".mainTopBanner").height());
        } else {
            $("body.topBanner .gnbWrapFull").css("top", "0");
        }
    } else {
        $(".gnbWrapFull").css("top", "0");
    }
}

function _isMobile() {
    "use strict";
    var a = (/iphone|ipod|android|blackberry|fennec/).test(navigator.userAgent.toLowerCase());
    return a;
}

var gnbTime;
var oldTop;

// gnb Gap animator
function gnbGapAnimator() {
    var to = $(".gnbArea .dep1Wrap .dep1_a.on");
    var n = to.position().left - 10;
    var m = to.width() + 20;
    $(".gnbGap").stop().fadeIn().css({
        left: n,
        width: m
    });
    // height

    //        var q = $(".carListWrap .on .carList").height() + 180;
    //      $(".gnbWrapFull").css("min-height", q);
}

function gnb(j, i, h, g, f) {
    "use strict";
    var a = $(".gnbDim");
    var d = $(".gnbWrap .scrollBox");
    var c = 0;

    $(".gnbArea .depSub_a").each(function () {
        if ($(this).closest(".depSub").find(".depSubWrap").length > 0 && $(this).next().find('li > a').length) {
            $(this).attr("href", "");
            $(this).addClass("arr");
        }
    });
    var b = null;

    function e() {
        if (j !== null) {
            $(".gnbArea .dep1Wrap .dep1_a").removeClass("on");

            $(".gnbArea .dep1Wrap .dep1_a").eq(j).addClass("on");
            $(".gnbArea .dep1Wrap .dep1_a").eq(j).addClass("first");
            $(".gnbArea .depSubWrap").hide();
            $(".gnbArea .depSubWrap .depSub_a").removeClass("on");

            setTimeout(function () {
                var l = $(".gnbArea .dep1Wrap .dep1_a").eq(j).position().left - 10;
                var k = $(".gnbArea .dep1Wrap .dep1_a").eq(j).width() + 20;
                $(".gnbGap").stop().show().css({
                    left: l,
                    width: k
                });
            }, 300);
        } else {
            $(".gnbGap").hide();
            $(".gnbArea .dep1Wrap .dep1_a").removeClass("on");
        }
        if (i !== null) {
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .depSub_a").addClass("on");
            $(".gnbArea .dep1Wrap .dep1").eq(j).find("> .dep2Wrap").show();
        }
        if (h !== null) {
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap").show();
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .depSub_a").addClass("on");
        }
        if (g !== null) {
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap").show();
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap > .depSub").eq(g).find(" > .depSub_a").addClass("on");
            b = $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap").clone();
        }
        if (f !== null) {
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap > .depSub").eq(g).find(" > .dep5Wrap").show();
            $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap > .depSub").eq(g).find(" > .dep5Wrap > .depSub").eq(f).find(" > .depSub_a").addClass("on");
            b = $(".gnbArea .dep1Wrap .dep1").eq(j).find(".dep2Wrap > .depSub").eq(i).find(" > .dep3Wrap > .depSub").eq(h).find(" > .dep4Wrap > .depSub").eq(g).find(" > .dep5Wrap").clone();
        }
    }

    setTimeout(function () {
        e();
        if (b) {
            $(".gnbWrap .pageTitle .tit").addClass("arr");
            $(".gnbWrap .pageTitle .subMenu").append(b);
            $(".gnbWrap .pageTitle .subMenu .depSub_a").on("click", function (m) {
                var l = $(this).closest(".depSub");
                if ($(this).hasClass("arr")) {
                    m.preventDefault();
                    if (!$(this).hasClass("on")) {
                        var k = $(this).parent().parent().find("> .depSub");
                        k.find("> .depSub_a").removeClass("on");
                        k.find(".depSubWrap").stop().slideUp(300);
                        $(this).addClass("on");
                        l.find("> .depSubWrap").stop().slideDown(300);
                    } else {
                        $(this).parent().find(".depSub_a").removeClass("on");
                        $(this).parent().find(".depSubWrap").stop().slideUp(300);
                    }
                }
            });
            $(".gnbWrap .pageTitle .tit").on("click", function () {
                $(".btnMobileMenu.on").click();
                $(".gnbSearchMobile.on .btnGnbSearch").click();
                if (!$(this).hasClass("on")) {
                    $(this).addClass("on");
                    $(".gnbWrap .pageTitle").find("> .subMenu").stop().slideDown(300);
                    a.stop().fadeIn(300);
                } else {
                    $(this).removeClass("on");
                    $(".gnbWrap .pageTitle").find("> .subMenu").stop().slideUp(300);
                    a.stop().fadeOut(300);
                }
            });
        }
    }, 500);

    $(".gnbSearchMobile").append($(".gnbSearchBtn").html());
    $(".gnbArea .dep1Wrap .dep1_a").on("click", function (o) {
        o.preventDefault();
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            var k = $(".gnbSubArea");
            var l = $(this).closest(".dep1");
            $(".gnbSearchBtn, .gnbSnsShareBtn").removeClass("on");
            $(".gnbSearchArea, .snsSlayer").hide();
            $(".gnbUtilWrap").attr("class", "gnbUtilWrap");
            if (!$(this).hasClass("on") || $(this).hasClass("first")) {
                $(".gnbWrapFull").css({
                    overflow: "hidden"
                });
                $(".dep1_a").removeClass("on");
                $(this).removeClass("first");
                $(this).addClass("on");

                gnbGapAnimator(this);

                k.hide();
                l.find(".gnbSubArea").show();
                clearTimeout(gnbTime);
                $(".gnbWrapFull").addClass("openSub");
                var q = 0;
                if ($(this).hasClass("findCar")) {
                    q = $(".carListWrap .on .carList").height() + 180;
                    $(".gnbWrapFull").addClass("findCar").css("min-height", q);
                } else {
                    //$(this).closest(".dep1").find(".depSubWrap, .dep2Wrap").each(function() {
                    $(this).closest(".dep1").find(".depSubWrap[style*='block'], .dep2Wrap").each(function () {
                        if (q < $(this).height() + 127) {
                            q = $(this).height() + 127;
                        }
                    });
                    $(".gnbWrapFull").removeClass("findCar").css("min-height", q);
                }
                gnbTime = setTimeout(function () {
                    $(".gnbWrapFull").css({
                        overflow: "visible"
                    });
                }, 500);
            } else {
                clearTimeout(gnbTime);
                $(this).removeClass("on");
                l.find(".gnbSubArea").hide();
                $(".gnbWrapFull").attr("class", "gnbWrapFull");
                $(".gnbWrapFull").removeAttr("style");
                GnbResponsiveImages();
                $(this).blur();
                e();
            }
        }
        if ($("body").hasClass("mobile")) {
            var p = $(this);
            if (!$(this).hasClass("on")) {
                var r = $(".gnbSubArea");
                r.stop().slideUp(300, function () {
                    $(".dep1_a").removeClass("on");
                });
                $(this).next().stop().slideDown(300, function () {
                    p.addClass("on");
                });
                $(".gnbWrapFull").addClass("openSub");
                if ($(this).hasClass("findCar")) {
                    $(".gnbWrapFull").addClass("findCar");
                } else {
                    $(".gnbWrapFull").removeClass("findCar");
                }
            } else {
                $(this).next().stop().slideUp(300, function () {
                    p.removeClass("on");
                });
                $(".gnbWrapFull").attr("class", "gnbWrapFull");
                $(".gnbWrapFull").removeAttr("style");
            }
        }
    });

    $(".gnbArea .depSub .depSub_a").on("click", function (m) {
        var l = $(this).closest(".depSub");
        var k;
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            if ($(this).hasClass("arr")) {
                m.preventDefault();
                if (!$(this).hasClass("on")) {
                    k = $(this).parent().parent().find("> .depSub");
                    k.find("> .depSub_a").removeClass("on");
                    $(this).addClass("on");
                    k.find("> .depSubWrap").hide();
                    l.find("> .depSubWrap").show();
                    l.find("> .depSubWrap .depSub_a").removeClass("on");
                    l.find("> .depSubWrap .depSubWrap").hide();
                } else {
                    $(this).parent().find(".depSub_a").removeClass("on");
                    $(this).parent().find(".depSubWrap").hide();
                    $(this).blur();
                }
                var n = 0;
                //$(this).closest(".dep1").find(".depSubWrap, .dep2Wrap").each(function() {
                $(this).closest(".dep1").find(".depSubWrap[style*='block'], .dep2Wrap").each(function () {
                    if (n < $(this).height() + 127) {
                        n = $(this).height() + 127;
                    }
                });
                $(".gnbWrapFull").css("min-height", n);
            }
        }

        if ($("body").hasClass("mobile") && !$(this).hasClass("dep3_a")) {
            if ($(this).hasClass("arr")) {
                m.preventDefault();
                if (!$(this).hasClass("on")) {
                    k = $(this).parent().parent().find("> .depSub");
                    k.find("> .depSub_a").removeClass("on");
                    k.find(".depSubWrap").stop().slideUp(300);
                    $(this).addClass("on");
                    l.find("> .depSubWrap").stop().slideDown(300);
                } else {
                    $(this).parent().find(".depSub_a").removeClass("on");
                    $(this).parent().find(".depSubWrap").stop().slideUp(300);
                }
            }
        }
    });

    $(".gnbSnsShareBtn a[href='#']").on("click", function (k) {
        k.preventDefault();
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) { /* 2018.04.16 top button position fix */
            $(".dep1_a").removeClass("on");
            e();
            $(".gnbArea").find(".depSub_a").removeClass("on");
            $(".gnbSubArea").hide();
            $(".gnbWrapFull").attr("class", "gnbWrapFull").removeAttr("style");

            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                setTimeout(function () {
                    $(".gnbRight .snsSlayer").show();
                }, 150);
                $('.gnbLanguageBtn').removeClass('on'); // 180806 add
            } else {
                $(this).removeClass("on");
                $(".gnbRight .snsSlayer").hide();
            }
        }
        if ($("body").hasClass("mobile")) {
            $(".gnbGap").hide();
            $(".gnbWrapFull").attr("class", "gnbWrapFull").removeAttr("style");

            $(".btnMobileMenu.on").click();
            $(".gnbWrap .pageTitle .tit.on").click();
            if (!$(this).parent().hasClass("on")) {
                $(".btnMobileMenu.on").click();
                a.stop().fadeIn(300);
                $(this).parent().addClass("on");
            } else {
                a.stop().fadeOut(300);
                $(this).parent().removeClass("on");
            }
        }
        GnbResponsiveImages();
    });

    // Start : 180625 add
    $('.gnbLanguageBtn > a').click(function (e) {
        e.preventDefault();
        var this_ = $(this).parent(),
            lBtn = $(this_).find('.languageLayer ul');
        if ($('.gnbSnsShareBtn a').hasClass('on')) {
            $(".gnbSnsShareBtn a[href='#']").removeClass('on');
            $('.snsSlayer').hide();
        }
        if ($(this_).hasClass('on')) {
            $(this_).removeClass('on');
        } else {
            $(this_).addClass('on');
        }
        lBtn.find('li').click(function (e) {
            e.preventDefault();
            $(this).addClass('on').siblings().removeClass('on');
        });
    });

    var langBtn = $('.langList li').find('a');
    langBtn.click(function (e) {
        e.preventDefault();
        $(this).addClass('active').siblings().removeClass('active');
        if ($(this).hasClass('active')) {
            if ($(this).parent().hasClass('on')) {
                $(this).parent().removeClass('on');
                $('.active').siblings().stop().slideUp(300);
            } else {
                $(this).parent().addClass('on');
                $(langBtn).stop().slideDown(300).css('display', 'block');
            }
        }
    });
    // End : 180625 add

    $(".gnbWrapFull .btnGnbClose").on("click", function (k) {
        k.preventDefault();
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            $(".gnbSubArea").hide();
            e();
            $(".gnbWrapFull").attr("class", "gnbWrapFull").removeAttr("style");

            $(".gnbLanguageBtn").removeClass("on");
            $(".gnbSearchBtn").removeClass("on");
            $(".gnbSearchArea, .gnbLanguageArea").hide();
            $(".gnbUtilWrap").attr("class", "gnbUtilWrap");
        }
        GnbResponsiveImages();
    });

    $(".btnMobileMenu").on("click", function (l) {
        l.preventDefault();
        var k = 0;
        $(".gnbSearchMobile.on .btnGnbSearch").click();
        $(".gnbWrap .pageTitle .tit.on").click();
        a.stop().fadeOut(300);
        if (!$(this).hasClass("on")) {
            $(this).addClass("on");
            d.show();
            setTimeout(function () {
                d.css("right", 0);
            }, 10);
            a.stop().fadeIn(300);
            if ($(".dep1_a.on").length > 0) {
                k = $(".dep1_a.on").position().top + d.scrollTop();
                d.scrollTop(k);
            }
        } else {
            $(this).removeClass("on");
            d.css("right", "-100%");
            setTimeout(function () {
                d.hide();
            }, 300);
            a.stop().fadeOut(300);
        }
    });

    //S : 200618 modify - top버튼 수정
    (function () {

        // s: 200326 modify
        if ($(".btn-webChat").length > 0) {
            $("body").addClass("livechat");
        }
        // e: 200326 modify
        //$("body").addClass("mynaghi");//mynaghi, jo, kw

        $(".quickMenuWrap").insertBefore(".btnContentTop");
        !$(".quickMenuWrap").length && $("body").append("<div class='quickMenuWrap' >");

        var isLiveChat = $("body").hasClass("livechat");
        var quickMenuBottomVal;
        var btnContentTopHeight;
        var quickNbtncontentHeightVal = $(".quickMenuWrap:visible").height() + $(".btnContentTop:visible").height() + ($(".btnContentTop:visible").height() && 10);

        /*
        // livechat-mynaghi call
        isLiveChat && $("body").hasClass("mynaghi") && (function() {
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5b911381f31d0f771d8480bf/1cq15h7j9';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
        })();
        // livechat-jo call
        isLiveChat && $("body").hasClass("jo") && (function() {
            window.__lc = window.__lc || {};
            window.__lc.license = 10237182;
            (function() {
                var lc = document.createElement('script'); lc.type = 'text/javascript'; lc.async = true;
                lc.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'cdn.livechatinc.com/tracking.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(lc, s);
            })();
        })();
        // livechat-kw call
        isLiveChat && $("body").hasClass("kw") && (function() {
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/5b911381f31d0f771d8480bf/1cq15h7j9';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
            })();
        })();
        */

        $(window).unbind("scroll.quickmenu").bind("scroll.quickmenu", function (event) {
            event.namespace && (quickMenuBottomVal = parseInt($(".quickMenuWrap").css("bottom")));
            event.namespace && isLiveChat && (btnContentTopHeight = quickMenuBottomVal - 70);

            var k = $(window).scrollTop();

            //
            if (!$(".quickArea").hasClass("popup")) {
                if (k > oldTop) {
                    $(".quickArea").removeClass("open");
                }
                if (k < oldTop || k > $(document).height() - $(window).height() - 55) {
                    $(".quickArea").addClass("open");
                }
            }
            oldTop = k;
            //
            var isFootOn = (k > $(document).height() - $(window).height() - $(".footerWrap").outerHeight() + (isLiveChat ? btnContentTopHeight : 0)) ? true : false;
            var isTopOn;

            if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
                if (isFootOn) { // 2018.04.16 top button position fix
                    $(".btnContentTop").addClass("ab").css("top", $(document).height() - $(".footerWrap").outerHeight() - 60);
                    $(".quickMenuWrap").css({ "top": ($(document).height() - $(".footerWrap").outerHeight() - quickNbtncontentHeightVal), "bottom": "auto" }).addClass("ab");
                } else {
                    isTopOn = ($(window).scrollTop() == 0) ? true : false;
                    if (isTopOn === true) {
                        $(".btnContentTop").removeClass("ab").css({ "top": "auto", "bottom": btnContentTopHeight });
                        $(".quickMenuWrap").removeClass("ab").css({ "top": "auto", "bottom": (isLiveChat ? btnContentTopHeight : 0) });
                    } else {
                        $(".btnContentTop").removeClass("ab").show().css({ "top": "auto", "bottom": (isLiveChat ? btnContentTopHeight : 0) });
                        $(".quickMenuWrap").removeClass("ab").css({ "top": "auto", "bottom": quickMenuBottomVal });
                    }
                }
            } else {
                //$(".btnContentTop").hide();
                /* if (isFootOn) {
                    $(".quickMenuWrap").addClass("ab").css({"top": ($(document).height() - $(".footerWrap").outerHeight() - quickNbtncontentHeightVal),"bottom":"auto"});
                } else {
                    $(".quickMenuWrap").removeClass("ab").css({"top":"auto","bottom":(isLiveChat ? btnContentTopHeight : 0)});
                } */
            }

            if (k == 0) {
                $(".btnContentTop").hide();
            } else {
                $(".btnContentTop").show();
            }
        });
    })()
    setTimeout(function () { $(window).trigger("scroll.quickmenu"); }, 1000);
    //E : 200618 modify - top버튼 수정

    /*
    $(window).scroll(function() {
        // $(".psnoStickyNavigationWrap").addClass('fixed'); // 2018.04.16 top button position fix - ios scroll fix
        var k = $(window).scrollTop();
        if (!$(".quickArea").hasClass("popup")) {
            if (k > oldTop) {
                    $(".quickArea").removeClass("open");
            }
            if (k < oldTop || k > $(document).height() - $(window).height() - 55) {
                    $(".quickArea").addClass("open");
            }
        }
        oldTop = k;
        if (k > $(document).height() - $(window).height() - $(".footerWrap").outerHeight()) { // 2018.04.16 top button position fix
            $(".btnContentTop").addClass("ab").css("top", $(document).height() - $(".footerWrap").outerHeight() - 60);  // 2018.04.16 top button position fix
        } else {
            $(".btnContentTop").removeClass("ab").css("top", "auto");
        }

        if($("body").hasClass("pc") || $("body").hasClass("tablet")){
            if (k == 0) {
                $(".btnContentTop").hide();
            } else {
                $(".btnContentTop").show();
            }

            if ($(window).scrollTop() == 0) {
                $(".btnContentTop").hide();
            } else {
                $(".btnContentTop").show();
            }

        } else {
            $(".btnContentTop").hide();
        }
    });

    if ($(window).scrollTop() == 0) {
        $(".btnContentTop").hide();
    } else {
        $(".btnContentTop").show();
    }
    */

    $(".btnContentTop").bind("click", function () {
        $("body,html").animate({
            scrollTop: 0
        }, 300);
    });

    //==========================================하단에서 이동됨 190424
    //검색 버튼 눌렀을 때, gnb sub 하단메뉴 끄기 -추가 190422 -190424
    $(".btnGnbSearch").on("click", function (k) {
        k.preventDefault();
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            $(".gnbSubArea").hide(); //추가 190425
            e();//추가 190425

            if ($(".gnbUtilWrap").hasClass("search")) {
                $(".gnbSubArea").hide();

                $(".gnbWrapFull").attr("class", "gnbWrapFull").removeAttr("style");
                $(".gnbLanguageBtn").removeClass("on");
                $(".gnbSearchBtn").removeClass("on");
                $(".gnbSearchArea, .gnbLanguageArea").hide();
                $(".gnbUtilWrap").attr("class", "gnbUtilWrap");
                $(".gnbSearchArea, .gnbLanguageArea").hide();

                $(".gnbautoSearchList.recentSearch").removeClass("on");//추가 190422

            } else {
                $(".gnbUtilWrap").addClass("search");
                $(".gnbSearchArea, .gnbLanguageArea").slideDown(300);
                $(".btnMobileSearch").hasClass("close");
                $(".gnbDim").css("display", "none");
                $(".gnbWrapFull").attr("class", "gnbWrapFull").removeAttr("style"); //추가 190422

            }
        }
        GnbResponsiveImages();
        $('.gnbSearchArea .searchInput .inputText').focus(); //추가 190422
    });
    //==========================================end 하단에서 이동됨 190424
}

$(function () {
    "use strict";

    $("body").addClass("pc");

    $(window).resize(function () {
        GnbResponsiveImages();
    });

    $("label").on("keypress", function (s) {
        if (s.keyCode == 32 || s.keyCode == 13) {
            s.preventDefault();
            $(this).click();
        }
    });

    $("label").each(function () {
        if ($(this).prev().attr("type") == "radio" || $(this).prev().attr("type") == "checkbox") {
            $(this).attr("tabindex", "0");
        }
    });

    if ($(".voteMenu").length > 0) {
        var i = $(".voteMenu");
        i.each(function () {
            var s = $(this);
            var t = new Swiper(s.find(".voteMenuSlide"), {
                nextButton: s.find(".btn_next"),
                prevButton: s.find(".btn_prev"),
                pagination: s.find(".swiper-pagination"),
                paginationElement: "button",
                paginationClickable: true,
                breakpoints: {
                    20000: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 32,
                        onProgress: function (u) {
                            if (u.slides.length <= 4) {
                                s.addClass("hideBtn");
                            } else {
                                s.removeClass("hideBtn");
                            }
                        }
                    },
                    767: {
                        slidesPerGroup: 2,
                        slidesPerView: 2,
                        spaceBetween: 10,
                        onProgress: function (u) {
                            if (u.slides.length <= 2) {
                                s.addClass("hideBtn");
                            } else {
                                s.removeClass("hideBtn");
                            }
                        }
                    }
                }
            });
        });
    }
    if ($(".imgView4.slideType.slideWrap").length > 0) {
        var q = $(".imgView4.slideType.slideWrap");
        q.each(function () {
            var s = $(this);
            setTimeout(function () {
                var t = new Swiper(s, {
                    nextButton: s.find(".btn_next"),
                    prevButton: s.find(".btn_prev"),
                    pagination: s.find(".swiper-pagination"),
                    paginationElement: "button",
                    paginationClickable: true,
                    slidesPerGroup: 1,
                    slidesPerView: 1,
                    spaceBetween: 0,
                    breakpoints: {
                        20000: {
                            slidesPerView: 4,
                            slidesPerGroup: 4,
                            spaceBetween: 32,
                            onProgress: function (u) {
                                if (u.slides.length == 4) {
                                    u.container.addClass("hideBtn");
                                } else {
                                    u.container.removeClass("hideBtn");
                                }
                            }
                        },
                        767: {
                            slidesPerGroup: 1,
                            slidesPerView: 1,
                            spaceBetween: 0,
                            onProgress: function (u) {
                                if (u.slides.length == 1) {
                                    u.container.addClass("hideBtn");
                                } else {
                                    u.container.removeClass("hideBtn");
                                }
                            }
                        }
                    }
                });
            }, 500);
        });
    }
    function f() {
        var t;
        var s;
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            t = 70;
        } else {
            t = 55;
        }
        s = $(".contTop").outerHeight() + t;
        // [2020.01.20:정인혁] GT : Start - hyundai-history 페이지 무한반복문제로 인한 주석처리 (Maximum call stack size exceeded)
        /*
        if (s < 200) {
            f();
        } else {
            if ($(".topVisualArea").length) {
                h.css({
                    top: s,
                    position: "absolute",
                    left: 0
                });
                $(".contTop").css({
                    "margin-bottom": h.height()
                });
            }
        }
        */
        // [2020.01.20:정인혁] GT : END - hyundai-history 페이지 무한반복문제로 인한 주석처리 (Maximum call stack size exceeded)
    }
    function d() {
        $(".navigationTabWrap.openClose .tab").show();
        var s = true;
        $(".navigationTabWrap.openClose .tab").each(function (u) {
            var t = $(this).closest(".navigationTabWrap");
            if (s) {
                if ($(this).position().top > 0) {
                    $(this).hide();
                    s = false;
                } else {
                    $(this).show();
                }
            } else {
                s = false;
                $(this).hide();
            }
        });
    }
    if ($(".navigationTabWrap").length > 0) {
        var h = $(".navigationTabWrap");
        var r = $(".gnbWrapFull");
        var e = setTimeout(function () {

            f();
            $(".topVisual .visual img").load(function () {
                f();
            });
        }, 500);

        $(window).resize(function () {
            clearTimeout(e);
            e = setTimeout(function () {
                f();
            }, 100);
        });
        $(window).scroll(function () {
            var s = $(window).scrollTop();
            var u = $(".contTop").outerHeight();
            var t = h.find(".tabBtn");
            if ($(".topVisualArea").length) {
                if (s >= u) {
                    h.addClass("fixed");
                    r.addClass("ab");
                } else {
                    h.removeClass("fixed");
                    r.removeClass("ab");
                }
            } else {
                if (s >= u + $(".contWrap").outerHeight()) {
                    h.addClass("fixed");
                    r.addClass("ab");
                } else {
                    h.removeClass("fixed");
                    r.removeClass("ab");
                }
            }
            if (h.length > 0 && t.length > 0) {
                if (s >= u) {
                    t.each(function (v) {
                        if (s >= $("#" + $(this).attr("data-focus")).offset().top - h.height()) {
                            h.find(".tab").removeClass("on").eq(v).addClass("on");
                        }
                    });
                } else {
                    h.find(".tab").removeClass("on");
                }
            }
        });
        $(document).on("click", ".navigationTabWrap .tab button", function (t) {
            var s = $(this).attr("data-focus");
            if (s) {
                t.preventDefault();
                var u = $("#" + s).offset().top - h.height() + 1;
                $("body,html").animate({
                    scrollTop: u
                }, 300);
            }
        });

        setTimeout(function () {
            d();
            if ($(".navigationTabWrap .tabListArea .tab.on").length > 0) {
                $(".navigationTabWrap").scrollLeft($(".navigationTabWrap .tabListArea .tab.on").offset().left - 15);
            }
        }, 100);
        $(window).resize(function () {
            d();
        });
        $(".navigationTabWrap .btnRight.openClose").on("click", function (u) {
            u.preventDefault();
            var s = $(this).closest(".navigationTabWrap");
            var t = 0;
            if (!$(this).hasClass("on")) {
                s.addClass("open");
                s.find(".tab").show();
                $(this).addClass("on");
                t = s.find(".tabList").outerHeight();
                s.find(".tabListArea").attr("tabindex", 0).focus();
            } else {
                s.removeClass("open");
                d();
                $(this).removeClass("on");
                t = 70;
            }
            s.animate({
                height: t
            }, 300);
        });
    }

    $(document).on("click.accoding", ".togListWrap .btnOpenClose, .togListWrap .togBtn", function (t) {
        t.preventDefault();
        var s = $(this).closest(".togListWrap");
        var w = $(this).closest(".togList");
        var u = $(".navigationTabWrap");
        var v = $(this);
        if (!s.hasClass("small")) {
            if (!w.hasClass("on")) {
                s.find(".togList").removeClass("on");
                // s.find(".togCont").slideUp(300);
                // w.addClass("on");
                // w.find(".togCont").slideDown(300, function () {
                //     var x = v.closest(".togList").offset().top - u.height();
                //     // $("body,html").delay(200).animate({
                //     //     scrollTop: x
                //     // }, 300);
                // });
            } else {
                s.find(".togList").removeClass("on");
                s.find(".togCont").slideUp(300);
                s.find(".btnWrap").removeClass("on");
                s.find(".btnWrap").find(".btn").removeClass("gray").text("Expand all");
            }
        } else {
            if (!w.hasClass("on")) {
                w.addClass("on");
                w.find(".togCont").slideDown(300);
            } else {
                w.removeClass("on");
                w.find(".togCont").slideUp(300);
            }
        }
    });

    $(document).on("click.accoding", ".togListWrap .btnWrap .btn", function (s) {
        s.preventDefault();
        if (!$(this).closest(".btnWrap").hasClass("on")) {
            $(".togListWrap .btnWrap").addClass("on");
            $(".togListWrap .btnWrap").find(".btn").addClass("gray").text("Collapse all");
            $(".togList").addClass("on");
            $(".togList").find(".togCont").slideDown(300);
        } else {
            $(".togListWrap .btnWrap").removeClass("on");
            $(".togListWrap .btnWrap").find(".btn").removeClass("gray").text("Expand all");
            $(".togList").removeClass("on");
            $(".togList").find(".togCont").slideUp(300);
        }
    });

    if ($(".bottomSlideMenu .btnOpenClose").length > 0) {
        $(".bottomSlideMenu .btnOpenClose").on("click", function (s) {
            s.preventDefault();
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                $(this).closest(".grid").find(".bottomMenuArea").slideDown(300);
            } else {
                $(this).removeClass("on");
                $(this).closest(".grid").find(".bottomMenuArea").slideUp(300);
            }
        });
    }
    if ($(".tabWrap .tabArea button").length > 0) {
        $(document).on("click", ".tabWrap .tabArea button", function (y) {
            y.preventDefault();
            var t = $(this).closest(".tabWrap");
            var s = $(this).closest(".tab").index();
            var x = $(this).text();
            t.find(".tabActive span").text(x);
            t.find(".tabArea .tab").removeClass("on").eq(s).addClass("on");
            t.find(".tabArea").removeClass("open");
            var v = false;
            t.find("li").each(function () {
                var z = $(this).attr("data-parsys-id");
                if ($("#" + z).find(".slideWrap").length > 0) {
                    v = true;
                }
            });

            var w = $(this).parent().attr("data-parsys-id");
            t.find("li").each(function () {
                if (v) {
                    $("#" + $(this).attr("data-parsys-id")).css({
                        visibility: "hidden",
                        overflow: "hidden",
                        height: "0",
                        display: "block"
                    });
                    $("#" + w).css({
                        visibility: "visible",
                        overflow: "visible",
                        height: "auto",
                        display: "block"
                    });
                } else {
                    $("#" + $(this).attr("data-parsys-id")).hide();
                    $("#" + w).show();
                }
            });
            t.find(".tabArea .tab button").removeAttr("title");
            $(this).attr("title", "now page");
            var u = $("#" + w);
            setTimeout(function () {
                u.find(".swiper-pagination").css("top", u.find(".swiper-slide-active img").height() - 25);
                if (u.find(".gridRow .grid").length >= 2) {
                    u.find(".swiper-pagination").css("top", (u.find(".swiper-slide-active img").height() * 2) - 25);
                }
            }, 100);
        });
        setTimeout(function () {
            $(".tabWrap .tabArea .on").find("button").trigger("click");
        }, 500);
    }
    $(document).on("click", ".tabWrap .tabActive", function (t) {
        t.preventDefault();
        var s = $(this).closest(".tabWrap");
        if (!s.find(".tabArea").hasClass("open")) {
            s.find(".tabArea").addClass("open");
        } else {
            s.find(".tabArea").removeClass("open");
        }
    });
    if ($(".galleryTabWrap").length > 0) {
        setTimeout(function () {
            $(".galleryTabWrap").each(function () {
                $(this).find(".tabWrap .tabArea button").eq(0).click();
            });
        }, 500);
    }
    if ($(".searchWrap .inputText").length > 0) {
        $(document).on("keydown", ".autoSearchList .link", function (t) {
            var s;
            if (t.keyCode == 40) {
                t.preventDefault();
                s = $(this).closest(".searchWrap").find(".autoSearchList .link.on").parent().index() + 1;
                if (s < $(this).closest(".searchWrap").find(".autoSearchList .link").length) {
                    $(this).closest(".searchWrap").find(".autoSearchList .link").eq(s).focus();
                } else {
                    $(this).closest(".searchWrap").find(".autoSearchList").hide();
                    $(".searchWrap .inputText").focus();
                }
            }
            if (t.keyCode == 38) {
                t.preventDefault();
                s = $(this).closest(".searchWrap").find(".autoSearchList .link.on").parent().index() - 1;
                if (s >= 0) {
                    $(this).closest(".searchWrap").find(".autoSearchList .link").eq(s).focus();
                } else {
                    $(this).closest(".searchWrap").find(".autoSearchList").hide();
                    $(".searchWrap .inputText").focus();
                }
            }
        });
        $(document).on("focus", ".autoSearchList .link", function () {
            $(this).closest(".searchWrap").find(".autoSearchList").addClass("on");
            $(this).addClass("on");
        });
        $(document).on("blur", ".autoSearchList .link", function () {
            $(this).closest(".searchWrap").find(".autoSearchList").removeClass("on");
            $(this).removeClass("on");
        });
        $(".searchWrap").focusout(function () {
            var t = $(this);
            setTimeout(function () {
                if (!t.find(".autoSearchList").hasClass("on")) {
                    t.find(".autoSearchList").hide();
                }
            }, 100);
        });
    }
    if ($(".slideArea1").length > 0) {
        var n = $(".slideArea1");
        var t;
        n.each(function () {
            var s = $(this);
            if (!s.hasClass("numbering")) {
                t = new Swiper(s, {
                    nextButton: s.find(".btn_next"),
                    prevButton: s.find(".btn_prev"),
                    pagination: s.find(".swiper-pagination"),
                    paginationElement: "button",
                    paginationClickable: true,
                    loop: true,
                    onProgress: function (u) {
                        setTimeout(function () {
                            s.find(u.paginationContainer).css("top", s.find(".swiper-slide-active img").height() - 25);
                            if (s.find(".gridRow .grid").length >= 2) {
                                s.find(u.paginationContainer).css("top", (s.find(".swiper-slide-active img").height() * 2) - 25);
                            }
                        }, 100);
                    }
                });
            } else {
                t = new Swiper(s, {
                    nextButton: s.find(".btn_next"),
                    prevButton: s.find(".btn_prev"),
                    pagination: s.find(".swiper-pagination"),
                    paginationElement: "button",
                    paginationType: "bullets",
                    paginationClickable: true,
                    loop: true,
                    onProgress: function (u) {
                        setTimeout(function () {
                            s.find(u.paginationContainer).css("top", s.find(".swiper-slide-active img").height() - 25);
                        }, 100);
                    },
                    paginationBulletRender: function (w, x, y) {
                        var v = x + 1;
                        var u = (v < 10 ? "0" : "") + v;
                        return '<span class="' + y + ' swiper-number"><em>' + u + "</em></span>";
                    }
                });
            }
        });
    }
    if ($(".slideInfo").length > 0) {
        var l = $(".slideInfo");
        var p = new Swiper(".slideInfo", {
            nextButton: l.find(".btn_next"),
            prevButton: l.find(".btn_prev"),
            pagination: l.find(".swiper-pagination"),
            paginationElement: "button",
            paginationClickable: true,
            loop: true,
            onProgress: function (s) {
                setTimeout(function () {
                    l.css("height", $(s.container).find(".swiper-slide-active .info").outerHeight());
                }, 100);
            }
        });
    }
    if ($(".slideAuto").length > 0) {
        var m = $(".slideAuto");
        var o = null;
        m.each(function () {
            var s = $(this);
            var u = new Swiper(s, {
                nextButton: s.find(".btn_next"),
                prevButton: s.find(".btn_prev"),
                pagination: s.find(".swiper-pagination"),
                paginationElement: "button",
                paginationClickable: true,
                autoplay: 6000,
                loop: true,
                onProgress: function () { }
            });
            setTimeout(function () {
                t();
            }, 1000);
            $(window).resize(function () {
                clearTimeout(o);
                o = setTimeout(function () {
                    t();
                }, 100);
            });

            function t() {
                var v = $(".topVisualArea .topVisual").width();
                if (v <= 1180) {
                    v = 1180;
                }
                $(".mainTopVisualArea .btn_prev").css({
                    "margin-left": -(v / 2)
                });
                $(".mainTopVisualArea .btn_next").css({
                    "margin-right": -(v / 2)
                });
                if (s.find(".btnPlayStop").length < 1) {
                    s.find(".swiper-pagination").append('<button class="btnPlayStop">stop</button>');
                }
                s.find(".btnPlayStop").off("click");
                s.find(".btnPlayStop").on("click", function () {
                    if (!$(this).hasClass("play")) {
                        $(this).addClass("play");
                        u.stopAutoplay();
                    } else {
                        $(this).removeClass("play");
                        u.startAutoplay();
                    }
                });
            }
        });
    }
    if ($(".slideInfo2").length > 0) {
        var k = $(".slideInfo2");
        k.each(function () {
            var s = $(this);
            var t = new Swiper(s, {
                nextButton: s.find(".btn_next"),
                prevButton: s.find(".btn_prev"),
                pagination: s.find(".swiper-pagination"),
                paginationElement: "button",
                paginationClickable: true,
                loop: true
            });
        });
    }
    if ($(".slideInfoFixText").length > 0) {
        var j = $(".slideInfoFixText");
        var g = new Swiper(j, {
            nextButton: j.find(".btn_next"),
            prevButton: j.find(".btn_prev"),
            pagination: j.find(".swiper-pagination"),
            paginationElement: "button",
            paginationClickable: true,
            loop: true,
            onInit: function () {
                if ($(window).width() < 767) {
                    j.height(j.find(".info").outerHeight());
                }
            }
        });
        $(window).resize(function () {
            if ($(window).width() < 767) {
                j.height(j.find(".info").outerHeight());
            }
        });
    }
    if ($(".galleryTy2").length > 0) {
        var c = $(".galleryTy2");
        c.each(function () {
            var t = $(this);
            var s = new Swiper(t.find(".galleryTy2-slide"), {
                nextButton: t.find(".btn_next"),
                prevButton: t.find(".btn_prev"),
                pagination: t.find(".swiper-pagination"),
                paginationElement: "button",
                paginationClickable: true,
                loop: true
            });
        });
    }
    if (browser.name == "msie" && Number(browser.version) <= 10) {
        $("body").addClass("msie9");
    }
    if ($(".btnHelp").length > 0) {
        $(".btnHelp").on("click", function (t) {
            t.preventDefault();
            var s = $(this).closest(".filterItem");
            if (!$(this).hasClass("on")) {
                $(".btnHelp").removeClass("on");
                $(".helpBox").hide();
                $(this).addClass("on");
                s.find(".helpBox").show();
            } else {
                $(".btnHelp").removeClass("on");
                $(".helpBox").hide();
                $(".btnHelp").blur();
                $(".btnHelp").mouseleave();
            }
        });
        $(".btnHelpClose").on("click", function (s) {
            s.preventDefault();
            $(".btnHelp").removeClass("on");
            $(".helpBox").hide();
            $(".btnHelp").blur();
        });
    }
    if ($(".btnMachFilter").length > 0) {
        $(".btnMachFilter").on("click", function (t) {
            t.preventDefault();
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                $(".machFilterArea").stop().slideDown(200);
            } else {
                $(this).removeClass("on");
                $(".machFilterArea").stop().slideUp(200);
            }
            var s = 0;
            $(".filterItem.line1").each(function () {
                if ($(this).height() > s) {
                    s = $(this).outerHeight();
                }
            });
            $(".filterItem.line1").css({
                height: s
            });
        });
        $(".machFilterArea .btn.search").on("keydown", function (s) {
            if (s.keyCode == 9 && $("body").hasClass("pc")) {
                $(".btnMachFilter").click();
            }
        });
        $(".btnMachFilterClose").on("click", function (s) {
            s.preventDefault();
            $(".btnMachFilter").focus().removeClass("on");
            $(".machFilterArea").stop().slideUp(200);
        });
    }
    $(".datepickerItem .inputText").each(function () {
        $(this).datepicker({
            showOn: "button",
            buttonImage: "/content/dam/hyundai/ww/en/images/common/static/btn_cal.png",
            buttonImageOnly: true,
            buttonText: "Select date",
            dateFormat: "yy-mm-dd"
        });
    });
    if ($(".lineChk").length > 0) {
        $(".lineChk").each(function () {
            if ($(this).height() > 30) {
                $(this).height(56);
            }
        });
    }
    if ($(".listViewType").length > 0) {
        if ($(".listViewType .grid").hasClass("on")) {
            $(".brdList").removeClass("gridMode");
        } else {
            $(".brdList").addClass("gridMode");
        }
        $(".listViewType button").on("click", function (s) {
            s.preventDefault();
            if ($(this).hasClass("grid")) {
                $(".brdList").removeClass("gridMode");
                $(".listViewType .list").removeClass("on");
                $(this).addClass("on");
            } else {
                $(".brdList").addClass("gridMode");
                $(".listViewType .grid").removeClass("on");
                $(this).addClass("on");
            }
        });
    }
    $(document).on("click", ".calendarWrap .calendarControl .date", function (s) {
        s.preventDefault();
        if (!$(this).hasClass("open")) {
            $(this).addClass("open");
            $(this).closest(".calendarControl").find(".calOption").stop().fadeIn(300);
        } else {
            $(this).removeClass("open");
            $(this).closest(".calendarControl").find(".calOption").stop().fadeOut(300);
        }
    });
    $(document).on("click", ".calendarWrap .btnOptionClose", function (s) {
        s.preventDefault();
        $(".calendarWrap .calendarControl .date").removeClass("open");
        $(".calendarControl").find(".calOption").stop().fadeOut(300);
    });
    $(document).on("click", ".calendarWrap .calToday", function (s) {
        s.preventDefault();
        $(".calendarWrap .today .btnCalMore").trigger("click");
    });
    $(document).on("click", ".calendarWrap .btnCalMore", function (u) {
        u.preventDefault();
        var t = $(this).closest(".calBodyArea");
        var s = $(this).closest("li").find(".calMoreContent");
        if (!$(this).closest("li").hasClass("on")) {
            $(".calendarWrap .calBodyArea > li").removeClass("on");
            $(this).closest("li").addClass("on");
            $(".calendarWrap .calMoreContent").hide();
            s.show();
            $(".calendarWrap .calBodyArea").css({
                height: t.find(" > li").outerHeight()
            });
            t.css({
                height: t.find(" > li").outerHeight() + s.outerHeight()
            });
            s.css({
                top: $(this).closest("li").outerHeight()
            });
        } else {
            $(this).closest("li").removeClass("on");
            t.css({
                height: t.find(" > li").outerHeight()
            });
            setTimeout(function () {
                s.hide();
            }, 200);
        }
    });
    $(window).resize(function (v) {
        v.preventDefault();
        var s = window.innerWidth;
        var u = $(".calendarWrap .calBodyArea > li");
        var t = $(".btnCalMore").closest("li").find(".calMoreContent");
        u.css({
            height: u.outerWidth()
        });
        t.css({
            top: u.outerWidth()
        });
        if (s > 767) {
            $(".calendarWrap .calBodyArea").each(function () {
                var w = $(this);
                if (w.find("li").hasClass("on")) {
                    w.css({
                        height: u.outerHeight() + t.outerHeight()
                    });
                } else {
                    w.css({
                        height: u.outerHeight()
                    });
                }
            });
        } else {
            $(".calendarWrap .calBodyArea").each(function () {
                var w = $(this);
                if (w.find("li").hasClass("on")) {
                    w.css({
                        height: u.outerWidth() + t.outerHeight()
                    });
                } else {
                    w.css({
                        height: u.outerWidth()
                    });
                }
            });
        }
    }).resize();
    $(".calendarWrap .btnMoreClose").on("click", function (u) {
        u.preventDefault();
        var t = $(this).closest(".calBodyArea");
        var s = $(this).closest("li").find(".calMoreContent");
        $(".calendarWrap .calBodyArea > li").removeClass("on");
        t.css({
            height: t.find(" > li").not(".on").outerHeight()
        });
        setTimeout(function () {
            s.hide();
        }, 200);
    });
    if ($(".tableType").length == 0) {
        $(".utillFont").hide();
    }
    if ($(".utillFont").length > 0) {
        var b = 0;
        var a = $(".utillFont");
        a.find(".fsBig").bind("click", function (s) {
            s.preventDefault();
            if (b < 3) {
                b = b + 1;
            } else {
                b = 3;
            }
            $(".tableType").attr("class", "tableType fzbig" + b);
        });
        a.find(".fsSmall").bind("click", function (s) {
            s.preventDefault();
            if (b > 0) {
                b = b - 1;
            } else {
                b = 0;
            }
            $(".tableType").attr("class", "tableType fzbig" + b);
        });
    }
    if ($(".mainTopBanner").length > 0) {
        $(".mainTopBanner .btnBannerClose").on("click", function (s) {
            s.preventDefault();
            if (!$(this).hasClass("on")) {
                $(this).addClass("on");
                $(".bannerArea").slideDown(200, function () {
                    GnbResponsiveImages();
                });
                $(".visitcountry").hide();
            } else {
                $(this).removeClass("on");
                $(".bannerArea").slideUp(200, function () {
                    //GnbResponsiveImages();
                    $(".gnbWrapFull").css("top", "0");
                });

                $(".visitcountry").show();
                $("body").removeClass("topBanner");
            }
        });
        $(".visitcountry").on("click", function (s) {
            s.preventDefault();
            $(".mainTopBanner .btnBannerClose").addClass("on");
            $(".bannerArea").slideDown(200, function () {
                GnbResponsiveImages();
            });
            $(".visitcountry").hide();
        });
    }
});
var browser = (function () {
    "use strict";
    var b = navigator.userAgent.toLowerCase();
    var a = /(webkit)[ \/](\w.]+)/.exec(b) || /(opera)(?:.*version)?[ \/](\w.]+)/.exec(b) || /(msie) ([\w.]+)/.exec(b) || !/compatible/.test(b) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(b) || [];
    return {
        name: a[1] || "",
        version: a[2] || "0"
    };
}());

/*
function gfnOpenLayer(a, d) {
    "use strict";
    d.preventDefault();
    window.focusBtn = d.currentTarget;
    var b = {
        opacity: 0
    };

    //var c = d.pageY;

    a = $(a);
    a.css(b);
    a.show();
    a.stop().animate({
        opacity: 1
    }, {
        duration: 400,
        complete: function() {
            a.css({
                transform: "initial"
            });
        }
    });
    a.attr("tabIndex", -1).focus();
    a.find(".btnLayerClose").off("click.closeEvent").on("click.closeEvent", function(f) {
        f.preventDefault();
        $(this).closest(a).hide();
        if (window.focusBtn) {
            window.focusBtn.focus();
        }
    });
}
*/

// Start : 180730 modify
$(document).on("click", ".btnLayerClose", function (f) {
    f.preventDefault();
    $(this).closest(".layerPop").hide();
    $('body').removeAttr('style');
});

$(document).on("click", ".utilWrap .util.share", function (f) {
    $(".layerPop.share").css("opacity", "0");
    $(".layerPop.share").show();
    $(".layerPop.share").stop().animate({
        opacity: 1
    }, {
        duration: 400
    });
    $('body').css({ 'width': $('body').innerWidth(), 'overflow': 'hidden' });
});
// End : 180730 modify

/** s: 190826 add
 * 레이어 팝업 열기, 닫기
 *
 * 사용법
 * $('.btn_4').on('click', function () {
        var $layerPopup = $('#emailFormDiv'); // 레이어팝업 class 또는 id
        openLayerPopup($layerPopup);
    });

 * @param $el :
 *  <div class="layerPopupWrap layerEmailForm active" id="emailFormDiv" style="">
 *      <div class="layerPopupInner wide">
 *          <div class="layerPopup">
 *              <div class="layerTitWrap"></div>
 *              <div class="sectionLayerWrap"></div>
 */
function setLayerPopupPos() {
    var $el = $(".layerPopupWrap.active"),
        $layerPopInner = $el.find(".layerPopupInner"),
        $layerPopup = $el.find(".layerPopup"),
        $layerPopupSection = $el.find('.sectionLayerWrap'),
        winW = window.innerWidth,
        winH = window.innerHeight,
        winTop = $(window).scrollTop(),
        popContainer = $el.scrollTop(),
        popH = $el.find(".layerPopup").innerHeight(),
        popupTitleHeight = $el.find(".layerTitWrap").innerHeight() || 0,
        popupGrayBoxHeight = $el.find(".grayBox").innerHeight() || 0,
        calcPos = 0
        ;
    if (winW >= 768) {
        //mobile style reset
        $layerPopupSection.attr('style', '');
    } else if (winW < 768) {
        //높이값 설정
        var overHeightTopPos = 15; // 팝업의 상단 위치
        var layerPopupHeight = winH - overHeightTopPos * 2 - popupTitleHeight - popupGrayBoxHeight;
        $layerPopup.css('max-height', Math.round(winH - overHeightTopPos * 2) + 'px');
        if (!$layerPopupSection.length) {
            $layerPopup.css('overflow-y', 'auto');
        } else {
            $layerPopupSection.css('height', Math.round(layerPopupHeight) + 'px');
        }
    }
}

function setBodyOverflowHidden() {
    if ($('html').hasClass('ie9') || $('html').hasClass('ie10') || $('html').hasClass('ie11')) {
        $('body').css({ 'width': $('body').innerWidth(), 'overflow': 'hidden', 'float': 'right' });
    } else {
        $('body').css({ 'width': $('body').innerWidth(), 'overflow': 'hidden' });
    }
}

// 웹접근성 : 팝업 내 포커스 가두기, 팝업 내 tabindex=0 인 곳에 포커스 시킴
function setPopupWA($el) {
    var $closeBtn = $el.find('.closeLayerPopup'),
        $layerPopup = $el.find('.layerPopupInner .layerPopup');

    $closeBtn.on('focus', function (e) {
        var $target = $(e.target);
        $target.after("<a href='javascript:void(0);' class='layerPopupLoop'></a>");
        $el.find('.layerPopupLoop').off('focus').focus(function (e) {
            $layerPopup.focus();
            $el.find('.layerPopupLoop').remove();
        });
    });
}

function setLayerPopupUI($el) {
    $el.addClass('active').show();

    var $layerPopupInner = $el.find('.layerPopupInner'),
        $layerPopup = $el.find('.layerPopupInner .layerPopup');

    // 팝업 뜬 후 포커스 주기
    setTimeout(function () {
        $layerPopup.focus();
    }, 10);

    var $closeBtn = $el.find('.closeLayerPopup, .btn_ok');

    $closeBtn.on('click', function () {
        $layerPopupInner.removeAttr('tabindex');
        $el.find('.layerPopupLoop').remove();

        $el.removeClass('active').hide();

        $('body').removeAttr('style');
    });
}

function openLayerPopup($layerPopup) {
    setLayerPopupUI($layerPopup);
    setLayerPopupPos();
    setPopupWA($layerPopup);
    setBodyOverflowHidden();
}
$(window).resize(function () {
    if ($(".layerPopupWrap.active").length) {
        setLayerPopupPos();
    }
});
/** e: 190826 add **/

var dep1 = null;
var dep2 = null;
var dep3 = null;
var dep4 = null;
var dep5 = null;

$(document).ready(function () {
    "use strict";
    gnb(dep1, dep2, dep3, dep4, dep5);
});

//search engine 관련 스크립트 추가 //* GT디자인가이드_20 190228 추가됨 //*190319
//============================================
var SEARCH_AUTO_COMPLETE_MIN_COUNT = 3;

$(document).ready(function () {

    //GnB input 클릭 시, search btn 클릭 시
    $(".gnbSearchArea .gnbSearch .searchInput .inputText").on("click", function () {

        if ($(this).val().length < SEARCH_AUTO_COMPLETE_MIN_COUNT) {

            if ($(".gnbautoSearchList.recentSearch").css("display") == "block") {
                $(".gnbautoSearchList.recentSearch").css("display", "none");
                /*$(".gnbDim").css("display","block");*/

                var gnbTop = $(".gnbWrapFull").offset().top;
                if ($("body").hasClass("mobile")) {
                    /*$(".gnbDim").css("display","none");*/
                }

            } else {
                $(".gnbautoSearchList.recentSearch").css("display", "block");
                var gnbTop = $(".gnbWrapFull").offset().top;

                Header.recentSearch.getCookie($('.gnbautoSearchList.recentSearch .autoSearch'));

                /*            if($("body").hasClass("mobile")){
                            $(".gnbDim").css({"display":"block"},{"top":gnbTop});

                         }*/

            }
        }
        // search Input 외 클릭 시 최근 검색어 닫기 (추가 190416)
        $('html').click(function (e) {
            if (!$(e.target).hasClass("gnbSearchActive")) {
                $(".gnbautoSearchList.recentSearch").hide()
            }
        });

    });

    //background(gnbDim #000) 클릭 시 창닫기 -추가 190422
    $(".gnbDim").on("click", function () {
        $(this).css("display", "none");
        $(".gnbSearchArea").hide();
        $(".btnMobileSearch").removeClass("close");
        $(".scrollBox").css({ "display": "none", "right": "-100%" });
        $(".btnMobileMenu").attr("class", "btnMobileMenu").removeAttr("style");
    });

    //* 모바일 일 때, GNB Search BTN
    $(".btnMobileSearch").on("click", function () {
        if ($(".btnMobileSearch").hasClass("close")) {
            $(".btnMobileSearch").removeClass("close");
            $(".gnbSearchArea").hide(); //- hide로 변경 190422
            $(".gnbSearchArea").slideUp(300);
            $(".gnbUtilWrap").attr("class", "gnbUtilWrap");
            $(".gnbDim").css("display", "none");
            $(".btnMobileMenu").attr("class", "btnMobileMenu").removeAttr("style"); //-추가 190422

        } else {
            $(".btnMobileSearch").addClass("close");
            $(".gnbSearchArea").slideDown(300);
            $(".gnbUtilWrap").addClass("search");
            $(".btnMobileMenu").attr("class", "btnMobileMenu").removeAttr("style"); //-추가 190422
            $(".scrollBox").css({ "display": "none", "right": "-100%" }); //-추가 190422
        }

        // 모바일에서 검색창 클릭 시 background(#000) 보이기
        if ($("body").hasClass("mobile")) {
            var gnbTop = $(".gnbWrapFull").offset().top;
            if ($(".gnbUtilWrap").hasClass("search")) {
                $(".gnbDim").css({ "display": "block", "top": 0 }) /*190418*/
            } else {
                $(".gnbDim").css("display", "none");
                $(".gnbautoSearchList.recentSearch").removeClass("on");
            }
        }

        // 검색창 클릭 시 input에 포커스 -추가 190422
        $('.gnbSearchArea .searchInput .inputText').focus();
    });

    //모바일 menu (bar) 누를 때 검색창 끄기 -추가 190422
    $(".btnMobileMenu").on("click", function () {
        $(".gnbSearchArea").css("display", "none");
        $(".btnMobileSearch").attr("class", "btnMobileSearch gnbSearchBtn")
    });

    // Gnb Button reset 클릭 시, 리셋
    $(".gnbSearchArea .btnReset").on("click", function () {
        $(".gnbautoSearchList").hide();
        $(".gnbautoSearchList.recentSearch").show();  //동작확인
    });


    // 검색 버튼클릭
    $(".gnbSearchArea .btnSearch").on("click", function () {
        var $target = $(this).closest(".gnbSearchArea");
        $(this).val($(this).val().replace(/<[^>]*>?/gm, '')); //2019.10.16 wonhee.choi strip html
        Header.recentSearch.setCookie($(this).val());
        var txtGnbSearchKey = $.trim($target.find(".gnbSearch .inputText").val());
        Header.search.moveSearchResult(txtGnbSearchKey);
    });

    /* ====================================*/
    // btnGnbClose 클릭 시 창닫기
    $(".gnbWrapFull .btnGnbClose").on("click", function (k) {
        k.preventDefault();
        if ($("body").hasClass("pc") || $("body").hasClass("tablet")) {
            $(".btnMobileSearch").attr("class", "btnMobileSearch"); //* GT디자인가이드_20 190228 추가됨
            $(".gnbSearchArea").hide(); //* GT디자인가이드_20 190228 추가됨
            $(".gnbDim").css("display", "none"); //* GT디자인가이드_20 190228 추가됨
        }
        GnbResponsiveImages();
    });

    //모바일에서 tab 클릭 시 tabArea 접히기 - 추가 190422
    $("#searchTabWrap .tabArea .tab a").on("click", function () {
        $(".tabArea").removeClass("open");
    });

});
//최근 검색어 삭제 (delete)
$(document).on("click", ".list .btn-delete", function () {
    $(this).parent(".list.con").hide();
    Header.recentSearch.deleteCookie($(this).parent(".list.con"));
    Header.recentSearch.getCookie($(this).closest('.autoSearch'));
});

//layerPop .btn 클릭 시 창 닫기 추가
$(document).on("click", ".btnLayerClose,.layerPop .popCont .btnWrap .btn", function (f) {
    f.preventDefault();
    $(this).closest(".layerPop").hide();
});

//최근 검색어 모두 삭제 (all-delete)
$(document).on("click", ".all_delete .btn_all_delete", function () {
    $(this).closest(".recentSearch").hide();
    Header.recentSearch.deleteAllCookie($(this));
});

//최근검색어 누르면 이동
$(document).on("click", ".gnbautoSearchList .historyLi a", function () {
    Header.search.moveSearchResult($(this).text());
});

//자동완성 리스트누르면 이동
$(document).on("click", ".autoSearch .autoComp", function () {
    Header.recentSearch.setCookie($(this).attr("key-item"));
    Header.search.moveSearchResult($(this).attr("key-item"));
});

var Header = {};

//Search
Header.search = (function () {
    this.moveSearchResult = function (query) {
        var searchUrl = $('#btnGNBSearch').attr('search-url'); //'.gnbSearchArea .btnSearch'

        if (!query) {
            $(".layerPop.alert").css("display", "block");
            $(".layerPop .dim").css("display", "block");
        } else {
            location.href = searchUrl + '?query=' + encodeURIComponent(query) + '&_charset=utf-8';
        }
    };

    return this;

})();

//자동완성기능
function fn_search_auto_complete(vKeyword, targetEL, listCnt) {
    if (listCnt == undefined || !listCnt) listCnt = 5;
    $.ajax({
        type: "POST",
        url: "/wsvc/template_en/spa/common/search.autocomplete.html",
        data: { "query": vKeyword },
        dataType: 'json',
        success: function (resData) {
            var html = "";
            if (resData && resData.result[0] && resData.result[0].totalcount > 0) {
                var recommend = resData.result[0].items;
                for (var i = 0; i < recommend.length; i++) {
                    var recommendText = recommend[i].keyword;
                    recommendText = recommendText.replace(/\%20/ig, ' ');
                    if (i >= listCnt) {
                        break;
                    }
                    var recommendTextCh = recommendText.replace(vKeyword, '<mark class="keyword">' + vKeyword + '</mark>');
                    html += '<li class="list autoComp" key-item="' + recommendText + '"><button class="link">' + recommendTextCh + '</button></li>';
                }
            }
            $(targetEL).html(html); //없으면 기존 data 삭제
            if (html) {
                $(targetEL).show();
            } else {
                $(targetEL).hide();
            }
            return true;
        }

    });

}

Header.recentSearch = (function () {

    this.setCookie = function (value) {
        if (value == '' || value.length == 0) { return; }
        if (localStorage.getItem(Granite.I18n.getLocale() + "_historySearch") != null) {
            var historyTmp = localStorage.getItem(Granite.I18n.getLocale() + "_historySearch");
            var oldhistoryarray = historyTmp.split('|');
            historyTmp = value + '|';
            var leng = oldhistoryarray.length < 7 ? oldhistoryarray.length : 6;  //빈공백때문에 +1
            for (var i = 0; i < leng - 1; i++) {
                if (value.toUpperCase() != oldhistoryarray[i].toUpperCase()) {
                    historyTmp += oldhistoryarray[i] + '|';
                }
            }
        } else {
            historyTmp = value + '|';
        }

        localStorage.setItem(Granite.I18n.getLocale() + "_historySearch", historyTmp);

    };

    this.getCookie = function (obj) {
        var htmlTxt = '<li class="list title"><div class="link searchActive gnbSearchActive" alt="recent-search-title"><mark class="keyword">' + Granite.I18n.get("Search History") + '</mark></div></li>';

        if (localStorage.getItem(Granite.I18n.getLocale() + "_historySearch") == null || localStorage.getItem(Granite.I18n.getLocale() + "_historySearch").length == 0) {
            htmlTxt = '';
            $(obj).parent().hide();
            $(obj).parent().find('.all_delete').hide();
        } else {
            var historyTmp = localStorage.getItem(Granite.I18n.getLocale() + "_historySearch");
            var oldhistoryarray = historyTmp.split('|');
            var leng = oldhistoryarray.length < 6 ? oldhistoryarray.length - 1 : 5;

            for (var i = 0; i < leng; i++) {
                var val = oldhistoryarray[i];

                htmlTxt += '<li class="list con historyLi"><a href="#" class="link searchActive gnbSearchActive" alt="recent-search">' + val + '</a> <button class="btn-delete gnbSearchActive searchActive">delete</button></li>';
            }
            $(obj).parent().find('.all_delete').show();
        }
        $(obj).html(htmlTxt);

    };

    this.deleteCookie = function (obj) {

        var delVal = $(obj).find('a').html();
        var historyVal = '';

        if (localStorage.getItem(Granite.I18n.getLocale() + "_historySearch") != null) {
            var historyTmp = localStorage.getItem(Granite.I18n.getLocale() + "_historySearch");
            var oldhistoryarray = historyTmp.split('|');

            for (var i = 0; i < oldhistoryarray.length - 1; i++) {
                if (delVal.toUpperCase() != oldhistoryarray[i].toUpperCase()) {
                    historyVal += oldhistoryarray[i] + '|';
                }
            }
        }

        localStorage.setItem(Granite.I18n.getLocale() + "_historySearch", historyVal);

    }

    this.deleteAllCookie = function (obj) {
        localStorage.removeItem(Granite.I18n.getLocale() + "_historySearch");
        $('.gnbautoSearchList.recentSearch .autoSearch').html("");
        $('.autoSearchList.recentSearch .autoSearch').html("");
    }

    return this;
})();

//배장환 추가
$(document).on("click", '.gnbSearch .btnReset', function (e) {
    e.preventDefault();
    $(".gnbSearch .btnReset").hide();
    $(".gnbSearch .inputText").val("").focus();

});

$(document).on("keyup", '.gnbSearchArea .inputText', function (e) {
    var linkLen = $(this).closest(".gnbSearch").find(".autoSearch .link").length;

    if ($(this).val()) {
        $(".gnbSearch .btnReset").show();
        var word = chkword($(this).val(), 50);
        if (word != "") {
            $(this).val(word);
        }
    } else {
        $(".gnbSearch .btnReset").hide();
    }
    if (e.keyCode == 13 || e.which == 13) {
        $(this).val($(this).val().replace(/<[^>]*>?/gm, '')); //2019.10.16 wonhee.choi strip html
        Header.recentSearch.setCookie($(this).val());
        Header.search.moveSearchResult($.trim($(this).val()));
    } else if (e.keyCode == 40 && linkLen > 1) {
        e.preventDefault();
        $(this).closest(".gnbSearch").find(".gnbautoSearchList.recentSearch").show();
        $(this).closest(".gnbSearch").find(".gnbautoSearchList .link").eq(0).focus();
    } else if (e.keyCode != 38 && $(this).val().length >= SEARCH_AUTO_COMPLETE_MIN_COUNT) {
        $(".gnbautoSearchList.auto").show();
        fn_search_auto_complete($(this).val(), ".gnbautoSearchList.auto .autoSearch");

        $(".gnbSearch .gnbautoSearchList.auto").show();
    } else {
        $(".gnbSearch .gnbautoSearchList").hide();
    }
});
//배장환 추가
function chkword(strValue, maxByte) {
    var strLen = strValue.length;
    var totalByte = 0;
    var len = 0;
    var oneChar = "";
    var str2 = "";

    for (var i = 0; i < strLen; i++) {
        oneChar = strValue.charAt(i);
        if (escape(oneChar).length > 4) {
            totalByte += 2;
        } else {
            totalByte++;
        }
        if (totalByte <= maxByte) {
            len = i + 1;
        }
    }
    if (totalByte > maxByte) {
        //alert( Granite.I18n.get('msg_cannot_enter_more_than')+" "+ maxByte +" "+Granite.I18n.get('msg_bytes')+".") ;
        str2 = strValue.substr(0, len);
    }
    return str2;
}

/******************************************************************************
 * Description 항목의 Enter 키, Alt + Enbter 키 제어
 */
function keyEventHandler(textfield, event) {
    var elm = document.getElementById(textfield.getId());
    console.log("== Key Event =================================");
    altKeyEnterKeyHandler(elm, event);
}

function altKeyEnterKeyHandler(elm, evt) {
    if (evt.altKey && evt.keyCode == 13) {
        altEnterKeyHandler(elm);
        console.log("== alt + enter =================================");
        return false;
    } else if (evt.keyCode == 13) {
        enterKeyHandler(elm);
        console.log("== enter =======================================");
        return false;
    }
}

function enterKeyHandler(elm) {
    insertToCaret(elm, "↵");
}

function altEnterKeyHandler(elm) {
    insertToCaret(elm, "\n");
}

function insertToCaret(el, str) {

    var val = el.value;
    var endIndex;
    var range;
    var doc = el.ownerDocument;

    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
        endIndex = el.selectionEnd;
        el.value = val.slice(0, endIndex) + str + val.slice(endIndex);
        el.selectionStart = el.selectionEnd = endIndex + str.length;
    } else if (doc.selection != "undefined" && doc.selection.createRange) {
        el.focus();
        range = doc.selection.createRange();
        range.collapse(false);
        range.text = text;
        range.select();
    }
}
/**************************************************************
설 명 : PIP 공통 - Dialog 의 Car Info 탭의 차종 선택 이벤트 핸들링
수정일       수정자  수정내용
---------- ------ -----------
2017.9.20  허윤성  최초작성
***********************************************************************************/

carCategoryChanged = function (selection, value, isChecked) {

    console.log("carCategoryChanged ==>> Saved Value : " + selection.value + "\t Seleted Value : " + selection.getValue() + "\t isChecked : " + isChecked);
    var url = "/wsvc/template_en/pip/common/product/list.html?codeType=" + value;
    var panel = selection.findParentByType('panel');
    var selectBox = panel.findByType('selection')[1];
    selectBox.reset();
    $.getJSON(url, function (jsonData) {
        for (var i = 0; i < jsonData.length; i++)
            jsonData[i].text = jsonData[i].text + ' (' + jsonData[i].value + ')';
        selectBox.setOptions(jsonData);
    });
}

loadSelectedCarInfo = function (field, record, path) {

    var panel = field.findParentByType('panel');

    // model
    var selectBox1 = panel.findByType('selection')[1];
    var url = "/wsvc/template_en/pip/common/product/list.html?codeType=" + record.json.carCategory;

    $.getJSON(url, function (jsonData) {
        for (var i = 0; i < jsonData.length; i++)
            jsonData[i].text = jsonData[i].text + ' (' + jsonData[i].value + ')';
        selectBox1.setOptions(jsonData);
        selectBox1.setValue(record.json.carProduct);
        selectBox1.originalValue = record.json.carProduct;
    });
}

hideDisclaimerByChanged = function (field, value) {
    if (field != null) {
        var author = field.findParentByType("panel").getComponent("disclaimerAuthor");
        var admin = field.findParentByType("panel").getComponent("disclaimerAdmin");
        var groupCode = field.findParentByType("panel").getComponent("groupCode");
        if (value == 'admin') { author.hide(); admin.show(); groupCode.show(); admin.setWidth('100%'); groupCode.setWidth('100%'); }
        else {
            admin.hide(); author.show(); groupCode.hide();
        }
    }
}

hideToolTipByload = function (box, dialog) {
    console("Tooltiptype loaded ");
}


hideToolTipByChanged = function (field, value) {
    console("Tooltiptype changed ");
}

//if component is loaded, depends on disclaimerType value, disclaimer text area(author or admin) will be hidden or show.
hideDisclaimerByload = function (box, dialog) {
    var type = box.findParentByType("panel").getComponent("disclaimerType");
    var author = box.findParentByType("panel").getComponent("disclaimerAuthor");
    var admin = box.findParentByType("panel").getComponent("disclaimerAdmin");
    var groupCode = box.findParentByType("panel").getComponent("groupCode");
    if (type.getValue() == 'admin') {
        ;
        author.hide(); admin.show(); groupCode.show();
    } else {
        groupCode.hide(); admin.hide(); author.show();
    }
}

hideDisclaimerByloadNum = function (box, dialog, num) {
    var type = box.findParentByType("panel").getComponent("disclaimerType" + num);
    var author = box.findParentByType("panel").getComponent("disclaimerAuthor" + num);
    var admin = box.findParentByType("panel").getComponent("disclaimerAdmin" + num);
    var groupCode = box.findParentByType("panel").getComponent("groupCode" + num);
    if (type.getValue() == 'admin') {
        ;
        author.hide(); admin.show(); groupCode.show();
    } else {
        groupCode.hide(); admin.hide(); author.show();
    }
}

hideDisclaimerByChangedNum = function (field, value, num) {
    if (field != null) {
        var author = field.findParentByType("panel").getComponent("disclaimerAuthor" + num);
        var admin = field.findParentByType("panel").getComponent("disclaimerAdmin" + num);
        var groupCode = field.findParentByType("panel").getComponent("groupCode" + num);
        if (value == 'admin') { author.hide(); admin.show(); groupCode.show(); admin.setWidth('100%'); groupCode.setWidth('100%'); }
        else {
            admin.hide(); author.show(); groupCode.hide();
        }
    }
}



loadSelectedDisclaimer = function (field, record, path) {
    console.log("Load Disclaimer Value for Admin")
    var dialog = field.findParentByType('dialog');
    // model
    var selectBox1 = dialog.getField('./disclaimerAdmin');
    var url = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=&disclaimerType=D";
    $.getJSON(url, function (jsonData) {
        selectBox1.setOptions(jsonData);
        if (jsonData != null && jsonData.length > 0) {
            selectBox1.setValue(jsonData[0].value);
        }

    });

}
//[2019.07.08:배장환] GT : Start - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정
loadSelectedToolTip = function (field, record, path) {
    var dialog = field.findParentByType('dialog');
    // model
    var selectBox1 = dialog.getField('./tooltipAdmin');

    var url = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=&disclaimerType=T";

    //  $.getJSON(url, function(jsonData){
    //      selectBox1.setOptions(jsonData);
    //      if ( jsonData != null && jsonData.length > 0 ) {
    //        selectBox1.setValue(jsonData[0].value);
    //      }
    //  });

}
//[2019.07.08:배장환] GT : End - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정

disclaimerChanged = function (selection, value, isChecked) {
    var url = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=" + value + "&groupCode=&disclaimerType=D";
    var dialog = selection.findParentByType('dialog');
    var selectBox = dialog.getField('./disclaimerAdmin');
    selectBox.setValue(value);
    // selectBox.reset();
}

tooltipChanged = function (selection, value, isChecked) {
    var url = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=" + value + "&groupCode=&disclaimerType=T";
    var dialog = selection.findParentByType('dialog');
    var selectBox = dialog.getField('./tooltipAdmin');
    //    console.log(selectBox);
    selectBox.setValue(value);
    // selectBox.reset();
}

loadGroupCode = function (field, record, path) {
    var dialog = field.findParentByType('dialog');
    // model
    var groupCodeBox = dialog.getField('./groupCode');
    var adminBox = dialog.getField('./disclaimerAdmin');
    var groupCodeUrl = "/wsvc/template_en/pip/common/disclaimer/groupcode/list.json?disclaimerGroupCode=&disclaimerType=D";
    var adminUrl = ""
    $.getJSON(groupCodeUrl, function (jsonData) {
        groupCodeBox.setOptions(jsonData);
        groupCodeBox.setValue(jsonData[0].value);
        adminUrl = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=" + jsonData[0].value + "&disclaimerType=D";
    }).then(function () {
        $.getJSON(adminUrl, function (json) {
            adminBox.reset();
            adminBox.setOptions(json);
            if (json != null && json.length > 0) {
                adminBox.setValue(json[0].value);
            }
        });
    });

}


loadGroupCodeToolTip = function (field, record, path) {
    var dialog = field.findParentByType('dialog');
    // model
    var groupCodeBox = dialog.getField('./tooltipGroupCode');
    var adminBox = dialog.getField('./tooltipAdmin');
    var groupCodeUrl = "/wsvc/template_en/pip/common/disclaimer/groupcode/list.json?disclaimerGroupCode=&disclaimerType=T";
    var adminUrl = ""
    //[2019.07.08:배장환] GT : Start - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정
    var tooltipAdminData = record.data.tooltipAdmin;
    var tooltipGroupCodeData = record.data.tooltipGroupCode;
    //[2019.07.08:배장환] GT : End - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정

    $.getJSON(groupCodeUrl, function (jsonData) {
        groupCodeBox.setOptions(jsonData);
        //[2019.07.08:배장환] GT : Start - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정
        if (tooltipGroupCodeData == null || tooltipGroupCodeData == "") {
            groupCodeBox.setValue(jsonData[0].value);
            tooltipGroupCodeData = jsonData[0].value;
        } else {
            groupCodeBox.setValue(tooltipGroupCodeData);
        }
        //[2019.07.08:배장환] GT : End - Tooltip dialog 활성화 시 초기값 전체 데이터가 나오는 오류 수정
        adminUrl = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=" + tooltipGroupCodeData + "&disclaimerType=T";
    }).done(function () {
        $.getJSON(adminUrl, function (json) {
            adminBox.reset();
            //            console.log(json);
            //            console.log("Value:" + json[0].value);
            if (json.length > 0) {
                adminBox.setOptions(json);
                if (tooltipAdminData == null || tooltipAdminData == "") {
                    adminBox.setValue(json[0].value);
                } else {
                    adminBox.setValue(tooltipAdminData);
                }
            }
        });
    });

}

groupCodeChangedToolTip = function (selection, value, isChecked) {
    //var url = "/hyundai/template_en/pip/common/disclaimer/groupcode/list.json?disclaimerGroupCode="+value ;
    var dialog = selection.findParentByType('dialog');
    var selectBox = dialog.getField('./tooltipGroupCode');
    selectBox.setValue(value);
    adminUrl = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=" + value + "&disclaimerType=T";
    var adminBox = dialog.getField('./tooltipAdmin');
    $.getJSON(adminUrl, function (json) {
        adminBox.reset();
        //        console.log("Value:" + json[0].value);
        if (json.length > 0) {
            adminBox.setOptions(json);
            adminBox.setValue(json[0].value);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); });
    // selectBox.reset();
}

groupCodeChanged = function (selection, value, isChecked) {

    console.log("groupCodeChanged ==>> Saved Value : " + selection.value + "\t Seleted Value : " + selection.getValue() + "\t isChecked : " + isChecked);
    //var url = "/wsvc/template_en/pip/common/disclaimer/groupcode/list.json?disclaimerGroupCode="+value ;
    var dialog = selection.findParentByType('dialog');
    var selectBox = dialog.getField('./groupCode');
    selectBox.setValue(value);
    adminUrl = "/wsvc/template_en/pip/common/disclaimer/list.json?disclaimerSeq=&groupCode=" + value + "&disclaimerType=D";
    var adminBox = dialog.getField('./disclaimerAdmin');
    $.getJSON(adminUrl, function (json) {
        adminBox.reset();
        if (json.length > 0) {
            adminBox.setOptions(json);
            adminBox.setValue(json[0].value);
        }
    }).fail(function (jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); });
    // selectBox.reset();
}
/**
  * @typedef {object} el
  * @description More-Button control program of scroll-box
  * @deprecated
  */
var scrollboxMoreBtnCtr = function (el) {
    this.$el = $(el);
    this.$boxInner = $(el).find(".boxInner");
    this.$moreBtn = $(el).find(".btnMore");
    this.scope = "scrollbox";
    this.elMinHeight = 140;
    this.elHeight;

    this.init();
}
/**
  * @description initialize
  */
scrollboxMoreBtnCtr.prototype.init = function () {
    this.setElHeight();
    this.doStruct();
    this.bindEvent();
}
/**
  * @description restart
  */
scrollboxMoreBtnCtr.prototype.restart = function () {
    this.destory();
    this.setElHeight();
    this.doStruct();
    this.bindEvent();
}
/**
  * @description Create a framework[scrollboxMoreBtnCtr]
  */
scrollboxMoreBtnCtr.prototype.doStruct = function () {
    if (this.elHeight > this.elMinHeight)
        this.dipDoMore();
    else
        this.dipDontMore();
}
/**
  * @description set boxInner max-height
  */
scrollboxMoreBtnCtr.prototype.setElHeight = function () {
    this.elHeight = this.$boxInner.css({ "height": "auto", "visibility": "hidden" }).outerHeight();
}
scrollboxMoreBtnCtr.prototype.dipDoMore = function () {
    this.$moreBtn.css("display", "block");
    this.$boxInner.css({ "height": this.elMinHeight, "visibility": "visible" });
}
scrollboxMoreBtnCtr.prototype.dipDontMore = function () {
    this.$moreBtn.css("display", "none");
    this.$boxInner.css({ "height": "auto", "visibility": "visible" });
}
/**
  * @description bind event
  */
scrollboxMoreBtnCtr.prototype.bindEvent = function () {
    /* more click-event */
    this.$moreBtn.unbind("click." + this.scope).bind("click." + this.scope, function () {
        var
            boxInnerHeight = this.$el.hasClass("auto") ? this.elMinHeight : this.elHeight;

        /*
        this.$boxInner.animate({"height":boxInnerHeight}, 500, function () {
            this.$el.toggleClass("auto");
            this.$moreBtn.toggleClass("closed");
        }.bind(this));
        */
        this.$boxInner.attr("style", "height :" + boxInnerHeight + "px !important");
        setTimeout(function () {
            this.$el.toggleClass("auto");
            this.$moreBtn.toggleClass("closed");
        }.bind(this), 500)

    }.bind(this));
}
/**
  * @description destory
  */
scrollboxMoreBtnCtr.prototype.destory = function () {
    this.resetStruct();
    this.$moreBtn.unbind("click." + this.scope);
    $(window).unbind("resize." + this.scope);
}
/**
  * @description Re-create a framework[scrollboxMoreBtnCtr]
  */
scrollboxMoreBtnCtr.prototype.resetStruct = function () {
    this.elHeight = undefined;
    this.$el.removeClass("auto");
    this.$boxInner.removeAttr("style");
    this.$moreBtn.removeClass("closed")
}



$(document).ready(function () {

    $('.homeSlider').owlCarousel({

        loop: true,
        margin: 10,
        nav: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {

                items: 1
            },
            1000: {
                items: 1
            }
        }
    })



    $('.newSliderBottom').owlCarousel({

        loop: true,
        margin: 20,
        nav: false,
        autoplay: true,
        responsive: {
            0: {
                items: 1
            },
            600: {

                items: 2
            },
            1000: {
                items: 4
            }
        }
    })



    // $("#demo").vc3dEye({
    //     imagePath: "assets/vrImages/",
    //     totalImages: 51,
    //     imageExtension: "png"
    // });




    // $('.tabList li').removeClass('on');
    //
    // $('.tabList   li:first').addClass('on');
    //
    // $('.tabList  li').click(function () {
    //
    //     $('.tabList li').removeClass('on');
    //     $(this).addClass('on');
    //
    // })


    $('.myOwlColor').owlCarousel({
        loop: false,
        margin: 5,
        nav: false,
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 5
            },
            1000: {
                items: 8
            },
        }
    })


    $('.maintanceSlider').owlCarousel({
        loop: true,
        margin: 20,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1

            }
        }
    })



    $('.myOwlColor .owl-item:first button').addClass('ons')


    $('.myOwlColor .owl-item button').click(function () {

        $('.myOwlColor .owl-item button').removeClass('ons')

        $(this).addClass('ons')

    })

    $('.myOwlDisc').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        responsive: {
            0: {
                items: 4
            },
            600: {
                items: 8
            },
            1000: {
                items: 8
            }
        }
    })


    $('.myOwlDisc .owl-item:first button').addClass('ons')


    $('.myOwlDisc .owl-item button').click(function () {

        $('.myOwlDisc .owl-item button').removeClass('ons')

        $(this).addClass('ons')

    })




    $('.panoLoadingStart').click(function () {

        $(this).remove();

    })


    $('.btnAgreeMore').click(function () {

        $('.scrollBox .boxInner').toggleClass('autoHeight')

    })



    function resize() {

        var footer_height = $('footer').height(),

            header_height = $('nav').height(),
            plus_height = footer_height + header_height,
            window_height = $(window).height(),
            body_height = $('body').height(),
            new_height = window_height - plus_height;

        if ($('.contentWrap').height() < window_height) {
            $('.contentWrap').css({
                'min-height': new_height + 200

            })
        }


        // console.log(window_height)


        // console.log(body_height)








    }

    resize()


})




