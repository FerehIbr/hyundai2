/*
	PSCO : Seat Color
*/

;(function ( $, responsive ) {
	
	
	$(document).ready(function(){

		var componentClass = ".psco";
		var responsiveType = $('body').hasClass('pc') ? "L" :  $('body').hasClass('tablet') ? "M" : "S"; /* 180423 */

		if($(componentClass).length){

			//check if this component is affected from same js file.
			$(componentClass).each(function(){
				var t = $(this);
				if(t.data("componentjsloaded") == "true"){
					return;
				} else {
					var t = $(this);

					var slideClass = ".tailored_sort_Wrap";

					// Responsive L:PC, M:Tablet, S:Mobile
					responsive.addListener('resize-width', function (e) {
						responsiveType = e.responsiveType;
						/* 180423 start */
						t.find(slideClass).ixSlideMax( "clear" );
						t.find(slideClass).ixSlideMax({"view-length":viewLength(), "paging":true});
						t.find(slideClass).ixSlideMax( "resize" );
						/* 180423 end */
						
						if ( e.responsiveType === 'S' ) {
							t.find(slideClass).ixSlideMax( "clear" );
							t.find(slideClass).ixSlideMax({"view-length":6});
							t.find(slideClass).ixSlideMax( "resize" );
						} else {
							t.find(slideClass).ixSlideMax( "clear" );
							t.find(slideClass).ixSlideMax({"view-length":8, "paging":true});
							t.find(slideClass).ixSlideMax( "resize" );
						}
					});

					t.find(".section1 .car img").css("display","none");
					t.find(".section1 .car img").eq(0).css("display","block");

					//call custom function
					showColorName($('.ix-list-items .on'));
					
					// Seat Color List Slider
					t.find(".tailored_sort_Wrap").on('ixSlideMax:init', function(){
						//init state
						$(window).on("resize",function(){
							t.find(".tailored_sort_Wrap").ixSlideMax("resize");
						});
					/* 180423 start */
					}).ixSlideMax({
						'view-length' : viewLength(),
						'loop' : false,
						'paging': true
					});
					/* 180423 end */

					/* 180423 start */
					function viewLength() {
						var wrapper = t.find('.tailored_sort_Wrap');
						var wrapperWidth = wrapper.width();
						var items = wrapper.find('.ix-list-item');
						var itemsWidth = items.outerWidth();
						var itemSize = items.length;
						var view = parseInt(wrapperWidth / itemsWidth);
						return itemSize >= view ? view : itemSize;
					}
					/* 180423 end */
					
					t.find(".tailored_sort_Wrap").on( 'ixSlideMax:change', function(e) {
						//console.log( 'index:' + e.currentIndex, ' total:' + e.totalLength );
						$(this).ixSlideMax("resize");
					});

					t.find(".ix-list-item").on("click",function(){
						var idx = $(this).index();
						$(this).addClass("on").siblings().removeClass("on");
						$(this).closest(componentClass).find(".details .detail .info").removeClass("active");
						$(this).closest(componentClass).find(".section1 .car img").eq(idx).show().siblings().hide();
						$(this).closest(componentClass).find(".details .detailWrap").eq(idx).show().siblings().hide();
						
						showColorName($(this)); //call custom function
						$(".psco .option2").show();
						$(".detailWrap").each(function(){
							if($(this).is(":visible")){								
								if($(this).find("li").html()==null){
									$(".psco .option2").hide();
								}else{
									$(".psco .option2").show();
								}
							}
						});
						
						// [2019.11.26:정인혁] GT : START - Adobe Analytics 생성
						var color = $(this).data("colorName");
						var texture = "";
						var texture_group = $(this).closest(componentClass).find(".details .detailWrap").eq(idx).find(".color_detail");
						
						texture_group.each(function(index) {
							texture += $(this).find("#sColro1").text();
							if (index != texture_group.length -1) {
								texture += ",";
							}
						})
						
				        _trackEvent(
				            $.extend(_dl,{
				                interior_seat_color : color,
				                interior_seat_material : texture,
				                page_event : {
				                    content_view_interior : true,
				                }
				            })
				        );
					});

					$(".psco .details .detail .trigger").bind("click", function(){
						$(this).closest(componentClass).find(".details .detail .info").removeClass("active");
						$(this).closest("li").find(".info").addClass("active");
					});

					$(".psco .details .detail .info .close").bind("click", function(){
						$(this).closest(".info").removeClass("active");
					});

					$(window).resize(function(){
						$(componentClass).find(".tailored_sort_Wrap").ixSlideMax("resize");
					});
					t.find(".tailored_sort_Wrap").find(".ix-list-item.on").eq(0).trigger("click");

					// set js file loaded state on component
					t.data("componentjsloaded","true");
				}

			});
		}

		// 2018.10.23 seat color add
		$('.psco .btnChoiceColor').click(function(){
			var pscoBtnIdx = $(this).parent().index(),
			pscoItem = $('.details .detailWrap').eq(pscoBtnIdx).show().find('.detailWrapBg'),
			pscoImgWid = pscoItem.width(), pscoImgHgt = pscoItem.height();
			$('.details .detailWrap').eq(pscoBtnIdx).find('.detail').css({'width':pscoImgWid, 'height':pscoImgHgt});
		});
		setTimeout(function(){
			$('.psco .ix-list-item.on .btnChoiceColor').trigger('click');
		}, 10);
	});
	
	//custom function
	function showColorName($element){
		if($element.hasClass("on")){
			var colorName = $element.data("colorName");
			$("#seatColors .colorName").text(colorName);
		}
	}
})( jQuery, hmc.responsive );