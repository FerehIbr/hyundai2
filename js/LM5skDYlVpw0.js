/**
 * hmc 기본 설정 파일
 */
;(function ( $ ) {
    var hmc = {
        /**
         * ServiceApi setting
         *      path    {String}    api path
         *      cache   {Boolean}   default: false
         *      method  {String}    default: 'GET'
         */
        ServiceApi: {
            ping: { path:'/api/ping' },
            test: { path:'/api/fly/{funding}/{bounds}' }
        },

        //통화 종류 설정
        CURRENCY: 'GBP',

        //날짜 표현식 설정
        DATE_TYPE: 'DD-MM-YYYY',

        //이미지 파일명 규칙
        MODEL_FILE_NAME_RULE: 'Hmc-{type}-{model}-{trim}-{color}-{wheel}-{index, 3}.{extension}'
    };


    //i18n setting
/*    if ( window.Granite && Granite.I18n ) {
        Granite.I18n.setLocale( hmc.COUNTRY || 'eb' );
    } else {
        window.Granite = {
            I18n: {
                get: function ( code ) {
                    return 'ERROR:' + code;
                }
            }
        };
    }*/
    if (Granite && Granite.I18n) {
    	//Granite.I18n.setLocale("en_global");
    	Granite.I18n.setLocale( hmc.I18N_LOCALE || 'en_global' );
    } else {
        window.Granite = {
                I18n: {
                    get: function ( code ) {
                        return 'ERROR:' + code;
                    }
                }
            };
        }


    window.hmc = window.hmc || {};
    window.hmc = _.extend( window.hmc, hmc );
})( jQuery );

/**
 * hmc 기본 설정 파일
 */
;(function ( $ ) {
    var hmgt = {
        /**
         * ServiceApi setting
         *      path    {String}    api path
         *      cache   {Boolean}   default: false
         *      method  {String}    default: 'GET'
         */
        /*
            hmgt.ServiceApi.postcode({
                postcode: ‘000 999’,
            }).done(function () {
            }).fail(function () {
            });
        */
        ServiceApi: {
            carlist: { path:'/api/hmc_gt/car.list' },
            carcategory: { path:'/api/hmc_gt/car.categories' },
            buildMyHmcTrimData: { path:'/api/hmc_gt/bmk.trim' },//code=picanto
            postcode: { path:'/api/hmc_gt/postcode.postcode' }, //postcodei
            postcodeAddress: { path:'/api/hmc_gt/postcode.address' },//id
            findDealer: { path:'/api/hmc_gt/findByDealer.selectClosestList', method:'POST' },
            findDealerAll: { path:'/api/hmc_gt/findByDealer.list?displayYn=Y&delYn=N&pagePerLines=99999999', method:'GET' },
            findAoiDealer: { path:'/api/hmc_gt/findByDealer.aoiList', method:'GET' },
            getDealerDetail: { path:'/api/hmc_gt/findByDealer.detail', method:'GET' },
            getDealerDetailWithDealerNumber: { path:'/api/hmc_gt/findByDealer.detailWithDealerNumber', method:'GET' },
            testADriver: { path:'/api/hmc_gt/util.testdrive', method:'POST' },
            testADriverBmk: { path:'/api/hmc_gt/testdriver.bmk' },
            requestABrochure: { path:'/api/hmc_gt/util.brochure', method:'POST' },
            formNewsLetter: { path:'/api/hmc_gt/form.newsletter', method:'POST' },
			formCampaign: { path:'/api/hmc_gt/form.campaign', method:'POST' },
            formBusiness: { path:'/api/hmc_gt/form.business', method:'POST' },
            formMagazine: { path:'/api/hmc_gt/form.magazine', method:'POST' },
            dealerContactus: { path:'/api/hmc_gt/form.contactus', method:'POST' },
            sendToDealer: { path:'/api/hmc_gt/util.accessories', method:'POST' },
            getToken: { path:'/api/hmc_gt/form.token' }
        },

        //통화 종류 설정
        CURRENCY: 'GBP',

        //날짜 표현식 설정
        DATE_TYPE: 'DD-MM-YYYY',

        //이미지 파일명 규칙
        MODEL_FILE_NAME_RULE: 'Hmc-{type}-{model}-{trims}-{color}-{wheel}-{index, 3}.{extension}',

        FULL_URL: ( location.port == '4502' || location.port == '4503' )? '/content/kwcms/kme/gt/en' : '/gt',
        FULL_IMAGE_URL: '/content/dam/kwcms/kme/gt/en/assets',
        FILE_EXTENTION: ( location.port == '4502' || location.port == '4503' )? '.html' : '/'
    };

    //i18n setting
/*    if ( window.Granite && Granite.I18n ) {
        //Granite.I18n.setLocale( hmgt.COUNTRY || 'eb' );
    } else {
        window.Granite = {
            I18n: {
                get: function ( code ) {
                    return 'ERROR:' + code;
                }
            }
        };
    }*/
    if (Granite && Granite.I18n) {
    	//Granite.I18n.setLocale("en_global");
    	Granite.I18n.setLocale( hmc.I18N_LOCALE || 'en_global' );
    } else {
        window.Granite = {
                I18n: {
                    get: function ( code ) {
                        return 'ERROR:' + code;
                    }
                }
            };
        }

    // ie css-hack
    var ua = navigator.userAgent,
        doc = document.documentElement;

    if ((ua.match(/MSIE 10.0/i))) {
        doc.className = doc.className + " ie10";

    } else if((ua.match(/MSIE 9.0/i))) {
        doc.className = doc.className + " ie9";

    } else if((ua.match(/rv:11.0/i))){
        doc.className = doc.className + " ie11";
    };


    window.hmgt = window.hmgt || {};
    window.hmgt = _.extend( window.hmgt, hmgt );
})( jQuery );
/**
 * Event 객체 - Class 객체에서 사용
 */
;(function ( $, hmc ) {
    var Events = function () {
        this._eventPool_ = {};
    };

    /** =============== Public Methods =============== */
    Events.prototype = {
        /**
         * 이벤트 등록
         * @param {String}    type      event type
         * @param {Function}  callback  return 받을 function
         */
        addListener: function ( type, callback ) {
            if ( typeof type === 'string' && typeof callback === 'function' && !this.hasListener(type, callback) ) {
                var events = this._eventPool_[type];
                if ( !events ) events = this._eventPool_[type] = [];
                events.push( callback );
            }
        },

        /**
         * 이벤트 삭제
         * @param {String}    type      event type
         * @param {Function}  callback  return 받을 function
         */
        removeListener: function ( type, callback ) {
            var events = this._eventPool_[type];

            if ( events ) {
                if ( typeof callback === 'function' ) {
                    _.some( events, function ( fnc, idx ) {
                        if ( callback === fnc ) {
                            events.splice( idx, 1 );
                            return true;
                        }
                    });
                } else {
                    delete this._eventPool_[type];
                }
            }
        },

        /**
         * 이벤트 등록여부 확인, type만 입력하면 type만 비교한다.
         * @param   {String}    type      event type
         * @param   {Function}  callback  등록된 handler
         * @return  {Boolean}
         */
        hasListener: function ( type, callback ) {
            var result = false,
                events = this._eventPool_[type];

            if ( events ) {
                if ( typeof callback === 'function' ) {
                    _.some( events, function ( fnc ) {
                        if ( callback === fnc ) {
                            return result = true;
                        }
                    });
                } else {
                    result = true;
                }
            }

            return result;
        },

        /**
         * 등록된 이벤트 실행
         * @param {String}  type     event type
         * @param {Object}  datas    전달할 datas
         */
        dispatch: function ( type, datas ) {
            var _this = this,
                events = this._eventPool_[type];

            if ( events ) {
                _.each( events, function ( handler ) {
                    var evt = {type: type};

                    if ( typeof datas === 'object' ) {
                        for ( var key in datas ) {
                            if ( key !== 'type' ) evt[key] = datas[key];
                        }
                    }
                    handler.call( _this, evt );
                });
            }
        }
    };

    hmc.Events = hmc.Events || Events;
})( jQuery, hmc );
/**
 * JS 기본 Class 역활
 * Default Methods
 *      extend(), superMethod(), initialize(), addListener(), removeListener(), hasListener(), dispatch()
 */
