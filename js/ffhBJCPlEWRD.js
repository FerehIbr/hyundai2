function mapInit( mapId , myLatLng , zoomLevel  ) {
	var myOptions = {
            zoom:  zoomLevel ,
            center: myLatLng ,
            disableDefaultUI: true,
            panControl: false,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            zoomControl: true,
            zoomControlOptions: {
            	style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            scaleControl: false,
            overviewMapControl: false,
            gestureHandling: 'cooperative' , 
            mapTypeId: google.maps.MapTypeId.ROADMAP
            /*
            ROADMAP - 일반적인 Google의 기본 2D 타일을 표시합니다.
            SATELLITE - 사진 타일을 표시합니다.
            HYBRID - 사진 타일과 도로, 도시 이름 등 주요 지형지물을 담고 있는 타일 레이어를 조합하여 표시합니다.
            TERRAIN - 고도 및 수경(산, 강 등)을 표시하기 위한 물리적 기복 타일을 표시합니다.
          */
        };
	mapObject = new google.maps.Map( document.getElementById( mapId ),myOptions );
	
}

function successCallback(pos){
 	mapLatitude = pos.coords.latitude ;     // 위도
 	mapLongitude = pos.coords.longitude ; // 경도
 	 
 	myLatLng = new google.maps.LatLng( mapLatitude , mapLongitude );
 	mapInit( googleMapId , myLatLng , zoomLevel ) ; 

	searchLat = mapLatitude ; 
	searchLong =  mapLongitude ;
	
 	setTimeout ( "geocodeGetCity()" , 1000 ) ;  

}
function errorCallback(){
	mapLatitude = mapLatitude_t;
	mapLongitude = mapLongitude_t;
	
	myLatLng = new google.maps.LatLng( mapLatitude , mapLongitude );
	mapInit( googleMapId , myLatLng , zoomLevel ) ;
	
	searchLat = mapLatitude ; 
	searchLong =  mapLongitude ; 

	setTimeout ( "geocodeGetCity()" , 1000 ) ;  

}


function initPage() {
	if (navigator.geolocation) {
        //위치 정보를 얻기
        navigator.geolocation.getCurrentPosition (successCallback, errorCallback);
	}
}



function geocodeGetCity() {
	var geocoder = new google.maps.Geocoder();
	geocoder.geocode({'location': myLatLng }, function(results, status) {
        if (status === 'OK') {
        	for ( i = 0 ; i < results[0].address_components.length ; i++  ) {
        		if ( results[0].address_components[i].types[0] == "locality" ) {
        			$(".cityName"). html(results[0].address_components[i].long_name ) ;
        		}
        	}
        	setTimeout ( "initSearch()" , 1000 ) ;
           
        } else {
        	console.log('Geocode was not successful for the following reason: ' + status);
        }
   });
}

function initSearch() {
	
	
	$.ajax({
		type:'POST',
		url:'/wsvc/template_en/spa/common/dealer/list.html',
		dataType : "json",
		data : { "loc" 					: locLang[0] , 
			     "lan" 					: locLang[1] , 
			     "defalut_latitude" 	: searchLat , 
			     "defalut_long"		 	: searchLong , 
			     "distanceUnit" 		: "K" , 
			     "distanceValue" 		: mapRadius_t , 
			     "dealerService"        : "" , 
			     "search_type"			: search_type , 
		     	 "s_dealer_name"		: s_dealer_name , 
		     	 "s_dealer_post_code"	: s_dealer_post_code , 
		     	 "s_dealer_address"		: s_dealer_address , 
		     	 "searchDealerNum"      : "99999"  , 
		     	 "home_type"            : "H" 
				} , 
		async: false,
		success:function(data){
			dealerServiceList = data ;
			setMapPoint() ; 
		},
		error: function(request,status,error){
			dealerServiceList = null ; 
		}
	
	}) ; 
	
}



function setMapPoint()  {
	setMarkerClear() ; 
	if ( dealerServiceList != null && dealerServiceList.length > 0 ) {
		dealerPosition = new Array( dealerServiceList.length ) ; 
		for (var i = 0; i < dealerServiceList.length ; i++) {
			dealerPosition[i] = new google.maps.LatLng( Number( dealerServiceList[i].latitude ) , Number( dealerServiceList[i].longtitude ) ) ; 
			
			var marker = new google.maps.Marker({
				position : dealerPosition[i] , 
				map : mapObject ,
				animation : google.maps.Animation.DROP,
				draggable: false,
				optimized: false,
				title: dealerServiceList[i].dealer_name ,
				infoWindowIndex : i , 
				icon : "/etc/designs/hyundai/template_en/en/images/buildacar/Web/Pin_focused.png" 
			});
			var winDiv = "" ;  
			winDiv += "<div class='fdMapShow'  >" ; 
			winDiv += "<div class='listTxt'>" ; 
			winDiv += "<span class='listNum ck'>"+ (i+1) +"</span>" ; 
			winDiv += "<span class='listT1'>"+ dealerServiceList[i].dealer_name +"</span>" ; 
			winDiv += "</div>" ; 
			winDiv += "<div class='fdg'>" ; 
			winDiv += "<h4 class='fdTxt'>Customer's rating</h4>" ; 
			winDiv += "<span class='fdStar fdStarImg1'>"
			for ( k = 1 ; k < 6 ; k++ ) {
				if ( Number ( dealerServiceList[i].dealer_rate ) < k ) {
					winDiv +="<i class='off'></i>" ;
				} else {
					winDiv +="<i class='on'></i>" ;
				}
				
			}
			winDiv += "</span>" ; 
			winDiv += "</div>" ; 
			winDiv += "</div>" ;
						
			infoWindow = new google.maps.InfoWindow({
				content : winDiv , 
				maxWidth: 342
			});
			
			google.maps.event.addListener(marker, 'click', 
              function(event) { 
                  for(var i = 0 ; i < dealerServiceList.length ; i++ ) {
                	  infoWindows[i].close();
                  }
                  mapObject.panTo(event.latLng);
                  mapObject.setZoom(15);
                  infoWindow =  infoWindows[this.infoWindowIndex].open(mapObject, this);
              }
          	);
          	
          	infoWindows.push(infoWindow);
          	markers.push(marker);
        }
		var mcOptions = {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'} ;
      	markerCluster = new MarkerClusterer(mapObject, markers, mcOptions);
	} 
}

function setMarkerClear() {
	if ( markerCluster != null) {
		markerCluster.clearMarkers();	
	}
	for (var i = 0; i < markers.length; i++) {
		infoWindows[i].setMap(null);
		markers[i].infoWindow = null;
		markers[i].setMap(null);
    }
	
    markers = [] ; 
    infoWindows = new Array() ; 
    
    var moveLatLng = new google.maps.LatLng( searchLat , searchLong );
    mapObject.panTo(moveLatLng);
    mapObject.setZoom(zoomLevel);
}


function goMarkerClear(x) {
   	infoWindows[x].close();
}


function goLearnMore () {
	location.href = findADealerLink + "paramLat="+ mapLatitude + "&paramLong="+ mapLongitude ;
}

function wordSearch() {
	if ( $("#paramWord").val() == "" ) {
		alert (Granite.I18n.get('msg_enter_search_words')) ;
		return ; 
	}
	location.href = findADealerLink + "paramLat="+ mapLatitude + "&paramLong="+ mapLongitude + "&paramWord=" + $("#paramWord").val()  ;
	
}