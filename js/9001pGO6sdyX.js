/*
	SPA : more button
*/

;(function ( $ ) {
	"use strict";
	
	$(document).ready(function(){
		// init
		// Start : 180824 add
		var agreeBoxItem = $('.scrollBox .boxInner'),
		agreeBoxHeight = $('.scrollBox .boxInner').outerHeight(),
		agreeBoxMH = parseInt($('.scrollBox .boxInner').css('min-height')),
		agreeMoreBtn = $('.scrollBox .btnMore');
		if (agreeBoxHeight < agreeBoxMH+1) {
			agreeMoreBtn.hide();
		} else {
			agreeBoxItem.css('height', agreeBoxMH);
			agreeMoreBtn.show();
		}
		// End : 180824 add

		$(".scrollBox").each(function() {
			!$(this).data('scrollboxMoreBtnCtr') ? $(this).data('scrollboxMoreBtnCtr', new scrollboxMoreBtnCtr(this)) : $(this).data('scrollboxMoreBtnCtr').restart();
		})
		
		/*
		$(".btnMore").off("click");
		$(".btnMore").on("click", function(){
			$(this).closest(".scrollBox").toggleClass("auto");
			$(this).toggleClass("closed");
		});
		*/
	});
})( jQuery);