;(function ( $, hmc, Events ) {
    var Class = {
        /**
         * Methods 상속, 상속이 너무 깊어지면 오류 확률이 높아지니 주의
         * 순환참조 주의
         * @param {Object} methods
         */
        extend: function ( methods ) {
            var Base = function () {};

            Base.prototype = {
                /**
                 * 따로 실행시키지 않아도 기본 new 될때 실행되어 진다.
                 */
                initialize: function () {
                    return this;
                },

                /**
                 * Default Initialize Method apply, super
                 */
                superMethod: function () {
                    return this;
                }
            };

            var Clone = extendMethods( Base, Events.prototype, true );
            return extendMethods( Clone, methods, true );
        }
    };

    function extendMethods ( Class, methods, notFilter ) {
        if ( typeof methods === 'object' ) {
            var Clone = function () {
                //reset event pool;
                this._eventPool_= {};

                if ( typeof this.initialize === 'function' ) {
                    this.initialize.apply( this, arguments );
                }
            };

            /**
             * Methods 상속
             * @param {Object} methods
             */
            Clone.extend = function ( methods ) {
                return extendMethods( this, methods );
            };

            for ( var name in Class.prototype ) {
                Clone.prototype[name] = Class.prototype[name];
            }

            if ( Class.prototype.initialize ) {
                Clone.prototype.superMethod = Class.prototype.initialize;
            }

            for ( var name_ in methods ) {
                if ( name_ !== 'superMethod' ) {
                    if ( notFilter ) {
                        Clone.prototype[name_] = methods[name_];
                    } else {
                        if ( name_ !== 'addListener' && name_ !== 'removeListener' && name_ !== 'hasListener' && name_ !== 'dispatch' ) {
                            Clone.prototype[name_] = methods[name_];
                        }
                    }
                }
            }
        }

        return Clone;
    }


    hmc.Class = hmc.Class || Class;
})( jQuery, hmc, hmc.Events );
/**
 * Body 끝에서 실행시킬 JS 관리
 * ex) hmc.queue.add( function () { //code });
 */
;(function( hmc ) {
    var _queue = [],
        _hasRun = false;

    var Queue = {
        add: function ( fn ) {
            if ( _hasRun ) {
                fn();
            } else {
                _queue.push( fn );
            }
        },

        run: function () {
            var queueLength = _queue.length;

            for ( var i = 0; i < queueLength; ++i ) {
                _queue[i]();
            }
            _hasRun = true;
        }
    };

    hmc.queue = Queue;
})( hmc );
/**
 * ajax 기본 설정, hmc.js 의 ServiceApi 설정을 참조한다.
 * ex) ServiceApi.ping({datas}).done(function () {});
 */
;(function($, ServiceApi) {
    var Request = {
        /**
         * @param {String}  url
         * @param {Object}  settings
         * @returns {Promise}
         */
        ajax: function ( url, settings ) {
            var options, success, error;

            if ( _.isObject(settings) ) {
                options = settings;
            } else {
                options = {};
            }

            options = $.extend({
                dataType: 'json',
                cache: options.cache || false,
                timeout: 2 * 60 * 1000,
                url: url,
                method: options.method || 'GET'
            }, options );

            if ( options.method === 'POST' && !options.contentType ) {
                //this is comment options.contentType = 'application/json; charset=UTF-8';
               
                options.contentType = 'application/x-www-form-urlencoded';
            }

            success = options.success || $.noop;
            error = options.error;

            options.headers = $.extend({
                'cache': options.cache || false,
                'timeout': 2 * 60 * 1000,
                'X-CSRF-Token': options.data.token || ''
            }, options.headers );

            if ( options.method === 'POST' ) {
                options.headers.requestTime = new Date().getTime();
            }

            options.error = function ( xhr, textStatus, errorThrown ) {
                var err;

                if ( xhr.readyState === 0 || (this.statusCode && this.statusCode[xhr.status] && arguments[3] !== true) ) {
                    return
                }


                if ( xhr ) {
                    err = xhr.responseJSON || xhr.responseText || errorThrown;
                } else {
                    err = errorThrown;
                }

                if ( error ) {
                    error.call( this, xhr, textStatus, err );
                }
            };


            options.success = function( data, textStatus, xhr ) {
                if ( xhr.status === 200 || xhr.status === 204 ) {
                    success.apply( this, arguments );
                } else {
                    return this.error.call( this, xhr, 'error', data );
                }
            };

            return $.ajax( options );
        }
    };


    var ApiRequest = function ( api ) {
        this.request = function ( datas ) {
            var path = convertPath( api);

            return Request.ajax( path, {
                cache: api.cache,
                method: api.method,
                data: _.isObject(datas)? _.extend({
                    locale: hmc.COUNTRY + '-' + hmc.LANGUAGE
                }, datas) : {}
            });
        };

        function convertPath ( api ) {
            var path = api.path;

 			/*this is comment if ( _.isObject(datas) ) {
             path = path.replace( /\{([a-zA-Z0-9\-\.]+)\}/g, function ( str, propName ) {
             return datas[propName] || '';
             });
             }*/
            //localhost
            if ( location.hostname === 'localhost' ) {
                path = 'http://192.168.0.96:4502' + path;
            }

            return path;
        }
    };

    //api url, data setting
    for ( var key in ServiceApi ) {
        if ( ServiceApi.hasOwnProperty(key) ) {
            var api = ServiceApi[key];
            ServiceApi[key] = new ApiRequest( api ).request;
        }
    }

    //methods setting
    $.each( ['get', 'post', 'put', 'delete', 'ajax'], function ( i, method ) {
        if ( method === 'ajax' ) {
            ServiceApi[method] = Request.ajax;
        } else {
            ServiceApi[method] = function ( url, settings ) {
                var options;
                if ( arguments.length > 1 ) {
                    options = settings;
                    options.url = url;
                } else {
                    options = arguments[0];
                }

                options = $.extend( {method: method.toUpperCase()}, options );

                if ( arguments.length > 1 ) {
                    return Request.ajax( url, options );
                } else {
                    return Request.ajax( options );
                }
            };
        }
    });

})(jQuery, hmgt.ServiceApi);


/**
 * Handlebars Helpers
 */
(function () {
    Handlebars.registerHelper( 'consoleLog', function () {
        if ( typeof console.log === 'function' )
        return;
    });

    /*this is comment
    var i18nFromSrc = function (source) {
        var params = Array.prototype.slice.call(arguments, 1),
            options = params.pop();

        var i18nFunction = options.hash.locale ? _.partial( Granite.I18n.localeGet, options.hash.locale ) : Granite.I18n.get;
        return new Handlebars.SafeString( i18nFunction(source, params) );
    };
    */

    Handlebars.registerHelper( 'i18n', function (  ) {
    //this is comment return i18nFromSrc.apply( null, arguments );
    });

    //ex) {{#xif Age ">=" 42}} true {{else}} false {{/xif}}
    Handlebars.registerHelper('xif', function (lvalue, operator, rvalue, options) {
        var operators, result;

        if ( arguments.length < 3 ) {
            throw new Error( 'Handlerbars Helper "compare" needs 2 parameters' );
        }

        if ( options === undefined ) {
            options = rvalue;
            rvalue = operator;
            operator = "===";
        }

        operators = {
            '==': function (l, r) { return l === r; },
            '===': function (l, r) { return l === r; },
            '!=': function (l, r) { return l !== r; },
            '!==': function (l, r) { return l !== r; },
            '<': function (l, r) { return l < r; },
            '>': function (l, r) { return l > r; },
            '<=': function (l, r) { return l <= r; },
            '>=': function (l, r) { return l >= r; },
            'typeof': function (l, r) { return typeof l === r; }
        };

        if ( !operators[operator] ) {
            throw new Error( "'xif' doesn't know the operator " + operator );
        }

        result = operators[operator]( lvalue, rvalue );

        if ( result ) {
            return options.fn( this );
        } else {
            return options.inverse( this );
        }
    });

    // 모든 value가 true이거나 값이 있는지
    //ex) {{#every value1 value2}} view1 {{else}} view2 {{/every}}
    Handlebars.registerHelper( 'every', function () {
        var args = Array.prototype.slice.call( arguments ),
            options = args.pop(),
            result = _.every( args, function ( arg ) {
                return arg ? true : false;
            });

        if ( result ) {
            return options.fn( this );
        } else {
            return options.inverse( this );
        }
    });

    // value중에 하나라도 true이거나 값이 있는지
    //ex) {{#some value1 value2}} view1 {{else}} view2 {{/some}}
    Handlebars.registerHelper( 'some', function () {
        var args = Array.prototype.slice.call( arguments ),
            options = args.pop(),
            result = _.some( args, function ( arg ) {
                return arg ? true : false;
            });

        if ( result ) {
            return options.fn( this );
        } else {
            return options.inverse( this );
        }
    });

    //popup size class return
    Handlebars.registerHelper( 'popupSizeClass', function ( size ) {
        var result = 'hmc_md_size';

        if ( size === 'S' ) {
            result = 'hmc_sm_size';
        } else if ( size === 'L' ) {
            result = 'hmc_lg_size';
        }

        return result;
    });

    //popup size class return for GT
    Handlebars.registerHelper( 'popupSizeClassForGT', function ( size ) {
        var result = '';

        if ( size === 'S' ) {
            result = 'wSmall';
        } else if ( size === 'L' ) {
            result = 'wBig';
        } else if ( size === 'M') {
            result = 'wMiddle';
        }

        return result;
    });

    //decodeURIComponent
    Handlebars.registerHelper( 'decodeString', function ( string ) {
        return decodeURIComponent( string );
    });
})();

