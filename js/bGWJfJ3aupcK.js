  /*
   * 국가별 validate 생성
   */

function txtChk( id , length, name , itype ) {
    
    var languageArr =["ES", "FR", "ZH", "TR"];
    var countryArr =["BH", "LB", "KW", "JO", "MYNAGHI", "WALLAN", "ALMAJDOUIE"];
    
    if ( $("#"+id).val() != "" && itype == 'txt' ) {
        
        if(countryArr.indexOf(locLang[0].toUpperCase()) !== -1){ // GRO2 국가
            var rex = /^[ㄱ-힣a-zA-Z\u0600-\u06FF\s]+$/ ;
        }else if(languageArr[0] == locLang[0].toUpperCase()){  // 언어가 ES인 국가
            var rex = /^[a-zA-Z\u0000-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF]+$/ ;
        }else if(languageArr[1] == locLang[0].toUpperCase()){ // 언어가 FR인 국가
            var rex = /^[a-zA-Z\u00C0-\u017Fa]+$/ ;
        }else if(languageArr[2] == locLang[0].toUpperCase()){ // 언어가 ZH인 국가
            var rex = /^[a-zA-Z\u4E00-\u9FBF]+$/ ;
        }else if(languageArr[3] == locLang[0].toUpperCase()){ // 언어가 TR인 국가
            var rex = /^[a-zA-Z\u0000-\u024F\u1E00-\u1EFF\u2C60-\u2C7F\uA720-\uA7FF]+$/ ;
        }else{
            var rex = /^[ㄱ-힣a-zA-Z]+$/ ;
        }
        
        var text =  $("#"+id).val() ;
        for( var i=0; i<text.length; i++){
            if(text.charAt(i) != " " && rex.test(text.charAt(i)) == false ){
                $("#"+id+"_msg").html(Granite.I18n.get('msg_not_enter_numbers_or_symbols'));
                $("#"+id+"_msg").show() ;
                $("#"+id+"_msg").removeClass('vHidden');
                $("#"+id).focus() ;
                return false ;
            }
        }
    } else if ( $("#"+id).val() != "" && itype == 'zip' ) {
        var rex = /^[0-9-,]/ ;
        var text =  $("#"+id).val() ;
        for( var i=0; i<text.length; i++){
            if( rex.test(text.charAt(i)) == false ){
                $("#"+id+"_msg").html(Granite.I18n.get('msg_only_numbers_comma'));
                $("#"+id+"_msg").show() ;
                $("#"+id+"_msg").removeClass('vHidden');
                $("#"+id).focus() ;
                return false ;
            }
        }
    } else if ( $("#"+id).val() != "" && itype == 'num' ) {
        var rex = /^[0-9]/ ;
        var text =  $("#"+id).val() ;
        for( var i=0; i<text.length; i++){
            if( rex.test(text.charAt(i)) == false ){
                $("#"+id+"_msg").html(Granite.I18n.get('msg_only_numbers'));
                $("#"+id+"_msg").show() ;
                $("#"+id+"_msg").removeClass('vHidden');
                $("#"+id).focus() ;
                return false ;
            }
        }
    }
    if ( length > 0 && $("#"+id).val().length < length ) {
        $("#"+id+"_msg").html("* "+Granite.I18n.get('msg_minimum_number_of_characters',[name,length])) ;
        $("#"+id+"_msg").show() ;
        $("#"+id+"_msg").removeClass('vHidden');
        $("#"+id).focus() ;
        return false ;
    }
    if ( itype == 'mail'  ) {
        var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
        var text =  $("#"+id).val() ;
        if ( !text.match(regExp) ){
                $("#"+id+"_msg").html("* "+Granite.I18n.get('msg_provide_email_address')) ;
                $("#"+id+"_msg").show() ;
                $("#"+id+"_msg").removeClass('vHidden');
                $("#"+id).focus() ;
                return false ;
        }
    }
    if ( itype == 'comment'  ) {
        if ( $("#"+id).val().length > 2000 ) {
            $("#"+id+"_msg").html(Granite.I18n.get('msg_max_characters',[name,length])) ;
            $("#"+id+"_msg").show() ;
            $("#"+id+"_msg").removeClass('vHidden');
            $("#"+id).focus() ; 
            return false ;
            return ; 
        }  
    }  
    $("#"+id+"_msg").addClass('vHidden');
    $("#"+id+"_msg").hide() ;
    $("#"+id+"_msg").html("") ;
    return true ;
}

function nullChk(id, name, length) {
    if ( $.trim( $("#"+id).val() ) == "" ) {
        $("#"+id+"_msg").html( Granite.I18n.get('msg_please_provide_your')+" " + name   ) ;
        $("#"+id+"_msg").removeClass('vHidden');
        $("#"+id+"_msg").show() ;
        $("#"+id).focus() ;
        return false ;
    } else if  ( length > 0 && $("#"+id).val().length < length ) {
        $("#"+id+"_msg").html(Granite.I18n.get('msg_minimum_number_of_characters',[name,length])) ;
        $("#"+id+"_msg").removeClass('vHidden');
        $("#"+id+"_msg").show() ;
        $("#"+id).focus() ;
        return false ;
    } else {
        $("#"+id+"_msg").addClass('vHidden');
        $("#"+id+"_msg").html("") ;
        $("#"+id+"_msg").hide() ;
        return true ;
    }
}