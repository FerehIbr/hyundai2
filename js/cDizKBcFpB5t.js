/**
 * Responsive Size JS (IE9~)
 * Events Type
 *      resize-width, response-width: call one in your area
 *      resize-height, response-height: call one in your area
 *      Event Properties
 *          responsiveType: (S, M, L)
 */
;(function ( $, $B, hmc ) {
    /**
     * @constructor
     */
	 
    var Responsive = hmc.Class.extend({
        WIDTHS: [0, 768, 1024],
        HEIGHTS: [0, 768, 1024],//
        TYPES: ['S', 'M', 'L'],

        initialize: function () {
            //IE9~
            if ( $B.ua.WINDOWS_PHONE || !$B.ua.DOC_MODE_IE9_LT ) {
                this._addEvents();
            }
        },

        /** =============== Private Methods =============== */

        _addEvents: function () {
            var currentWidthType = this.getResponsiveWidthType(),
                currentHeightType = this.getResponsiveHeightType();

            //width
            $( window ).on( 'resize', _.bind(function () {
                var rType = this.getResponsiveWidthType(),
                    datas = {responsiveType: rType};

                if ( rType !== currentWidthType ) {
                
                //this is comment this.dispatch( 'response5-width', datas );
                
                    //S, M, L
                    if ( rType.length === 1 ) {
                        this.dispatch( 'response-width', datas );
                    }
                }

                this.dispatch( 'resize-width', datas );
                currentWidthType = rType;
            }, this));

            //height
            $( window ).on( 'resize', _.bind(function () {
                var rType = this.getResponsiveHeightType(),
                    datas = {responsiveType: rType};

                if ( rType !== currentHeightType ) {
                    this.dispatch( 'response-height', datas );
                }

                this.dispatch( 'resize-height', datas );
                currentHeightType = rType;
            }, this));
        },

        _getSizeType: function ( models, size ) {
            var result = '';

            _.some( models, _.bind(function ( currentSize, idx ) {
                var nextIdx = idx + 1,
                    nextSize = models[nextIdx] || 100000;

                if ( currentSize <= size && nextSize > size ) {
                    result = this.TYPES[idx];
                    return true;
                } else {
                    return false;
                }
            }, this));

            return result;
        },

        /** =============== Public Methods =============== */

        getResponsiveWidthType: function () {
            if ( $B.ua.WINDOWS_PHONE || !$B.ua.DOC_MODE_IE9_LT ) {
                return this._getSizeType( this.WIDTHS, window.innerWidth );
            } else {
                return this.TYPES[this.TYPES.length - 1];
            }
        },

        getResponsiveHeightType: function () {
            if ( $B.ua.WINDOWS_PHONE || !$B.ua.DOC_MODE_IE9_LT ) {
                return this._getSizeType( this.HEIGHTS, window.innerHeight );
            } else {
                return this.TYPES[this.TYPES.length - 1];
            }
        }
    });


    hmc.responsive = new Responsive();
})( jQuery, ixBand, hmc );