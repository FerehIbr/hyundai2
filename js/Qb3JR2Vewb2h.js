// [2019.11.04 : 전영우] GT : Start - GA 를 위한 GTM 코드 위치 변경
var _dl = {}; // _dl은 adobe dtm을 위한 data layer

var dataLayer = [];// google dtm을 위한 data layer

var path = location.pathname;
var path2 = path.split('/');
var page = [];
var pageType;
var pageTemplate = "";
var pageUrl = location.href;

var useGTM = true;
var HMC_DATA_COUNTRY; //sitename, country code
var HMC_DATA_LANGUAGE; // language
var HMC_DATA_1DEPTH; // category 1depth
var HMC_DATA_2DEPTH; // category 2depth
var HMC_DATA_3DEPTH; // category 3depth
var HMC_DATA_PAGENAME; //page name
var HMC_DATA_DEVICE; // device type (PC/Mobile)
var HMC_DATA_GID; // client id (_ga cookie value)
var HMC_DATA_ISLOGIN = ''; // Login status

var HMC_DATA_VEHICLE_TYPE; // vehicle type (commercial/suv&mpv/car)
var HMC_DATA_VEHICLE_NAME; // vehicle name
var HMC_DATA_VEHICLE_CODE; // vehicle code(product code)
var HMC_DATA_SEARCH_RESULT;
HMC_DATA_DEVICE = '';
HMC_DATA_VEHICLE_TYPE = '';
HMC_DATA_VEHICLE_NAME = '';
HMC_DATA_VEHICLE_CODE = '';
HMC_DATA_SEARCH_RESULT = '';

$(document).ready(function () {
    if (path.indexOf('content/hyundai') > -1) {
        for (var i = 4; i < path2.length; i++) {
            if (i == 4) {
                page[0] = 'main';
            } else {
                page[i - 5] = path2[i].replace('.html', '');
            }
        }
    } else {
        for (var i = 2; i < path2.length; i++) {
            if (i == 2) {
                page[0] = 'main';
            } else {
                page[i - 3] = path2[i].replace('.html', '');
            }
        }
    }

    if ($('body').hasClass('pc')) {
        pageType = 'pc';
    } else if ($('body').hasClass('tablet')) {
        pageType = 'tablet';
    } else {
        pageType = 'mobile';
    }

    // [2018.11.23:전영우] GT : Start - Adobe Analytics 수정
    _dl = {
        page_name: page,
        page_type: pageType,
        page_template: pageTemplate,
        page_url: pageUrl,
    }

    _trackEvent = function (obj) {
        console.log(JSON.stringify(obj));
    }

    _trackEvent(
        $.extend(_dl, {
            page_event: {
                tab_views: false,
            }
        })
    );
    // [2018.11.23:전영우] GT : End - Adobe Analytics 수정

    // [2019.11.26:정인혁] GT : Start - 조건부 Data Layer log 출력
    // _traceDataLayer = function() {
    // 	// console log when DTM Switch Staging 'ON'
    // 	if (_satellite.settings.isStaging) {
    // 		console.log(_dl);
    // 	}
    // }
    // [2019.11.26:정인혁] GT : END

    /* google tag implementation */

    HMC_DATA_COUNTRY = window.hmc.COUNTRY;
    HMC_DATA_LANGUAGE = window.hmc.LANGUAGE;
    var contentPath = $(location).attr('pathname');
    if (contentPath.indexOf('/content/hyundai') != -1) {
        contentPath = contentPath.replace('/content/hyundai/', '').replace('.html', '').split('/');
    } else {
        contentPath = contentPath.substring(1, contentPath.length).replace('.html', '').split('/');
    }
    /* 2019.10.25 구버전브라우져실행가능하게 수정 wonhee.choi s */
    HMC_DATA_1DEPTH = contentPath.slice(2, 3).join(":");
    HMC_DATA_2DEPTH = contentPath.slice(2, 4).join(":");
    HMC_DATA_3DEPTH = contentPath.slice(2, 5).join(":");
    HMC_DATA_PAGENAME = (HMC_DATA_1DEPTH == '') ? "main" : contentPath.slice(2).join(":");
    /* 2019.10.25 구버전브라우져실행가능하게 수정 wonhee.choi e */
    if (contentPath.indexOf('find-a-car') != -1) {
        HMC_DATA_VEHICLE_NAME = $('.titleWrap .tit').text().toLowerCase();
        HMC_DATA_VEHICLE_CODE = contentPath[3];

        $('ul.tabAllSlist li.item a').each(function () {
            var urltemp = $(this).attr('href').split('/');
            var car = urltemp[urltemp.length - 1].replace('.html', '');
            if (car == HMC_DATA_VEHICLE_CODE) {
                HMC_DATA_VEHICLE_TYPE = $(this).closest('ul.tabAllSlist').prev().text().toLowerCase();
            }
        });
    }

    HMC_DATA_GID = document.cookie.match(/(_ga=GA1.)[1-2]{1}[.][0-9]{1,10}?[.][0-9]{1,20}/g)[0].replace("_ga=GA1.1.", '').replace("_ga=GA1.2.", '');

    dataLayer.push({
        'HMC_DATA_COUNTRY': HMC_DATA_COUNTRY,
        'HMC_DATA_LANGUAGE': HMC_DATA_LANGUAGE,
        'HMC_DATA_1DEPTH': HMC_DATA_1DEPTH,
        'HMC_DATA_2DEPTH': HMC_DATA_2DEPTH,
        'HMC_DATA_3DEPTH': HMC_DATA_3DEPTH,
        'HMC_DATA_PAGENAME': HMC_DATA_PAGENAME,
        'HMC_DATA_VEHICLE_TYPE': HMC_DATA_VEHICLE_TYPE,
        'HMC_DATA_VEHICLE_NAME': HMC_DATA_VEHICLE_NAME,
        'HMC_DATA_VEHICLE_CODE': HMC_DATA_VEHICLE_CODE,
        'HMC_DATA_DEVICE': HMC_DATA_DEVICE,
        'HMC_DATA_GID': HMC_DATA_GID,
        'HMC_DATA_ISLOGIN': HMC_DATA_ISLOGIN,
        'HMC_DATA_SEARCH_RESULT': HMC_DATA_SEARCH_RESULT
    });

    (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' }); var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-PXVRR9L');
});