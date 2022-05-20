/*
	[PKVN] PIP Text Headline
	used : jquery, tooltipster
*/
//[2018.09.10:전영우] GT : Start - Component 별 Script 호출 집중화

;(function ( $ ) {

    // component slider class or id
    var pkvn_slideComponentClass = "div.parbase.key-visual-normal .sliderWrap.pkvn";
    
    // pager 갯수 채크 : 1개 이하 일 때  prev, next, pager 숨김
    function pkvn_ixSlider_pagerCountControl(){
        var countSlideItems =$(pkvn_slideComponentClass + " .ix-btn").length;
        if(countSlideItems <= 1){
            $(pkvn_slideComponentClass + " .ix-btn-prev").hide();
            $(pkvn_slideComponentClass + " .ix-btn-next").hide();
            $(pkvn_slideComponentClass + " .ix-btn").hide();
            $(pkvn_slideComponentClass + " .slide_control").hide();
        } else {
            $(pkvn_slideComponentClass + " .ix-btn-prev").show();
            $(pkvn_slideComponentClass + " .ix-btn-next").show();
            $(pkvn_slideComponentClass + " .ix-btn").show();
            $(pkvn_slideComponentClass + " .slide_control").show();
        }
    }
    
    // data=tabindexon : ix slider 내 포커스될 아이템들의 tabindex 관리
    function pkvn_ixSlider_focusItem_tabindexSwitcher(){
        // tabindexon data가 true인 tabindex="-1"을 tabindex="0"으로 바꿈
        $(pkvn_slideComponentClass + ' .ix-list-items .ix-list-item[aria-hidden="true"] [data-tabindexon="true"]').attr("tabindex","-1");
        $(pkvn_slideComponentClass + ' .ix-list-items .ix-list-item[aria-hidden="false"]').each(function(){
            //console.log("*data-tabindexon len : " + $(this).find("[data-tabindexon='true']").length);
            $(this).find("[data-tabindexon='true']").attr("tabindex","0");
        });
    }
    
    // auto slide button control : on
    function pkvn_autoSlideBtnOn($pkvn_slide){
        $pkvn_slide.ixSlideMax("startTimer");
        $(pkvn_slideComponentClass + " .slide_control .btnStop").show();
        $(pkvn_slideComponentClass + " .slide_control .btnPlay").hide();
    }
    
    // auto slide button control : off
    function pkvn_autoSlideBtnOff($pkvn_slide){
        $pkvn_slide.ixSlideMax("stopTimer");
        $(pkvn_slideComponentClass + " .slide_control .btnStop").hide();
        $(pkvn_slideComponentClass + " .slide_control .btnPlay").show();
    }
    
    // Video Cover(Dimmed), Default Image, PlayButton : On
    function pkvn_html5VideoCoverUIOn(t, pause){
        var targetHtml5VideoContainer = $(t).find("video");
        var html5Dim = $(t).find(".videoInnerDimm");
        var html5DefaultImg = $(t).find(".videoPoster");
        var playBtn = $(t).find(".videoPlayBtn");
        
        if(!pause){
            targetHtml5VideoContainer.css("visibility", "hidden");
            html5Dim.fadeIn();
            html5DefaultImg.css("visibility", "visible");
            playBtn.fadeIn();
        } else {
            playBtn.stop(true,true).show().fadeOut(800);
        }
        
    }
    
    // Video Cover(Dimmed), Default Image, PlayButton : Off
    function pkvn_html5VideoCoverUIOff(t, pause){
        var targetHtml5VideoContainer = $(t).find("video");
        var html5Dim = $(t).find(".videoInnerDimm");
        var html5DefaultImg = $(t).find(".videoPoster");
        var playBtn = $(t).find(".videoPlayBtn");
        
        if(!pause){
            targetHtml5VideoContainer.css("visibility", "visible");
            html5Dim.fadeOut();
            html5DefaultImg.css("visibility", "hidden");
            playBtn.fadeOut();
        } else {
            targetHtml5VideoContainer.css("visibility", "visible");
            html5Dim.fadeOut();
            html5DefaultImg.css("visibility", "hidden");
            playBtn.stop(true,true).show().fadeOut(800);
        }
    }
	
	$(document).ready(function(){
		// init
		
		// Setting
		// when videoAutoStop variable is true, if video is started, function of auto rolling will be stoped.
		var pkvn_videoAutoStop = true;
		
		// slideState : play, stop, playvideo, stopvideo,
		var pkvn_slideState  = "play";
		
		// var pkvn_slideComponentClass = ".sliderWrap.pkvn";
		
		
		// IX Slider
		var $pkvn_slide = $(pkvn_slideComponentClass).on('ixSlideMax:init', function(){
			
			// ix-slider autorolling and loop bug fix
			// tooltipster on		
			$(pkvn_slideComponentClass + " .ix-clone").find(".ic_Bquestion").tooltipster({
				trigger: 'click',
				side: ['top', 'left', 'right', 'bottom'],
				functionBefore: function(instance, helper){
					var $origin = $(helper.origin);
					$origin.addClass("on");
				},
				functionAfter: function(instance, helper){
					var $origin = $(helper.origin);
					$origin.removeClass("on");
				}
			});
			
			// data=tabindexon : ix slider 내 포커스될 아이템들의 tabindex 관리
			pkvn_ixSlider_focusItem_tabindexSwitcher();
			
			pkvn_ixSlider_pagerCountControl();

		}).ixSlideMax();
		
		$( window ).on( 'resize', function() {
			$pkvn_slide.ixSlideMax( 'resize' );
		});
		
		// Slider 가 바뀌기 전에 호출
		$(pkvn_slideComponentClass).on('ixSlideMax:slideStart', function(){
			// ix Slider slide start
			
			// close tooltip when sliding is started
			$(pkvn_slideComponentClass + " .ic_Bquestion.on").tooltipster("close");
			
			// stop html5 video when sliding is started
			var slideIndex = $(pkvn_slideComponentClass).ixSlideMax( "getCurrentIndex" );
			var slideHtml5Video = $(pkvn_slideComponentClass + " .ix-list-item").eq(slideIndex).find(".html5Video");
			var slideVideo =  $(slideHtml5Video).find("video").get(0);
			
			// 이전 슬라이드가 html5 비디오가 있을 때
			if(slideVideo){
				if(pkvn_slideState === "playvideo"){
					slideVideo.pause();
					
					// show video cover & default image & play button
					pkvn_html5VideoCoverUIOn(slideHtml5Video);
					
					pkvn_slideState = "play";
					
					// auto rolling on going
					pkvn_autoSlideBtnOn($pkvn_slide);
					
				} else if(pkvn_slideState  === "stopvideo") {
				    pkvn_slideState = "stop";
					
					// auto rolling stop
					pkvn_autoSlideBtnOff($pkvn_slide);
				} else {
					// auto rolling stop
				    pkvn_html5VideoCoverUIOn(slideHtml5Video);
				}
			}
			
		});
		
		// ix-slider event : after slider changed
		$(pkvn_slideComponentClass).on('ixSlideMax:change', function(){			
			// data=tabindexon : ix slider 내 포커스될 아이템들의 tabindex 관리
			pkvn_ixSlider_focusItem_tabindexSwitcher();
		});
		
		// Auto Slide Button : Off
		$(pkvn_slideComponentClass + " .slide_control .btnStop").on("click", function(){
		    pkvn_autoSlideBtnOff($pkvn_slide);

		    pkvn_slideState  = "stop";
		});
		
		// Auto Slide Button : On
		$(pkvn_slideComponentClass + " .slide_control .btnPlay").on("click", function(){
		    pkvn_autoSlideBtnOn($pkvn_slide);

		    pkvn_slideState  = "play";
		});
		
		// Html5VideoControl
		var pkvn_videoWrap = pkvn_slideComponentClass + " .html5Video";
		if($(pkvn_videoWrap).length > 0)
		{

            // [2018.09.10:전영우] GT : Start - Component 중복시 문제점 수정
            $(pkvn_videoWrap).each(function(index) {
            // Video Container click & tab
            //$(document).on("click tab", videoWrap, function(){
                $(this).off("click tab").on("click tab", function(){
				
    				var targetHtml5Video = $(this).find("video").get(0);
    				
    				// 비디오 종료 시
    				$(targetHtml5Video).on("ended",function(){
    					
    					var targetHtml5VideoWrap = $(this).closest(".html5Video");
    					$(this).currentTime = 0;
    					
    					// cover on
    					pkvn_html5VideoCoverUIOn(targetHtml5VideoWrap);
    					
    					// 비디오 자동 멈춤 기능이 켜져 있을 때
    					if(pkvn_videoAutoStop){
    						
    						// 슬라이드 자동 롤링 중이면서 비디오가 재생 중일 때
    						if(pkvn_slideState === "playvideo"){
    						    pkvn_slideState = "play";
    							
    							setTimeout(function(){$pkvn_slide.ixSlideMax("next");},2500);
    							pkvn_autoSlideBtnOn($pkvn_slide);
    							
    						} else if(pkvn_slideState === "stopvideo"){
    						
    							// 슬라이드 자동 롤링 중이 아니면서 비디오가 재생 중일 때
    						    pkvn_slideState = "stop";
    						}
    					}
    					
    				});
    				
    				// 비디오 클릭 시. 비디오가 멈춤 상태 또는 종료 상태 일 경우
    				if (targetHtml5Video.paused || targetHtml5Video.ended) {
    									
    					// cover off
    					if(targetHtml5Video.paused){
    					    pkvn_html5VideoCoverUIOff(this,true);
    					} else {
    					    pkvn_html5VideoCoverUIOff(this);
    					}
    					
    					targetHtml5Video.play();
    				    
                        // [2018.09.10:전영우] GT : Start - Video Click 시 Analytics Server에 내용 호출
                        // [2018.09.10:전영우] GT : Start - Component 중복시 문제점 수정
                        var videoName = $(this).find(".videoPoster").find("img").attr("alt");
                        
                        _trackEvent(
                                $.extend(_dl,{
                                    video_name : videoName, // video play 하는 경우의 video 이름
                                    page_event : {
                                        video_play : true, // 비디오 재생시
                                    }
                                })
                        );
                        // [2018.09.10:전영우] GT : End - Component 중복시 문제점 수정
                        // [2018.09.10:전영우] GT : End - Video Click 시 Analytics Server에 내용 호출
    
    					// Auto Banner Rolling Stop
    					if(pkvn_videoAutoStop){
    						if(pkvn_slideState === "play"){
    							
    						    pkvn_autoSlideBtnOff($pkvn_slide);
    						    pkvn_slideState = "playvideo";
    							
    						} else if(pkvn_slideState === "stop") {
    						    pkvn_slideState = "stopvideo";
    						}
    					}
    					
    				} else {
    					// 비디오 클릭 시. 비디오가 재생 중 일 경우
    					// cover on
    				    pkvn_html5VideoCoverUIOn(this,true);
    					targetHtml5Video.pause();
    				}
    			});
            });
		}
		
		$(document).on("keyup", pkvn_slideComponentClass + " .visual", function(e){
			var targetBtn = e.currentTarget;
			
			//var keyCode = e.keyCode || e.which;//키보드 코드값  
			// Enter 키 번호 13
			if (e.keyCode == '13' || e.keyCode == '32') {
				if($(targetBtn).hasClass("html5Video")){
					
					// html5 video
					$(targetBtn).trigger("click");
					
				}
			}
			
		});
		
	});

})( jQuery );

//[2018.09.10:전영우] GT : End - Component 별 Script 호출 집중화