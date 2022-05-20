/*
	SHNO : SPA Home News
*/

;(function ( $ ) {
	
	$(document).ready(function(){
		// init
		if($(".secShnoWrap").length > 0){

			var slideComponentClass = ".secShnoWrap .txtSlideWrap";
            var slideWrap = $(slideComponentClass);
			slideWrap.on('ixSlideMax:init', function(){
				ixSlider_pagerCountControl(this);
			}).ixSlideMax();

			$(window).resize(function(){
				$( '.secShnoWrap .txtSlideWrap' ).ixSlideMax( "resize" );
			});

		}
	});

    // pager 갯수 채크 : 1개 이하 일 때  prev, next, pager 숨김
    function ixSlider_pagerCountControl(t){
        var countSlideItems = $(t).find(".ix-btn").length;
        if(countSlideItems <= 1){
            $(t).find(".ix-controller").hide();
        } else {
            $(t).find(".ix-controller").show();
        }
    }
})( jQuery );