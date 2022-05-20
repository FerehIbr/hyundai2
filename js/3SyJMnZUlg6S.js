// addLoadEvent(function(){
// 	if (!_isMobile()) {
// 	//	$(".layerPop.share ul.shareList").append('<li class="btnPinterest"><a href="http://www.pinterest.com/pin/create/button/" type="pinterest" onClick="_satellite.trackEvent(\'pageshare\',\'pinterest\')" ></a></li>');
// 	}

// 	$(document).on('click',".shareList li a",function(e) {
// 		e.preventDefault();
// 		if ($(this).attr("href")) {
// 			//var pageUrl = $('#canonical-setting-value').attr('href');
// 			var pageUrl = window.location.href;
// 			if(pageUrl.indexOf("#")>-1){
// 				pageUrl = pageUrl.substring(0,pageUrl.indexOf("#"));
// 			}
// 			var pageTitle = document.title;
// 			var pageDesc = $('meta[name=description]').prop('content');
// 			var pageImage = typeof $('meta[itemprop=image]').prop('content') != 'undefined' ? $('meta[itemprop=image]').prop('content') : "";

// 			var snsUrl = $(this).attr("href");
// 			var snsType = $(this).attr("type");

//             //[2019.05.29:전영우] GT : START - pageshare  사용하도록 변경
//             _trackEvent(
//                 $.extend(_dl,{
//                     social_type : snsType, // Social Share의 경우, Social 채널 이름
//                     page_event : {
//                         social_shares : true, // Social Share를 하는 경우
//                     }
//                 })
//             );
//             //[2019.05.29:전영우] GT : End - pageshare  사용하도록 변경

// 			if (snsType == 'facebook') {
// 				snsUrl = snsUrl + "?u=" + encodeURIComponent(pageUrl) + "&t=" + encodeURIComponent(pageTitle)+ "&description=" + encodeURIComponent(pageDesc);
// 			} else if (snsType == 'twitter') {
// 				snsUrl = snsUrl + "?status=" + encodeURIComponent(pageDesc) + " " + encodeURIComponent(pageUrl);
// 			} else if (snsType == 'google') {
// 				snsUrl = snsUrl + "?url=" + encodeURIComponent(pageUrl) + "&t=" + encodeURIComponent(pageDesc);
// 			} else if (snsType == 'pinterest') {
// 				snsUrl = snsUrl + "?url=" + encodeURIComponent(pageUrl) + "&description=" + encodeURIComponent(pageDesc) + "&media=" + encodeURIComponent(pageImage);
// 			}

// 			window.open(snsUrl, "snspop","width=800, height=500");
// 		}
// 	});    	 
// });