/**
 * 공통 기능
 */
;(function ( $, $B, hmc ) {
    var _search = location.search;
    $(window).load(function() {
		window.sessionStorage.setItem("last-url", window.location.href);
    });

    var Common = {

        numberFormat: function( value ){
            return value.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1.');
        },
        //설정된 통화 형식에 맞는 format 으로 변환 ex) 3000.20 > 3.000,20
        currencyFormat: function ( price ) {
 /*
   this is comment    if (typeof price === 'string' || price instanceof String){
                price = price.replace(/[^\d]+/g, '');//콤마(,) 제거
            }
            */
            if( !price ){
                price = '0';
            }

            var _price = String( price );
            //1) 계산되지 않은 값 중, 파운드 기호가 붙어서 넘어오는 경우 처리
            var currency = '£';
            if( _price.indexOf('£') > -1 ){
                currency = '';
            }

            //2) 쩜(.) 없이 정수만 넘어올 경우 .00 처리
            if( _price.indexOf('.') === -1 ){
            	_price += '.00';
            }

            //3) 쩜(.)은 있지만 한 자리밖에 없을 경우 처리
            if( _price.split('.')[1].length === 1 ){
            	_price += '0';
            }

           //3) 세자리마다 콤마를 찍어준다.(쩜.)있어도 정상작동 됨)
            var price_ = String( price );
            price_ = price_.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');

            return currency + price_;
        },

        calculateDetailPrice: function ( price, fittingTime, multiplier ) {
            var T = Number('1e'+2),
                PriceVAT = 0.2,
                FittingPrice = 65,
                FittingVAT = 0.2,
                FittingTime = Number( fittingTime ) || 0,
                _price_ = Number( price );
            //Math.round((sumPrice + Number(option.price))*T)/T
            //var totalPrice = ( price + (price * PriceVAT) ) + ( (FittingPrice * FittingTime) + (FittingPrice * FittingTime * FittingVAT));
            var calculate1 = Math.round((_price_ + (_price_ * PriceVAT))*T)/T,
                calculate2 = Math.round((FittingPrice * FittingTime)*T)/T,
                calculate3 = Math.round((FittingPrice * FittingTime * FittingVAT)*T)/T;

            var totalPrice = Math.round((calculate1 + ( calculate2 + calculate3 ))*T)/T;

            var multi = multiplier || 1;

            var gTotalPrice = totalPrice * multi;

            return Math.round(gTotalPrice * 100) / 100;
        },

        /**
         * Url Parameter 반환
         * @param   {String}            prop  반환 받을 property name, 설정하지 않으면 Object 형태로 모두 반환
         * @return  {* | Object}
         */
        getUrlParam: function ( prop ) {
            var result = {};
            _search.replace(/(\w*)\=([^&]*)/g, function ( str, prop, value ) {
                result[prop] = Common.parseDataType( value );
            });

            if ( typeof prop === 'string' ) {
                if ( result[prop] ) {
                    result = result[prop];
                } else {
                    result = '';
                }
            }

            return result;
        },

        /**
         * AEM Url Parameter 반환
         * @param   {String}        검색된 param array에서 해당하는 index
         * @return  {Array, *}      검색되는 param이 없으면 undefined 반환
         */
        getAemUrlParam: function ( index ) {
            var result = [],
                pathname = location.pathname;

            pathname.replace( /([^\/]+)\/*$/, _.bind(function ( str, f1 ) {
                var match = f1.split( '.' );

                if ( match && match.length > 1 ) {
                    _.each( match, _.bind(function ( val, idx ) {
                        if ( idx > 0 && val.indexOf('html') === -1 ) {
                            val = this.parseDataType( val );
                            result.push( val );
                        }
                    }, this));
                }
            }, this));

            if ( index || index === 0 ) {
                if ( (index > result.length - 1) || (index < 0) ) {
                    result = undefined;
                } else {
                    result = result[index];
                }
            } else {
                if ( !result.length ) {
                    result = undefined;
                }
            }
            return result;
        },

        getAemUrlParamObject: function () {
            var result = {},
                pathname = location.pathname;

            pathname.replace( /([^\/]+)\/*$/, _.bind(function ( str, f1 ) {
                var match = f1.split( '.' );
                match.shift();
                if ( pathname.indexOf( '.html' ) > 0 ) {
                    match.pop();
                }
                if ( match && match.length > 1 ) {
                    var key;
                    _.each( match, _.bind(function ( val, idx ) {
                        if( idx === 0 || idx%2 === 0 ){
                            key = decodeURIComponent( val );
                        }else{
                            val = this.parseDataType( val );
                            result[ key ] = decodeURIComponent( val );
                        }
                    }, this));
                }
            }, this));

            return result;
        },

        /**
         * URL의 해당 데이타를 AEM URL Prameter 형식으로 생성 조합하여 반환
         * @param   {Array}        params   URL을 생성할 데이타
         * @param   {Boolean}      isAdd    기존 url param의 추가 할것인지 설정, default=false
         * @return  {String}
         */
        createAemUrlWithParam: function ( params, isAdd ) {
            var origin = location.protocol + location.hostname + location.port,
                pathname = location.pathname;

            if ( _.isArray(params) && params.length > 0 ) {
                var paramStr = decodeURIComponent( params.join('.') );

                pathname = pathname.replace( /([^\/]+)\/*$/, function ( str, f1 ) {
                    var extention = ( /.html$/.test(f1) ? 'html' : '' ),
                        fileName = f1.replace( /.html$/, '' );

                    if ( isAdd ) {
                        return fileName + '.' + paramStr + '.' + extention;
                    } else {
                        fileName.replace( /[^.]+/, function ( val ) {
                            fileName = val;
                        });

                        return fileName + '.' + paramStr + '.' + extention;
                    }
                });
            }

            return origin + pathname;
        },

        /**
         * 문자열 value를 각 데이타 타입에 맞도록 반환
         * @param {String}  str
         * @returns {*}
         */
        parseDataType: function ( str ) {
            if ( str ) {
                if ( str.indexOf('true') > -1 ) {
                    str = Boolean( str );
                } else if ( str.indexOf('false') > -1 ) {
                    str = Boolean();
                } else if ( /^[0-9\.\-]+$/.test(str) ) {
                    str = Number( str );
                }
            }
            return str;
        },

        formSubmit: function(e, secondaryBtn) {
            var submitBtn = ($('.btnLarge.btnType1').length > 0) ? $('.btnLarge.btnType1') : secondaryBtn;
            if(e && e.keyCode === 13) {
                submitBtn.trigger('click');
            }
        },

        /**
         * Javascript API Include
         * @param {String}    type  API Type
         * @param {String}    path  API Javascript Path
         */
        includeApi: function ( type, path ) {
            var d = document, s = 'script',
                id = type + '_js_api',
                js, fjs = d.getElementsByTagName( s )[0];

            if ( d.getElementById(id) ) {
                return;
            }
            js = d.createElement( s );
            js.type = 'text/javascript';
            js.src = path;
            fjs.parentNode.insertBefore( js, fjs );
        },

        /**
         * Handlebars Template
         * @param {String}    key       folderName.fileName
         * @param {Object}    datas     template datas
         * @returns {String}    html
         */
        template: function ( key, datas ) {
            if( key.charAt(0) === '<' ){
                return Handlebars.compile( key )( datas );
            } else {
                var keys = key.split( '.' ),
                mehtod = hmcHanblebars;

                _.each( keys, function ( id ) {
                    mehtod = mehtod[id];
                });

                return mehtod( datas );
            }
        },

        /**
         * 순환참조 되지 않도록 Object, Array Extend (Object안에 Function은 처리하지 못한다.)
         * @param {Object | Array}      model
         * @param {Object | Array}      obj
         * @return  {Object | Array}
         */
        extend: function ( model, obj ) {
            var modelObj = JSON.parse( JSON.stringify(model) );
            return _.extend( modelObj, obj );
        },

        /**
         * Cookie 설정
         * @param {String}    key
         * @param {*}         value
         * @param {Number}    expireMinutes     만료시간 설정, 30초 입력시 0.5, 값을 넣지 않으면 Session Cookie가 된다.
         * @param {String}    path
         * @param {String}    domain
         * @param {Boolean}   secure            SSL을 이용하여 서버에 쿠키를 전송
         */
        setCookie: function ( key, value, expireMinutes, path, domain, secure ) {
            key = 'hmc_' + key;
            $B.utils.cookie( key, value, expireMinutes, path, domain, secure );
        },

        getCookie: function ( key ) {
            return $B.utils.cookie( 'hmc_' + key );
        },

        /**
         * LocalStrorage 설정
         * @param {String}    key
         * @param {*}         value
         * @param {Number}    expireMinutes     만료시간 설정, 30초 입력시 0.5, 설정하지 않으면 계속 유지된다.
         */
        setLocalStrorage: function ( key, value, expireMinutes ) {
            var json = false;

            if ( expireMinutes ) {
                var today = new Date();
                today.setSeconds( today.getSeconds() + (expireMinutes * 60) );
                expireMinutes = today.getTime();
            }

            if ( typeof value === 'object' ) {
                value = JSON.stringify( value );
                json = true;
            }

            localStorage.setItem( 'hmc_' + key, JSON.stringify({
                expires: expireMinutes || -1,
                origin: value,
                json: json
            }));
        },

        /**
         * LocalStrorage 반환, expireMinutes를 설정 했을시 해당 시간을 넘어가면 값을 삭제하고 undefined 반환.
         * @param {String}    key
         * @return  {*}
         */
        getLocalStrorage: function ( key ) {
            var value = localStorage.getItem( 'hmc_' + key ),
                now = new Date().getTime();

            if ( value ) {
                value = JSON.parse( value );

                if ( value.expires === -1 || value.expires >= now ) {
                    if ( value.json ) {
                        value = JSON.parse( value.origin );
                    } else {
                        value = value.origin;
                    }
                } else {
                    this.clearLocalStrorage( key );
                    value = undefined;
                }
            } else {
                value = undefined;
            }

            return value;
        },

        /**
         * 설정한 key와 일치하는 LocalStorage Item 삭제
         * @param	{String}	key
         */
        clearLocalStrorage: function ( key ) {
            localStorage.removeItem( 'hmc_' + key );
        },

        /**
         * 옵션을 입력하여 MODEL_FILE_NAME_RULE 에 맞는 이미지 파일명 구하기
         * @param {Object}  option
         *      {String}  type          ex)360vr
         *      {String}  model
         *      {String}  trim
         *      {String}  color
         *      {String}  wheel
         *      {String}  index         1~999, #을 입력하면 ### 처럼 처리된다.
         *      {String}  extension     default:jpg
         * @param {String}  rule        rule을 입력하지 않으면 기본 MODEL_FILE_NAME_RULE 이 적용된다.
         * @return  {String}
         */
        getImgFileName: function ( option, rule ) {
            var result = '',
                _rule = rule || hmc.MODEL_FILE_NAME_RULE;

            if ( _.isObject(option) ) {
                result = _rule.replace( /([-.])\{([a-zA-Z0-9\-\.\,\s]+)\}/g, function ( str, dot, key ) {
                    var value = ( /^index/.test(key) )? option.index : option[key];

                    if ( value ) {
                        if ( /^index/.test(key) ) {
                            value = key.replace( /[index\,\s]+[\s]*([0-9])/, function ( str, cipher ) {
                                var cipStr = '0';
                                if ( value === '#' ) {
                                    cipStr = '#';
                                    value = '';
                                }
                                return $B.string.format( value, cipher, cipStr );
                            });
                        }

                        value = dot + value;
                    } else {
                        if ( key === 'extension' ) {
                            value = dot + 'jpg';
                        } else {
                            value = '';
                        }
                    }

                    return value;
                });
            }

            return result;
        },

        /**
         * 이미지명이 포함된 이미지 경로를 파싱
         * @param {String}    path      이미지명이 포함된 전체경로
         * @return  {Object}    path, fileName, extension
         */
        parseImgPath: function ( path ) {
            var result = {};
            if ( typeof path === 'string' ) {
                path.replace(/([^\.]+)\/([^\.\/]+)\.(jpg|jpeg|png|gif)$/i, function ( str, path, fileName, extension ) {
                    result = {
                        path: path,
                        fileName: fileName,
                        extension: extension
                    }
                });
            }
            return result;
        },

        /**
         * 임시 form을 생성해 데이터 전송
         * @param	{String}	action
         * @param	{Object}	data
         * @param	{String}	method
         */
        submit: function ( action, data, method ) {
            var $form = $( '<form></form>' ).attr( { action:action, method:method||'GET'});
            var inputs = '';

            _.each( data, function( value, name ){
                inputs += '<input type="hidden" name="'+name+'" value="'+value+'">';
            });

            $form.html( inputs );
            $form.appendTo( document.body ).submit().remove();
        },

        /**
         * SEND SNS
         * @param	{String} sns
         */
        sendSns: function( selectedJsonData, sns ) {
            //make short
            this.makeShortUrl( this.sendToSns, selectedJsonData, sns  );
      /*
            this is comment var fullUrl = location.href;
            var shortUrl = fullUrl + '?selectedJsonData=' + selectedJsonData;
            this.sendToSns( shortUrl, sns );
            */
        },

        sendToSns: function( shortUrl, sns ) {
            //addThis 라이브러리 사용
            var o;
            var href = shortUrl;
            var _url = encodeURIComponent(href);
            var _txt = '제목을 입력해주세요';
            var _br= encodeURIComponent('\r\n');

            switch(sns)
            {
                case 'naverblog':
                    o = {
                        method:'popup',
                        url:'http://share.naver.com/web/shareView.nhn?url=' + _url + '&title=' + _txt
                    };
                    break;
                case 'linkedin':
                    o = {
                        method:'popup',
                        url:'https://www.linkedin.com/cws/share?url=' + _url
                    };
                    break;
                case 'google+':
                    o = {
                        method:'popup',
                        url:'http://plus.google.com/share?url=' + _url
                    };
                    break;
                case 'facebook':
                 //this is comment var params = 'u='+encodeURIComponent(location.href+'?imgname='+_image+'&msg='+_summary+'&t='+_title+"&passerby=1");
                    o = {
                        method:'popup',
                        url:'http://www.facebook.com/sharer/sharer.php?u=' + _url
                    };
                    break;

                case 'twitter':
                    o = {
                        method:'popup',
                        url:'http://twitter.com/intent/tweet?text=' + _txt + '&url=' + _url
                    };
                    break;

                case 'me2day':
                    o = {
                        method:'popup',
                        url:'http://me2day.net/posts/new?new_post[body]=' + _txt + _br + _url + '&new_post[tags]=epiloum'
                    };
                    break;

                case 'kakaotalk':
                    o = {
                        method:'web2app',
                        param:'sendurl?msg=' + _txt + '&url=' + _url + '&type=link&apiver=2.0.1&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('Epiloum 개발노트'),
                        a_store:'itms-apps://itunes.apple.com/app/id362057947?mt=8',
                        g_store:'market://details?id=com.kakao.talk',
                        a_proto:'kakaolink://',
                        g_proto:'scheme=kakaolink;package=com.kakao.talk'
                    };
                    break;

                case 'kakaostory':

                    o = {
                        method:'popup',
                        url:'https://story.kakao.com/share?url=' + _url
                    };
                     /*
                     this is comment o = {
                     method:'popup',
                     param:'posting?post=' + _txt + _br + _url + '&apiver=1.0&appver=2.0&appid=dev.epiloum.net&appname=' + encodeURIComponent('Epiloum 개발노트'),
                     a_store:'itms-apps://itunes.apple.com/app/id486244601?mt=8',
                     g_store:'market://details?id=com.kakao.story',
                     a_proto:'storylink://',
                     g_proto:'scheme=kakaolink;package=com.kakao.story'
                     };
                     */
                    break;

                case 'band':
                    o = {
                        method:'web2app',
                        param:'create/post?text=' + _txt + _br + _url,
                        a_store:'itms-apps://itunes.apple.com/app/id542613198?mt=8',
                        g_store:'market://details?id=com.nhn.android.band',
                        a_proto:'bandapp://',
                        g_proto:'scheme=bandapp;package=com.nhn.android.band'
                    };
                    break;

                default:
                    return false;
            }

            switch(o.method)
            {
                case 'popup':
                    var left = 10;
                    var top = 10;
                    window.open(o.url, '', 'width=470,height=400,top=' + left + ',left=' + top);
                    break;

                case 'web2app':
                    if(navigator.userAgent.match(/android/i))
                    {
                        // Android
                        setTimeout(function(){ location.href = 'intent://' + o.param + '#Intent;' + o.g_proto + ';end'}, 100);
                    }
                    else if(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)/i))
                    {
                        // Apple
                        setTimeout(function(){ location.href = o.a_store; }, 200);
                        setTimeout(function(){ location.href = o.a_proto + o.param }, 100);
                    }
                    break;
                default :
                	
                	break;
            }
        },

        makeShortUrl: function( callback, selectedJsonData, sns ) {
            var fullUrl = location.href + '?selectedJsonData=' + selectedJsonData,
                longUrlText = $("<div/>").html(fullUrl).text();
            var request = gapi.client.urlshortener.url.insert({
                'resource' : {
                    'longUrl' : longUrlText
                }
            });
            request.execute(function(response) {
                if (response.id != null) {
                    var shortUrl = response.id;
                    callback( shortUrl, sns );
                } 
            });
        },

        getPostCode: function ( position ){
        },

        getCurrentPostCode: function (){
        },

        getVehicleName: function ( name ) {
            name = name.toLowerCase();

            if ( name === 'soul-ev' ) {
                name = "soul ev";
            }
            if ( name === 'new-ceed' ) {
                name = "new cee'd";
            }
            if ( name === 'new-ceed-gt' ) {
                name = "new cee'd gt";
            }
            if ( name === 'new-pro-ceed' ) {
                name = "new pro_cee'd";
            }
            if ( name === 'new-pro-ceed-gt' ) {
                name = "new pro_cee'd gt";
            }
            if ( name === 'new-ceed-sportswagon' ) {
                name = "new cee'd sportswagon";
            }


            if ( name === 'all-new-sportage' ) {
                name = 'all-new sportage';
            }
            if ( name === 'all-new-optima' ) {
                name = 'all-new optima';
            }
            if ( name === 'all-new-niro' ) {
                name = 'all-new niro';
            }
            if ( name === 'all-new-sorento' ) {
                name = 'sorento';
            }


            if ( name === "cee'd" ) {
                name = "new cee'd";
            }
            if ( name === "cee'd gt" ) {
                name = "new cee'd gt";
            }
            if ( name === "cee'd sportswagon" ) {
                name = "new cee'd sportswagon";
            }
            if ( name === "pro cee'd" ) {
                name = "new pro_cee'd";
            }
            if ( name === "pro cee'd gt" ) {
                name = "new pro_cee'd gt";
            }
            return name;
        },

        getVehicleType: function ( name, category ) {
            var type;
            if ( name === 'picanto' || name === 'rio' || name === 'soul' || name === 'soul ev' || name === 'venga' ) {
                type = 'compact';
            } else if ( name === "new cee'd gt" || name === "new cee'd" || name === "new cee'd sportswagon" || name === "new pro_cee'd" || name === "new pro_cee'd gt" || name === "all-new optima" || name === "all-new niro" ) {
                type = 'mid-size';
            } else if ( name === 'carens' ) {
                type = 'mpv';
            } else if ( name === 'all-new sportage' || name === 'all-new-sportage' || name === 'all-new sorento' || name === 'sorento') {
                type = 'suv/4x4';
            } else {
                type = category;
            }

            return type;
        }
    };


    hmc.common = hmc.common || Common;
})( jQuery, ixBand, hmc );

/**
 * Video 관리 (youtube, flowplayer??)
 */
;(function ( $, hmc ) {
    var VideoAPI = (function () {
        var API = {
            _randomId: 0,

            getRandomId: function () {
                return 'hmc_video_' + this._randomId++;
            },

            apis: {
                youtube: {
                    path: 'https://www.youtube.com/iframe_api',
                    play: 'playVideo',
                    stop: 'stopVideo'
                }/*,
                flowplayer: {
                    path: '//releases.flowplayer.org/6.0.5/flowplayer.min.js',
                    play: 'play',
                    stop: 'stop'
                }*/
            }
        };

        return API;
    })();


    /**
     * @param   {Object}    options
     *      {String}    type    Video Type (youtube, flowplayer)
     * @constructor
     */
    var Video = hmc.Class.extend({
        _isPlay: false,

        initialize: function ( options ) {
            if ( options.vendor ) {
                if ( this['_' + options.vendor] ) {
                    this._vendor = options.vendor;
                    this['_' + options.vendor]( options );
                }
            }
        },

        /** =============== Public Methods =============== */

        play: function () {
            if ( this._video ) {
                var method = VideoAPI.apis[this._vendor].play;
                if ( this._video[method] ) {
                    this._video[method]();
                    this._isPlay = true;
                }
            }
        },

        stop: function () {
            if ( this._video ) {
                var method = VideoAPI.apis[this._vendor].stop;
                if ( this._video[method] ) {
                    this._video[method]();
                    this._isPlay = false;
                }
            }
        },

        update: function () {
            //this._$videoEl.ixRatioSize({
            //    ratio: '720 405'
            //});
        },

        remove: function () {
            if ( this._$videoEl ) {
                this._$videoEl.siblings( '.hmc_video_touch_area' ).off( 'click' );
                //IE8 잔상문제 때문에 추가
                this._$videoEl.attr( 'src', '' );
            }

            this._video = null;
        },

        /** =============== Private Methods =============== */

        _youtube: function ( options ) {
            if ( !window.YT ) return;

            this._video = new YT.Player( this._getVideoId(options.path) );
            this._$videoEl = $( '#' + options.randomId );
            this._$videoEl.siblings( '.hmc_video_touch_area' ).on( 'click', _.bind(function () {
                if ( this._isPlay ) {
                    this.stop();
                } else {
                    this.play();
                }
            }, this));
        },

        _getVideoId: function ( path ) {
            var videoId = '';

            if ( typeof path === 'string' ) {
                if ( /^https:\/\//i.test(path) ) {
                    videoId = path.match( /\/([a-z0-9_]+)$/i );
                    videoId = ( videoId && videoId.length > 1 )? videoId[1] : '';
                } else if ( /^[a-z0-9]+$/i.test(path) ) {
                    videoId = path;
                }
            }

            return videoId;
        }

        /*
        _flowplayer: function ( options ) {
         if ( !window.flowplayer ) return;

            this._$videoEl = $( '#' + options.randomId );

            this._video = flowplayer( this._$videoEl.get(0), {
                clip: {
                    sources: [
                        { type: 'video/webm',
                            src: options.path + '.webm' },
                        { type: "video/mp4",
                            src:  options.path + '.mp4' }
                    ]
                }
            });
        }
        */
    });

    Video.getRandomId = function () {
        return VideoAPI.getRandomId();
    };


    hmc.Video = hmc.Video || Video;
})( jQuery, hmc );

/**
 * Modal 관리
 */
;(function ( $, hmc, common ) {
    /**
     * Base Modal
     * @constructor
     */
    var ModalManager = hmc.Class.extend({

        initialize: function ( contents, optionsParam ) {
            var options = ( $B.object.is(optionsParam) )? optionsParam : {};

            //options.transparent = ( typeof options.transparent === 'boolean' )? options.transparent : ( modal.isOpen()? true : false )
            options.popupSize = options.popupSize || '';

            if ( options.isScroll !== false ) options.isScroll = true;
            if ( options.top ) options.isAfterShow = false;

            this._options = options;
            this._deferred = new $.Deferred();
            this._isMiddlePosition = options.isMiddlePosition;
            this._$win = $( window );
            this._$doc = $( document );
            this._$activeElement = options.returnFocusTarget || $( document.activeElement );
            this._resizeInterval = undefined;

            this._drawModal( contents, options );
            if( options.isLightBox ){
                this.setOption();
            }

            if( !options.isScroll ){
                hmgt.common.preventScroll( true );
            }
            
            if( options.preventBodyScroll ){
		        document.body.classList.add('noscroll');
		     }    
        },

        /** =============== Public Methods =============== */

        getPromise: function () {
            return this._deferred.promise();
        },

        setOption: function () {
            this._setPosition( this._options.top );
            this._addEvents( this._options );
            if ( !this._options.isAfterShow ) {
                this._$iconClose.focus();
                this._$win.scrollTop( this._scrollTop );
            }

            if( this._options.imgLoadComplete ){
                this._options.imgLoadComplete( 'onCompleted' );
                this._onImgLoad( '.hmc_common_modal_container .hmgt_wrap img', this._resizeHandler );
            }

            if( this._options.onClose ){
                this._onCloseDeffered = new $.Deferred();
                this._onCloseDeffered.done(_.bind(function( data ){
                    this._options.onClose( data );
                }, this));
            }

            return this;
        },

        /** =============== Private Methods =============== */

        _drawModal: function ( contents, options ) {
            var isJqueryObject = ( typeof contents !== 'string' && typeof contents.get === 'function' ),
                html = common.template( 'handlbars.modal', _.extend({
                    contents: ( isJqueryObject )? '' : contents
                }, options));

            this._$modal = $( html );
            this._$dim = this._$modal.find( '.hmc_common_dim' );
            this._$pop = this._$modal.find( '.hmc_modal_window' );

            if ( isJqueryObject ) {
                this._$pop.find( '> .hmgt_wrap' ).append( contents );
            }

            if ( options.isAfterShow ) {
                this._$modal.css( 'visibility', 'hidden' );
            }

            this._$iconClose = this._$modal.find( 'a.close' );
            this._$btnConfirm = this._$modal.find( '.hmgt_confirm_btn' );
            this._$btnCancel = this._$modal.find( '.hmgt_cancel_btn' );


            $( 'body' ).append( this._$modal );
            tapIndexFnc.Init( this._$modal );
            //Picturefill a responsive image polyfill
            picturefill();
        },

        _onImgLoad : function( selector, callback ){
            var _self = this;
            $(selector).on('load', function(){
                callback.call(_self);
            });
        },

        _addEvents: function ( options ) {
            this._$iconClose.add( this._$btnCancel ).on( 'click', _.bind(function (e) {
                e.preventDefault();
                this._remove();
                this._deferred.reject();

                if( !options.isScroll ){
                    hmgt.common.preventScroll( false );
                }
            }, this));

            this._$btnConfirm.on( 'click', _.bind(function (e) {
                e.preventDefault();
                this._remove();
                this._deferred.resolve();

                if( this._onCloseDeffered ){
                    this._onCloseDeffered.resolve('onClosed');
                }

                if( !options.isScroll ){
                    hmgt.common.preventScroll( false );
                }
            }, this));

				//this is comment if ( !options.transparent ) {
                this._$dim.on( 'click', _.bind(function () {
                    this._$iconClose.trigger( 'click' );
                }, this));
 				//}
            if ( options.isAfterShow ) {
                this._$modal.on( 'afterShow', _.bind(function () {
                    this._setPosition( options.top );
                    this._$modal.css( 'visibility', 'visible' );
                    this._$iconClose.focus();
                    this._$win.scrollTop( this._scrollTop );
                }, this));
            }

            this._$modal.on( 'resetPosition', _.bind(function () {
                this._setPosition( options.top, true );
            }, this));

            this._onResize = _.bind(this._resizeHandler, this);
            this._$win.on( 'resize', this._onResize );
        },

        _resizeHandler: function () {
            /*
            아이폰 사파리에서 가로/세로모드 전환시 리사이즈 이벤트가 여러번 발생 됨.
            약간의 시간차를 두어 최종 렌더링 된 정보로 위치를 보정 함.
            */
            if( this._resizeInterval !== undefined ){
                clearTimeout( this._resizeInterval );
                this._resizeInterval = undefined;
            }
            var self = this;
            this._resizeInterval = setTimeout( function(){
                self._setPosition( self._options.top, true );
            }, 50 );

        },

        _setPosition: function ( top, isRePosition ) {
            this._scrollTop = this._$win.scrollTop();

            if ( this._isMiddlePosition ) {
                var winHeight = this._$win.height(),
                    position = this._$pop.css( 'position' ),
                    posY = 0;

                if ( position === 'fixed' ) {
                    posY = ( winHeight * 0.5 ) - ( this._$pop.outerHeight() * 0.5 );
                    if ( posY < 0 ) posY = 0;
                } else {
                    posY = ( winHeight * 0.5 ) - ( this._$pop.outerHeight() * 0.5 ) + this._scrollTop;
                    if ( posY < this._scrollTop ) posY = this._scrollTop;
                }

                if ( isRePosition ) {
                    if ( this._$pop.length ) {
                        $B( this._$pop ).transition( 'top:' + posY + 'px', 'top 0.4s ease' );
                    	//this is comment $B( this._$pop ).css( 'top:' + posY + 'px' );
                  
                    }
                } else {
                    if ( this._$pop.length ) $B( this._$pop ).transition( 'none' );
                    this._$pop.css( 'top', posY + 'px' );
                }

            } else if ( top ) {
                this._$pop.css( 'top', top );
            }
        },

        _remove: function () {
            this._$iconClose.off( 'click' );
            this._$btnCancel.off( 'click' );
            this._$btnConfirm.off( 'click' );
            this._$dim.off( 'click' );
            this._$win.off( 'resize', this._onResize );
            this._$modal.off().remove();
             document.body.classList.remove('noscroll');
            //focus 이동
            this._$activeElement.focus();
        }
    });

    var modal = {
        /**
         * Modal 창 띄우기
         * @param {String, jQueryObject}    contents          text, html, jQueryObject
         * @param {Object}    options
         *      {String}    title
         *      {Boolean}   transparent         배경 투명 처리 설정
         *      {String}    popupSize           "S", "M", "L" (default:M)
         *      {Boolean}   isMiddlePosition     top 포지션을 화면의 중앙으로 설정할때
         *      {String}    top                 top 포지션 설정 (단위 포함), ex) 200px
         *      {Boolean}   isContentMargin     content영역의 margin을 넣을지 여부
         *      {Boolean}   isMobileWidthFull   Mobile사이즈에서 windth값을 full로 채워야 할때
         *      {Boolean}   isAfterShow         modal.afterShow() 를 실행시키기 전에는 보여지지 않는다.
         *      {Boolean}   isTopBar            상단 bar 표출 여부
         *      {jQueryObject}  returnFocusTarget   창이 닫힐때 focus를 보낼 대상
         * @returns {Promise}
         */
        open: function ( contents, options ) {
            return new ModalManager( contents, options ).setOption().getPromise();
        },

        /**
         * 열려있는 모달창 닫기
         * @param {jQueryObject}    $el   Target modal container, 설정하지 않으면 모든 모달을 닫는다.
         */
        close: function ( $el ) {
            if ( $el ) {
                $el.find( 'a.close' ).trigger( 'click' );
            } else {
                $( '.hmc_common_modal_container a.close' ).trigger( 'click' );
            }
        },


        /**
         * Video Modal Popup
         * @param   {Object}
         * @returns {Promise}
         */
        video: function ( options ) {
            var defaults = {
                video_url: '',
                video_title: '',
                video_description: '',
                video_subtitle_description: '',
                video_size: 'M'
            };

            var optionData = _.extend({}, defaults, options);
            var contents = common.template( 'handlbars.video-popup', optionData);

            this.open( contents, {
                isMiddlePosition: true,
                popupSize: 'M',
                title: 'video'
            });

            //DOM 생성 완료 후 실행
            $('a.btn_text').on('click', function(){
                var _self = $(this);
                _self.toggleClass('on');
                _self.next('div.description_box').toggleClass('show');
               // _self.prev('p.txt_type').toggle();
                
            });

        },

        /**
         * alert 띄우기
         * @param   {String}    msg
         * @param   {Object}    options
         *      {jQueryObject}  returnFocusTarget   창이 닫힐때 focus를 보낼 대상
         * @returns {Promise}
         */
        alert: function ( msg, options) {
            var defaults = {
                contents: msg,
                textAlign: 'center',//없으면 left 정렬
                btnConfirm: true,
                confirmLabel: 'Continue'
            };
            var optionData = _.extend({}, defaults, options);

            var contents = common.template( 'handlbars.alert', optionData);

            return this.open( contents, {
                isMiddlePosition: true,
                popupSize: optionData.popupSize || '',
                title: optionData.popupTitle || '&nbsp;',
                isScroll: false,
                onClose : optionData.onClose || ''
            });
        },

        /**
         * Modal이 열려있는지 여부 반환
         * @returns {Boolean}
         */
        isOpen: function () {
            return $( '.hmc_common_modal_container' ).length > 0;
        },

        /**
         * 열려있는 Modal의 top 재설정
         * @param {jQueryObject}    $el   Target modal container, 설정하지 않으면 모든 모달의 position 조절.
         */
        resetPosition: function ( $el ) {
            if ( this.isOpen() ) {
                if ( $el ) {
                    $el.triggerHandler( 'resetPosition' );
                } else {
                    $( '.hmc_common_modal_container' ).triggerHandler( 'resetPosition' );
                }
            }
        },

        /**
         * isAfterShow 옵션이 설정되었을때 show시켜주기
         * @param {jQueryObject}    $el   Target modal container, 설정하지 않으면 모든 모달 show.
         */
        afterShow: function ( $el ) {
            if ( this.isOpen() ) {
                if ( $el ) {
                    $el.triggerHandler( 'afterShow' );
                } else {
                    $( '.hmc_common_modal_container' ).triggerHandler( 'afterShow' );
                }
            }
        }
    };

    modal.ModalManager = ModalManager;
    hmc.modal = hmc.modal || modal;
})( jQuery, hmc, hmc.common );

/**
 * LightBox
 * ModalManager를 상속
 */
;(function ( $, hmc, modal, common ) {
    var lightBox = {
        /**
         * LightBox 띄우기
         * @param {Object}    data
         * @returns {Promise}
         */
        open: function ( data ) {
            return new LightBox( data || {} ).getPromise();
        }
    };

    /**
     * @constructor
     */
    var LightBox = modal.ModalManager.extend({

        initialize: function ( data ) {
            //Random ID 생성
            _.each( data.items, _.bind(function ( item ) {
                if ( item.type === 'video' ) {
                    item.randomId = hmc.Video.getRandomId();
                }
            }, this));

            this._sendAnalystic( data );

            var options = {
                    title: data.title,
                    popupSize: 'L',
                    isMiddlePosition: true,
                    isAfterShow: true,//angular에서는 isMiddlePosition가 true일 때 자동 생성 됨
                    isLightBox: true,
                    imgLoadComplete: _.bind( this._imgLoadComplete, this )
                    //isContentMargin: false
                },
                contents = common.template( 'handlbars.light-box', data );

            //ModalManager.initialize apply
            this.superMethod( contents, options);

            this._$slide = this._$modal.find( '.hmc_lb_slide .slide' );
            this._setVideo( data.items );

            if ( data.items.length ) {
                this._$slide.ixSlideMax({
                    defaultIndex: data.defaultIndex
                });

                this._response = _.bind( this._responseHandler, this );
                hmc.responsive.addListener( 'response-width', this._response );
            }

            //Image Toggle Event
            var _$imageToggleButton = $('.pop_con.image').find('.tab_link');
            if(_$imageToggleButton){
                _$imageToggleButton.on('click', function(e){
                    e.preventDefault();
                    var _this = $(this),
                        _index = _this.index();
                    _this.parent().find('.tab_link').removeClass('tt1_on');
                    _this.addClass('tt1_on');

                    var $imgs = _this.closest('li.ix-list-item').find('.hmc_lightbox_image');
                    $imgs.hide();
                    $imgs.eq(_index).show();
                });
                //select selected image
                _.each( data.items, _.bind(function ( item ) {
                    if ( item.isOpenBtn !== undefined) {
                        _$imageToggleButton.eq(item.isOpenBtn).trigger('click');
                    }
                }, this));
                //this is  comment var btn_index = data.items[data.defaultIndex].isOpenBtn;
         
            }

            //Video Subtitle Event
            var _$videoBtn = $('.pop_con.video').find('.btn_text');
            if(_$videoBtn){
                _$videoBtn.on('click', function(e){
                    e.preventDefault();
                    var _this = $(this);
                    _this.toggleClass('on');
                    _this.siblings('.description_box').toggle();
                    _this.siblings('.txt_type').toggle();
                });
            }

            //Next Prev Event
            var _$arrowBtn = $('.hmc_lb_slide').find('.slide_direction a');
            if(_$arrowBtn){
                _$arrowBtn.on('click', function(e) {
                    //analystic
                    var type = data.items[data.defaultIndex].type;
                    //get car code
                    var locationArr = location.href.split('/');
                    var carCode = locationArr[locationArr.length - 1].replace( '.html', '' ).replace( '#', '' );

                    if( type === 'video' ){
                        hmc.analytics.internalLink( 'conversion|new cars|' + carCode + '|video view' );
                    } else {
                        hmc.analytics.internalLink( 'conversion|new cars|' + carCode + '|photo view' );
                    }
                });
            }
        },

        _imgLoadComplete: function () {
            setTimeout(function(){
                hmc.modal.afterShow($(".hmc_common_modal_container"));
            }, 0);
        },

        _sendAnalystic: function ( data ) {
            //analystic
            var type = data.items[data.defaultIndex].type;
            //get car code
            var locationArr = location.href.split('/');
            var carCode = locationArr[locationArr.length - 1].replace( '.html', '' );

            if( type === 'video' ){
                hmc.analytics.internalLink( 'conversion|new cars|' + carCode + '|video view' );
            } else {
                hmc.analytics.internalLink( 'conversion|new cars|' + carCode + '|photo view' );
            }
        },

        /** =============== Private Methods =============== */
        /**
         * @override
         */
        _remove: function () {
            this._stopVideo();
            this._$slide.ixSlideMax( 'clear' );
            this._$slide.off( 'ixSlideMax:slideStart' );
            hmc.responsive.removeListener( 'response-width', this._response );
            this._removeVideo();

            //overload
            modal.ModalManager.prototype._remove.apply( this );
        },

        _setVideo: function ( items ) {
            this._videos = [];

            _.each( items, _.bind(function ( item ) {
                if ( item.type === 'video' ) {
                    this._videos.push( new hmc.Video(item) );
                }
            }, this));

            this._$slide.on( 'ixSlideMax:init', _.bind(function () {
                this._$slide.find( '.ix-thumb' ).each( function ( index ) {
                    $( this ).find( 'a' ).text( index + 1 );

                });
            }, this));

            this._$slide.on( 'ixSlideMax:slideStart', _.bind(function () {
                this._stopVideo();
            }, this));
        },

        _stopVideo: function () {
            _.each( this._videos, function ( video ) {
                video.stop();
            });
        },

        _updateVideoSize: function () {
            _.each( this._videos, function ( video ) {
                video.update();
            });
        },

        _removeVideo: function () {
            _.each( this._videos, function ( video ) {
                video.remove();
            });
        },

        _responseHandler: function () {
            var currentIdx = this._$slide.ixSlideMax( 'getCurrentIndex' );
            this._$slide.ixSlideMax( 'clear' ).ixSlideMax({
                defaultIndex: currentIdx
            });

            this._updateVideoSize();
        }

    });


    hmc.lightBox = lightBox;
})( jQuery, hmc, hmc.modal, hmc.common );

/**
 * 공통 UI Components - Paging
 */
;(function ( $, _, hmc ) {

    var defaultViewListItemNum = 10;
    var defaultViewPageItemNum = 4;

    var Paging = hmc.Class.extend({

        /**
         * 초기화 함수
         * @param {number} viewListItemNum  한 페이지에 노출될 리스트 아이템 개수
         * @param {number} viewPageItemNum  페이지 아이템 노출 개수 << < 1, 2, 3,... > >>
         */
        initialize: function ( viewListItemNum, viewPageItemNum ) {
            this.viewListItemNum = viewListItemNum || defaultViewListItemNum;
            this.viewPageItemNum = viewPageItemNum || defaultViewPageItemNum;
            this.currentPageData = null;
            this.currentPageGroupData = null;
        },


        /** =============== Public Methods =============== */
        /**
         * 데이터 적용
         * 데이터를 기반으로 페이지 정보 설정
         * @param {array} data 리스트 데이터
         */
        //데이터를 넘기지 않고 total 개수만 넘기는 방법도 개발 중..
        setData: function ( data ) {
            if( data instanceof  Array ){
                this.data = data;
                this.dataNum = data.length;
            }else{
                this.dataNum = data;
            }
            this.totalPageNum = _getTotalPage( this.dataNum, this.viewListItemNum );
            this.totalPageGroupNum = _getTotalPageGroup( this.totalPageNum, this.viewPageItemNum );
            this.pageGroups = _getPageGroups( this.totalPageNum, this.totalPageGroupNum, this.viewPageItemNum );

            if( data instanceof  Array ){
                this.pages = _getPages( data, this.totalPageNum, this.viewListItemNum );
            }

            this.setPage( 0 );
        },

        /**
         * 페이지 설정
         * 입력된 페이지로 데이터 갱신
         * 주의 zero base
         * @param {number} index
         */
        setPage: function ( index ) {
            this.currentPageIndex = index;
            this.currentPageGroupIndex = Math.floor( index/this.viewPageItemNum );
            this.currentPageGroupData = this.pageGroups[ this.currentPageGroupIndex ];
            if( this.data ){ this.currentPageData = this.pages[ this.currentPageIndex ]; }

            this.dispatch( Paging.CHANGE, {
                pageData: this.currentPageData,
                pageGroupData: this.currentPageGroupData,
                currentPageIndex: this.currentPageIndex,
                currentPageGroupIndex: this.currentPageGroupIndex
            } );
        },

        /**
         * 다음 페이지
         */
        next: function () {
            if( this.currentPageIndex + 1 < this.totalPageNum ){
                this.setPage( this.currentPageIndex + 1 );
            }
        },

        /**
         * 이전 페이지
         */
        prev: function () {
            if( this.currentPageIndex - 1 >= 0 ){
                this.setPage( this.currentPageIndex - 1 );
            }
        },

        /**
         * 첫 페이지
         */
        first: function () {
            this.setPage( 0 );
        },

        /**
         * 마지막 페이지
         */
        last: function () {
            this.setPage( this.totalPageNum-1 );
        }
    });

    Paging.CHANGE = 'paging:page-change';

    /** =============== Private Methods =============== */

    function _getTotalPage ( length, viewListItemNum ) {
        return Math.ceil( length/viewListItemNum );
    }

    function _getTotalPageGroup ( length, viewListItemNum ) {
        return Math.ceil( length/viewListItemNum );
    }

    function _getPages ( data, totalPageNum, viewListItemNum ) {
        var arr = [];
        arr.length = parseInt( totalPageNum );

        var pages = _.map( arr, _.bind( function ( pageItem, index ) {
            pageItem = [];
            for( var i=0, count = viewListItemNum ; i<count ; i+=1 ){
                var itemIndex = viewListItemNum * index + i;
                var itemData = data[ itemIndex ];
                if( itemData ){ pageItem.push( itemData ); }
            }
            return pageItem;
        }, this ) );

        return pages;
    }

    function _getPageGroups ( totalPage, totalPageGroupNum, viewPageItemNum ) {
        var arr = [];
        arr.length = parseInt( totalPageGroupNum );

        var pageGroups = _.map( arr, _.bind( function ( pageGroup, index ) {
            pageGroup = [];
            for( var i=0, count=viewPageItemNum ; i<count ; i+=1 ){
                var pageIndex = viewPageItemNum * index + i;
                if( pageIndex < totalPage ){pageGroup.push( pageIndex  );}
            }
            return pageGroup;
        }, this ) );

        return pageGroups
    }

    hmc.common = hmc.common || {};
    hmc.common.Paging = hmc.common.Paging || Paging;
}( jQuery, _, hmc ));


;(function($, hmgt) {

    var Common = {
        /**
         * IE version check
         * @param
         * @return boolean
         */
        msieversion: function () {
            var ua = window.navigator.userAgent;
            var msie = ua.indexOf("MSIE ");

            if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)){
                return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)));
            }
            return false;
        },

        addReevooHanlder: function ( handler ) {
            if( window.afterReevooMarkLoaded ){
                window.afterReevooMarkLoaded.push( handler );
            }else{
                window.afterReevooMarkLoaded = [ handler ];
            }
        },

        preventScroll: function ( isScroll ) {
            if( isScroll ){
                $(document).on('scroll touchmove mousewheel', function(e) {
                   e.preventDefault();
                   e.stopPropagation();
                   return false;
                });
            } else {
                $(document).off('scroll touchmove mousewheel');
            }
        },

        financeCalculate: function () {
            window.open("http://Hmcfinancecalculator.co.gt/", "_blank", "scrollbars=yes,toolbar=yes,resizable=yes,width=450,height=600,left=0,top=0");
        },

        getToken: function () {
            hmgt.common.loadingBar( true );

            var deferred = $.Deferred();

            hmgt.ServiceApi.getToken().done(function (data) {
                hmgt.common.loadingBar( false );

                if( data.message === 'success' ){
                    hmgt.ServiceApi.token = data.data.token;
                    deferred.resolve('success');
                } else {
                    deferred.resolve('error getToken not success');
                }
            }).fail(function () {
                hmgt.common.loadingBar( false );
                deferred.resolve('error getToken');
            });

            return deferred.promise();
        }
    };

    /**
     $('.col4').tabButton({
            'button':'li', //(클릭 tag가 li일 경우, 옵션값 불필요)
            'contents':'.modelcontent', //(content에 공통으로 들어있는 class)
            'hightlight':'tab_on' //Hightlight를 위한 class
        });
    */
    $.fn.tabButton = function ( options ) {
        var buttonTag = ( options.button )? options.button : 'li',
            $buttonGroup = this.find('>' + buttonTag),
            $contentGroup = $( options.contents ),
            hightlight = ( options.hightlight )? options.hightlight : 'tab_on',
            eventTrigger = ( options.eventTrigger )? options.eventTrigger : 'document';

        $buttonGroup.each(function () {
            $(this).on('click', function(e){
                e.preventDefault();
                e.stopPropagation();
                //TAB button toggle
                $buttonGroup.removeClass(hightlight);
                $(this).addClass(hightlight);

                //Contents toggle
                $contentGroup.hide();
                var index = $(this).index();
                $contentGroup.eq(index).show();
                //tab text
                var data = $(this).find('a').text();
                //event trigger
                $('.' + eventTrigger).trigger('click:versions_tab', data);
            });
        });
    };

    /**
     $('.tableWrap').arcodian({
        'click_tag': 'div.tableTit',//arcodian 전체를 감싸고 있는 wrapper tag
        'on': 'w_up'//click 했을 때, toggle되는 class
    });
     */
    $.fn.arcodian = function ( options ) {
        var $buttons = $(this).find(options.click_tag);
        $.each($buttons, function(index, button){
            $(button).on("click", function(){
                $(this).toggleClass('w_up');
                $(this).next().toggle();
            });
        });
    };

    $.fn.serializeObject = function() {
        var o = {};
        var a = $(this).serializeArray();

        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    hmgt.common = hmgt.common || Common;
})($, hmgt);

