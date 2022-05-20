/*
	component : tooltip
*/

	
	
	var tooltipParam = {
			trigger: 'custom',
			triggerClose: {
					click: true
			},
			interactive: true,
			side: ['top', 'left', 'right', 'bottom'],
			functionBefore: function(instance, helper){
				var $origin = $(helper.origin);
				$origin.addClass("on");
			},
			functionAfter: function(instance, helper){
				var $origin = $(helper.origin);
				$origin.removeClass("on");
			}
		};
	
	$(document).ready(function(){
		
		// 동적인 Element 가 모두 그려진 이후에 아래 코드를 실행(copy & paste) 
		//$(".ic_Bquestion").tooltipster(tooltipParam);

		var openedTooltip;
		$(document).on("click",".ic_Bquestion",function(t){
			$(this).tooltipster('open');
			openedTooltip = $(this);
		});

		$(document).on("click",".tooltipster-box .btnClose",function(t){
			$(openedTooltip).tooltipster('close');
		});

		
		
	});

