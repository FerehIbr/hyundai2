// [2018.10.30:전영우] GT : Start - Component 별 Script 호출 집중화 - debugger 가능하도록 고도화

// youtube API, Ready 상태일 경우 trigger를 mapping한다.
function onYouTubeIframeAPIReady() {

    if($(".sliderWrap.cisaSlider").length>0) $(".sliderWrap.cisaSlider").trigger("youtubeScriptReady");
    if($(".sliderWrap.ckvoWrap").length>0) $(".sliderWrap.ckvoWrap").trigger("youtubeScriptReady");
    if($(".sliderWrap.pkvmWrap").length>0) $(".sliderWrap.pkvmWrap").trigger("youtubeScriptReady");
    if($(".sliderWrap.pnsaWrap").length>0) $(".sliderWrap.pnsaWrap").trigger("youtubeScriptReady");
    /* pkvv - gro2 - by chio kim */
    if($(".sliderWrap.pkvvWrap").length>0) $(".sliderWrap.pkvvWrap").trigger("youtubeScriptReady");
    /* end - pkvv - gro2 - by chio kim */
}


// youtube 사용을 위한 script를 html의 body 맨 후미에 호출.
function callYoutubeScript()
{
    var youtube_tag = document.createElement('script');
    youtube_tag.src = "https://www.youtube.com/iframe_api";
    var youtube_firstScriptTag = document.getElementsByTagName('script')[0];
    youtube_firstScriptTag.parentNode.insertBefore(youtube_tag, youtube_firstScriptTag);
}

$(window).load(function(){

    callYoutubeScript();

});
//[2018.10.30:전영우] GT : End - Component 별 Script 호출 집중화 - debugger 가능하도록 고도화