/**
 *
 * accessibility - aria
 *
 */

/**
 * Analytics 데이타 변환 관련
 */
;(function ( $, hmc ) {

    var DEFAULT_DATA = '';


    var Converter = {
        _converters: {},

        /**
         * analytics에서 허용하는 데이타 타입인지 체크
         * @param {*}    value
         */
        _isValue: function ( value ) {
            if ( (value || value === 0) && (typeof value === 'string' || typeof value === 'number') ) {
                return true;
            } else {
                return false;
            }
        },

        _default: function ( value ) {
            if ( this._isValue(value) ) {
                return value
            } else {
                return DEFAULT_DATA;
            }
        },

        /** =============== Public Methods =============== */

        /**
         * 데이타 컨버터 등록
         * @param {String}    name      DTM 변수명
         * @param {Function}  callback  데이타 변환시 실행시킬 함수
         */
        add: function ( name, callback ) {
            this._converters[name] = callback;
        },

        /**
         * DTM 변수명으로 등록된 컨버터로 변수 변환
         * @param   {String}    name    DTM 변수명
         * @param   {String}    value
         * @returns {*}
         */
        convert: function ( name, value ) {
            var converter = this._converters[name];
            return converter ? converter( value ) : this._default( value );
        },

        toUpperCase: function ( value ) {
            if ( typeof value === 'string' ) {
                return value.toUpperCase();
            } else {
                return DEFAULT_DATA;
            }
        },

        toLowerCase: function ( value ) {
            if ( typeof value === 'string' ) {
                return value.toLowerCase();
            } else {
                return DEFAULT_DATA;
            }
        }
    };



    /** ==================== ==================== ==================== */
    /** ====================    Converter 등록     ==================== */
    /** ==================== ==================== ==================== */

    //
    Converter.add( 'test', function (  ) {
        var result = DEFAULT_DATA;


        return result;
    });


    hmc.analytics = hmc.analytics || {};
    hmc.analytics.converter = Converter;

})( jQuery, hmc );

