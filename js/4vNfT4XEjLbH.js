  /*
   * strTemp  : [필수] 크로스사이트 스크립팅을 검사할 문자열
   * level    : [옵션] 검사레벨
   *            0 (기본) -> XSS취약한 문자 제거
   *            1 (선택) -> 단순한 <, > 치환
   *            2 (선택) -> XSS취약한 문자를 HTML 엔티티로 변환
   */
  function XSS_Check(strTemp, level) {     
    if ( level === undefined || level == 0) {
      strTemp = strTemp.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|/g,"");		
    }
    else if (level !== undefined && level == 1 ) {
      strTemp = strTemp.replace(/\</g, "&lt;");
      strTemp = strTemp.replace(/\>/g, "&gt;");
    }
    // [2020.03.20:정인혁] GT - START : XSS취약한 문자를 HTML 엔티티로 변환을 위한 로직추가
    else if (level !== undefined && level == 2 ) {
    	strTemp = strTemp.replace(/\;/g, "&#59;");
    	strTemp = strTemp.replace(/\</g, "&lt;");
        strTemp = strTemp.replace(/\>/g, "&gt;");
        strTemp = strTemp.replace(/\"/g, "&quot;");
        strTemp = strTemp.replace(/\'/g, "&#39;");
        strTemp = strTemp.replace(/\%/g, "&#37;")
        strTemp = strTemp.replace(/\(/g, "&#40;");
        strTemp = strTemp.replace(/\)/g, "&#41;");
        strTemp = strTemp.replace(/\+/g, "&#43;");
        
    }
    // [2020.03.20:정인혁] GT - END : XSS취약한 문자를 HTML 엔티티로 변환을 위한 로직추가
    return strTemp;
  }