/**
 * Analytics
 */
;(function ( $, hmc, converter ) {
    if ( typeof window.dtmDataLayer !== 'object' ) {
        window.dtmDataLayer = {};
    }

    //DTM Value Group
    var _dataLayer = window.dtmDataLayer,
        _satellite = window._satellite || { track: function() {} };


    var Analytics = {
        //value를 통계데이타에서 원하는 형식으로 변환
        _convert: function ( key, value ) {
            return converter.convert( key, value );
        },

        /** =============== Public Methods =============== */

        /**
         * 각 변수에 데이타 등록
         * @param   {Object}    values
         * @returns {Analytics}
         */
        prop: function ( values ) {
            if ( typeof values === 'object' ) {
                for ( var key in values ) {
                    _dataLayer[key] = this._convert( key, values[key] );
                }
            }

            return this;
        },

        internalLink: function ( values ) {
            _dataLayer.internal_link = values;
            this.track('internal_link');
        },

        externalLink: function ( values ) {
            _dataLayer.external_link = values;
            this.track('external_link');
        },

        scrolledSection: function ( values ) {
            _dataLayer.scrolled_section = values;
            this.track('scrolled_section');
        },

        //DTM에 데이타 보내기
        track: function ( name ) {
            if ( typeof name === 'string' ) {
                _satellite.track( name );
            }

            return this;
        }
    };


    hmc.analytics = Analytics;

})( jQuery, hmc, hmc.analytics.converter );

this["hmcHanblebars"] = this["hmcHanblebars"] || {};
this["hmcHanblebars"]["handlbars"] = this["hmcHanblebars"]["handlbars"] || {};
